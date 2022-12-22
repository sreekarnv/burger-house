import { Formik, Form } from 'formik';
import React from 'react';
import Button from '../../../components/shared/ui/button/Button';
import FormInput from '../../../components/shared/ui/form-input/FormInput';
import useUpdateUserDetailsMutation from '../../../hooks/api/mutations/auth/useUpdateUserDetailsMutation';
import useUpdateUserPasswordMutation from '../../../hooks/api/mutations/auth/useUpdateUserPasswordMutation';

import * as Yup from 'yup';
import { useQueryClient } from 'react-query';
import { User } from '@burger-house/models';
import useImageUpload from '../../../hooks/helpers/useImageUpload';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

import './profile.scss';
import Alert from '../../../components/shared/ui/alert/Alert';
import useAlert from '../../../hooks/helpers/useAlert';
import Seo from '../../../components/shared/meta/Seo';

interface MyProfilePageProps {}

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

const MyProfilePage: React.FC<MyProfilePageProps> = ({}) => {
	const queryClient = useQueryClient();
	const imageRef = React.useRef<any>();
	const navigate = useNavigate();
	const { imagefile, imageUrl, uploadFile } = useImageUpload();

	const user = queryClient.getQueryData<User>('user');

	const {
		isLoading: updateDetailsLoading,
		updateDetails,
		error: updateDetailsError,
	} = useUpdateUserDetailsMutation();

	const {
		isLoading: updatePasswordLoading,
		updatePassword,
		error: updatePasswordError,
	} = useUpdateUserPasswordMutation();

	const { showAlert, setAlert, alertMessage, alertType } = useAlert();

	return (
		<>
			<Seo title='Burger House | Profile' />
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
					onSubmit={async ({ name, email }, { setErrors }) => {
						try {
							const data = new FormData();
							data.append('name', name!);
							data.append('email', email!);
							if (imagefile) {
								data.append('photo', imagefile);
							}
							await updateDetails(data as any);
						} catch (err: any) {
							if ((updateDetailsError as any).response.data.errors) {
								const errorMap = {} as any;
								(updateDetailsError as any).response.data.errors.forEach(
									(error: any) => {
										errorMap[error.field] = error.message;
									}
								);
								setErrors(errorMap);
							} else {
								setAlert(
									'danger',
									(updateDetailsError as any).response.data.message ||
										'something went wrong'
								);
							}
						}
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
								variant='primary-outline'
								size='sm'>
								Upload Photo
							</Button>
							<input
								onChange={uploadFile}
								type='file'
								style={{ display: 'none' }}
								ref={imageRef}
							/>
							<div>
								<figure className='profile__form-photo-media'>
									<LazyLoadImage
										src={
											imageUrl || user?.photo?.url.startsWith('/uploads/')
												? `${import.meta.env.SERVER_URL}${user?.photo?.url}`
												: user?.photo?.url ?? ''
										}
										alt={user?.name}
									/>
								</figure>
							</div>
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
					onSubmit={async (values, { setErrors }) => {
						try {
							await updatePassword(values as any);
							setAlert(
								'success',
								'your password has been updated! You will be logged out'
							);
							setTimeout(() => {
								navigate('/auth/logout', { replace: true });
							}, 1500);
						} catch (err: any) {
							if ((updatePasswordError as any).response.data.errors) {
								const errorMap = {} as any;
								(updatePasswordError as any).response.data.errors.forEach(
									(error: any) => {
										errorMap[error.field] = error.message;
									}
								);
								setErrors(errorMap);
							} else {
								setAlert(
									'danger',
									(updatePasswordError as any).response.data.message ||
										'something went wrong'
								);
							}
						}
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

export default MyProfilePage;
