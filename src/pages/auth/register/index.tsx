import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import Alert from '../../../components/shared/alert';
import Button from '../../../components/shared/button';
import FormInput from '../../../components/shared/form-input';
import Heading from '../../../components/shared/heading';
import useAlert from '../../../hooks/use-alert';
import Switch from '../../../layouts/shared/switch';
import { useAppSelector } from '../../../store/hooks';
import { registerFormSchema } from '../../../utils/schemas/auth/register';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '../../../utils/trpc';

import classes from './register.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import useGeolocation from '../../../hooks/use-geolocation';

const RegisterPage: NextPage = () => {
	const router = useRouter();
	const context = trpc.useContext();
	const location = useAppSelector((state) => state.geolocation.location);
	const allowLocation = useAppSelector(
		(state) => state.geolocation.allowLocation
	);
	const { onGeolocationAccess, isLoading: isLocationLoading } =
		useGeolocation();

	const { setAlert, showAlert, alertMessage, alertType } = useAlert();

	const { isLoading, mutate } = trpc.auth.register.useMutation({
		onSuccess(data) {
			context.auth.user.setData(undefined, data);
		},
		onError(error) {
			setAlert('danger', error.message || "We couldn't create your account");
		},
		onSettled(data) {
			if (data) {
				const redirect = (router.query.redirect as string) || '/menu';
				router.replace(redirect);
			}
		},
	});

	return (
		<>
			{showAlert && (
				<Alert position='top-center' type={alertType}>
					{alertMessage}
				</Alert>
			)}
			<>
				<div className={classes.root}>
					<Formik
						onSubmit={async (values, actions) => {
							if (!allowLocation || !location.coordinates.length) {
								setAlert('danger', 'Please allow location to continue');
								return;
							}

							await mutate({
								...values,
								location: {
									coordinates: location.coordinates,
								},
							});

							actions.resetForm();
						}}
						initialValues={{
							name: '',
							email: '',
							password: '',
							passwordConfirm: '',
						}}
						validationSchema={toFormikValidationSchema(registerFormSchema)}>
						<Form className={classes.form} autoComplete='off'>
							<div className={classes['form__content']}>
								<Heading
									variant='h2'
									color='primary'
									className={clsx([
										classes.heading,
										'u-text-capitalize u-fw-400',
									])}>
									Register
								</Heading>
								<FormInput label='Name' name='name' />
								<FormInput label='Email Address' name='email' />
								<FormInput type='password' label='Password' name='password' />
								<FormInput
									type='password'
									label='Password Confirm'
									name='passwordConfirm'
								/>
								<div className={clsx(classes['form__switch'], 'u-mb-10')}>
									<Switch
										active={allowLocation}
										color='tertiary'
										onToggle={() => {
											onGeolocationAccess();
										}}
									/>
									<span className='u-ml-5'>
										{isLocationLoading
											? 'Loading...'
											: 'Address (Give Access To Your Location)'}
									</span>
								</div>
								<Button type='submit' disabled={!allowLocation || isLoading}>
									{isLoading ? 'Loading...' : 'Register'}
								</Button>
							</div>
						</Form>
					</Formik>
				</div>
			</>
		</>
	);
};

export default RegisterPage;
