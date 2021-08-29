import * as React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

// Components
import Button from 'src/app/components/shared/ui/button/Button';
import FormInput from 'src/app/components/shared/ui/form/FormInput/FormInput';
import Alert from 'src/app/components/shared/ui/alert/Alert';

// Hooks
import useLoginMutation from 'src/app/hooks/api/mutations/useLoginMutation';
import useAlert from 'src/app/hooks/useAlert';
import useRoute from 'src/app/hooks/useRoute';

// styles
import './login.scss';

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

const Login = () => {
	useRoute('not-protected', '/menu');
	const { alertMessage, alertType, setAlert, showAlert } = useAlert();

	const { isLoading, login } = useLoginMutation({
		onError: (err: any) => {
			setAlert('danger', err.response.data.message || 'something went wrong');
		},
	});

	return (
		<>
			{showAlert && (
				<Alert position='top-center' type={alertType}>
					{alertMessage}
				</Alert>
			)}
			<div className='login'>
				<Formik
					onSubmit={(values, actions) => {
						login(values as any);
						actions.resetForm();
					}}
					{...{ validationSchema, initialValues }}>
					<Form className='login__form' autoComplete='off'>
						<div className='login__form-content'>
							<h1 className='u-mb-7 u-text-capitalize u-ftwt-400 u-text-primary heading-2'>
								login
							</h1>
							<FormInput label='Email' name='email' />
							<FormInput type='password' label='Password' name='password' />
							<Button>{isLoading ? 'Loading...' : 'Login'}</Button>
						</div>
					</Form>
				</Formik>
			</div>
		</>
	);
};

export default Login;
