import './register.scss';

import * as React from 'react';
import * as Yup from 'yup';
import * as locationActions from 'src/app/store/actions/geoLocationActions';

import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Alert from 'src/app/components/shared/ui/alert/Alert';
import Button from 'src/app/components/shared/ui/button/Button';
import FormInput from 'src/app/components/shared/ui/form/FormInput/FormInput';
import { ReduxState } from 'src/@types/store';
import Switch from 'src/app/components/shared/ui/switch/Switch';
import useAlert from 'src/app/hooks/useAlert';
import useDisclosure from 'src/app/hooks/useDisclosure';
import useRegisterMutation from 'src/app/hooks/api/mutations/useRegisterMutation';
import useRoute from 'src/app/hooks/useRoute';

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

const Register = () => {
	useRoute();
	const { alertMessage, alertType, setAlert, showAlert } = useAlert();

	const location = useSelector((state: ReduxState) => state.location.location);
	const dispatch = useDispatch();

	const { isOpen, onToggle } = useDisclosure();

	const { register, isLoading } = useRegisterMutation({
		onSuccess: () => {
			setAlert('success', 'Your account has been created successfully..');
		},
		onError: (err: any) => {
			setAlert(
				'danger',
				err?.response?.data?.message || 'something went wrong'
			);
		},
	});

	React.useEffect(() => {
		if (isOpen) {
			dispatch(locationActions.updateAllowLocation(true));
		} else {
			dispatch(locationActions.updateAllowLocation(false));
		}
	}, [isOpen, locationActions, dispatch]);

	return (
		<>
			{showAlert && (
				<Alert position='top-center' type={alertType}>
					{alertMessage}
				</Alert>
			)}

			<div className='register'>
				<Formik
					onSubmit={(values, actions) => {
						register({ ...values, location } as any);
						actions.resetForm();
					}}
					{...{ validationSchema, initialValues }}>
					<Form className='register__form' autoComplete='off'>
						<div className='register__form-content'>
							<h1 className='u-mb-7 u-ftwt-400 u-text-primary heading-2'>
								Register
							</h1>
							<FormInput label='Name' name='name' />
							<FormInput label='Email' name='email' />
							<FormInput type='password' label='Password' name='password' />
							<FormInput
								type='password'
								label='Password Confirm'
								name='passwordConfirm'
							/>
							<div className='register__form-switch u-mb-10'>
								<Switch active={isOpen} color='tertiary' onToggle={onToggle} />
								<span className='u-ml-5'>
									Address (Give Access To Your Location)
								</span>
							</div>
							<Button>{isLoading ? 'Loading...' : 'Register'}</Button>
						</div>
					</Form>
				</Formik>
			</div>
		</>
	);
};

export default Register;
