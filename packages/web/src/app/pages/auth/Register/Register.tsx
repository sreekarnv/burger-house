import { Formik, Form } from 'formik';
import React from 'react';
import Button from '../../../components/shared/ui/button/Button';
import FormInput from '../../../components/shared/ui/form-input/FormInput';

import * as Yup from 'yup';
import Switch from '../../../components/shared/ui/switch/Switch';

import './register.scss';
import useDisclosure from '../../../hooks/helpers/useDisclosure';
import Seo from '../../../components/shared/meta/Seo';
import { useDispatch } from 'react-redux';
import { updateAllowLocation } from '../../../store/modules/geoLocation';
import useRegisterMutation from '../../../hooks/api/mutations/auth/useRegisterMutation';
import { useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import useAlert from '../../../hooks/helpers/useAlert';
import Alert from '../../../components/shared/ui/alert/Alert';

interface RegisterPageProps {}

const validationSchema = Yup.object().shape({
	name: Yup.string().required('user must provide their name').trim(),
	email: Yup.string()
		.required('user must provide their email')
		.email('please provide a valid email')
		.trim(),
	password: Yup.string()
		.required('user must provide a password')
		.min(6, 'password must contain atleast 6 characters'),
	passwordConfirm: Yup.string()
		.required('users must confirm their password')
		.when('password', {
			is: (val: string) => (val && val.length > 0 ? true : false),
			then: Yup.string().oneOf([Yup.ref('password')], 'passwords do not match'),
		}),
});

const initialValues = {
	name: '',
	email: '',
	password: '',
	passwordConfirm: '',
};

const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
	const { onToggle, isOpen } = useDisclosure();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useAppSelector((state) => state.geolocation.location);

	const { isLoading, registerUser, error } = useRegisterMutation();

	const { setAlert, showAlert, alertMessage, alertType } = useAlert();

	React.useEffect(() => {
		if (isOpen) {
			dispatch(updateAllowLocation({ status: true }));
		} else {
			dispatch(updateAllowLocation({ status: false }));
		}
	}, [isOpen, dispatch]);

	return (
		<>
			<Seo title='Burger House | Register' />
			{showAlert && (
				<Alert position='top-center' type={alertType}>
					{alertMessage}
				</Alert>
			)}
			<>
				<div className='register'>
					<Formik
						onSubmit={async (values, actions) => {
							try {
								await registerUser({ ...values, location });
								actions.resetForm();

								setAlert('success', 'Your account has been created!');

								setTimeout(() => {
									navigate('/auth/login');
								}, 1000);
							} catch (err) {
								if (error?.response?.data?.errors) {
									const errorObj = {} as any;

									error.response.data.errors.forEach((el: any) => {
										errorObj[el.field] = el.message;
									});

									actions.setErrors(errorObj);
								} else {
									setAlert(
										'danger',
										error?.response?.data?.message ||
											"We couldn't create your account"
									);
								}
							}
						}}
						{...{ validationSchema, initialValues }}>
						<Form className='register__form' autoComplete='off'>
							<div className='register__form-content'>
								<h1 className='u-mb-7 u-ftwt-400 u-text-primary heading-2 u-text-capitalize'>
									Register
								</h1>
								<FormInput label='Name' name='name' />
								<FormInput label='Email Address' name='email' />
								<FormInput type='password' label='Password' name='password' />
								<FormInput
									type='password'
									label='Password Confirm'
									name='passwordConfirm'
								/>
								<div className='register__form-switch u-mb-10'>
									<Switch
										active={isOpen}
										color='tertiary'
										onToggle={onToggle}
									/>
									<span className='u-ml-5'>
										Address (Give Access To Your Location)
									</span>
								</div>
								<Button disabled={isLoading}>
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
