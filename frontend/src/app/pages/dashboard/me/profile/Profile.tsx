import * as React from 'react';
import * as Yup from 'yup';

import { Form, Formik } from 'formik';

import { useQueryClient } from 'react-query';
import { User } from 'src/@types/user';
import Button from 'src/app/components/shared/ui/button/Button';
import FormInput from 'src/app/components/shared/ui/form/FormInput/FormInput';

import './profile.scss';
import Avatar from 'src/app/components/shared/ui/avatar/Avatar';
import useAlert from 'src/app/hooks/useAlert';
import Alert from 'src/app/components/shared/ui/alert/Alert';
import useImageUpload from 'src/app/hooks/useImageUpload';
import useUpdateUserDetailsMutation from 'src/app/hooks/api/mutations/useUpdateUserDetailsMutation';
import useUpdateUserPasswordMutation from 'src/app/hooks/api/mutations/useUpdateUserPasswordMutation';
import { useHistory } from 'react-router-dom';

interface Props {}

const detailsValidationSchema = Yup.object().shape({
	name: Yup.string().required('user must have a name'),
	email: Yup.string()
		.required('user must have an email address')
		.email('please enter a valid email'),
});

const passwordValidationSchema = Yup.object().shape({
	currentPassword: Yup.string().required(
		'please provide your current password'
	),
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

const imgTypes = ['webp', 'jpeg', 'jpg', 'png', 'svg+xml'];

const Profile: React.FC<Props> = () => {
	const queryClient = useQueryClient();
	const { alertMessage, alertType, setAlert, showAlert } = useAlert();
	const { error, imagefile, imageUrl, uploadFile } = useImageUpload();

	const history = useHistory();
	const user = queryClient.getQueryData<User>('user')!;
	const imageRef = React.useRef<any>();

	const { isLoading: updateDetailsLoading, updateDetails } =
		useUpdateUserDetailsMutation({
			onSuccess: () => {
				setAlert('success', 'your details have been updated!');
			},
			onError: () => {
				setAlert('danger', 'could not update yout details');
			},
		});

	const { isLoading: updatePasswordLoading, updatePassword } =
		useUpdateUserPasswordMutation({
			onSuccess: () => {
				setAlert(
					'success',
					'your password has been updated! You will be logged out'
				);
			},
			onError: (err) => {
				setAlert('danger', 'could not update yout details');
			},
			onSettled: (data, _) => {
				if (data) {
					setTimeout(() => {
						history.replace('/auth/logout');
					}, 1500);
				}
			},
		});

	React.useEffect(() => {
		if (error) {
			setAlert('danger', error);
		}
	}, [error]);

	return (
		<>
			{showAlert && (
				<Alert position='top-center' type={alertType}>
					{alertMessage}
				</Alert>
			)}

			<div className='profile'>
				<Formik
					validationSchema={detailsValidationSchema}
					initialValues={{
						name: user?.name,
						email: user?.email,
					}}
					onSubmit={({ name, email }) => {
						const data = new FormData();
						data.append('name', name);
						data.append('email', email);
						if (imagefile) {
							data.append('photo', imagefile);
						}
						updateDetails(data);
					}}>
					<Form autoComplete='off' className='profile__form profile__form--1'>
						<h2 className='heading-2 u-text-primary u-ftwt-400 u-mb-5'>
							Update User Details
						</h2>
						<FormInput label='Name' name='name' />
						<FormInput label='Email' name='email' />
						<div className='u-mb-5 profile__form-photo'>
							<Button
								type='button'
								onClick={() => {
									imageRef.current.click();
								}}
								variant='outlined'
								size='sm'>
								Upload Photo
							</Button>
							<input
								onChange={uploadFile}
								type='file'
								style={{ display: 'none' }}
								ref={imageRef}
							/>
							<Avatar
								src={
									imageUrl || process.env.REACT_APP_SERVER_URL! + user?.photoUrl
								}
								alt={user?.name}
								size='sm'
							/>
						</div>
						<Button type='submit' color='tertiary'>
							{updateDetailsLoading ? 'Loading...' : 'Update Details'}
						</Button>
					</Form>
				</Formik>

				<Formik
					initialValues={{
						currentPassword: '',
						password: '',
						passwordConfirm: '',
					}}
					validationSchema={passwordValidationSchema}
					onSubmit={(values) => {
						updatePassword(values);
					}}>
					{() => {
						return (
							<Form
								autoComplete='off'
								className='profile__form profile__form--2'>
								<h2 className='heading-2 u-text-primary u-mb-8 u-ftwt-400'>
									Update User Password
								</h2>
								<FormInput
									label='Current Password'
									name='currentPassword'
									type='password'
								/>
								<FormInput label='Password' name='password' type='password' />
								<FormInput
									label='Password Confirm'
									name='passwordConfirm'
									type='password'
								/>
								<Button color='tertiary'>
									{updatePasswordLoading ? 'Loading...' : 'Update Password'}
								</Button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
};

export default Profile;
