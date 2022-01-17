import React from 'react';
import Button from '../../../components/shared/ui/button/Button';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import './login.scss';
import FormInput from '../../../components/shared/ui/form-input/FormInput';
import Seo from '../../../components/shared/meta/Seo';
import useLoginMutation from '../../../hooks/api/mutations/auth/useLoginMutation';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAlert from '../../../hooks/helpers/useAlert';
import Alert from '../../../components/shared/ui/alert/Alert';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required('user must provide their email')
		.email('Please provide a valid email')
		.trim(),
	password: Yup.string().required('user must provide a password'),
});

const initialValues = {
	email: '',
	password: '',
};

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = ({}) => {
	const { isLoading, loginUser, error } = useLoginMutation();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { setAlert, showAlert, alertMessage, alertType } = useAlert();

	React.useEffect(() => {
		if (error) {
			setAlert(
				'danger',
				error?.response?.data?.message || "We couldn't log you in"
			);
		}
	}, [error]);

	return (
		<>
			<Seo title='Burger House | Login' />
			<>
				{showAlert && (
					<Alert position='top-center' type={alertType}>
						{alertMessage}
					</Alert>
				)}
				<div className='login'>
					<Formik
						onSubmit={async (values, actions) => {
							try {
								const { email, password } = values;
								await loginUser({
									email,
									password,
								});

								actions.resetForm();

								const redirect =
									(searchParams.get('redirect') as string) || '/menu';

								navigate(redirect, { replace: true });
							} catch (err) {
								if (error?.response?.data?.errors) {
									const errorObj = {} as any;

									error.response.data.errors.forEach((el: any) => {
										errorObj[el.field] = el.message;
									});

									actions.setErrors(errorObj);
								}
							}
						}}
						{...{ validationSchema, initialValues }}>
						<Form className='login__form' autoComplete='off'>
							<div className='login__form-content'>
								<h1 className='u-mb-7 u-text-capitalize u-ftwt-400 u-text-primary heading-2'>
									login
								</h1>
								<FormInput name='email' type='email' label='Email Address' />
								<FormInput name='password' type='password' label='Password' />

								<Button className='u-w-100'>
									{isLoading ? 'Loading...' : 'Login'}
								</Button>
							</div>
						</Form>
					</Formik>
				</div>
			</>
		</>
	);
};

export default LoginPage;
