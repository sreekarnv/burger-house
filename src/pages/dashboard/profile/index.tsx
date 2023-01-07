import { Formik, Form } from 'formik';
import Image from 'next/image';
import React from 'react';
import Alert from '../../../components/shared/alert';
import Button from '../../../components/shared/button';
import FormInput from '../../../components/shared/form-input';
import useAlert from '../../../hooks/use-alert';
import { updatePasswordSchema } from '../../../utils/schemas/auth/new-password';
import { updateDetailsSchema } from '../../../utils/schemas/user/update-details';
import { trpc } from '../../../utils/trpc';
import { NextPageWithLayout } from '../../_app';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import DashboardLayout from '../../../layouts/dashboard-layout';

import classes from './profile.module.scss';
import clsx from 'clsx';
import Heading from '../../../components/shared/heading';
import { useRouter } from 'next/router';
import useImageUpload from '../../../hooks/use-image-upload';
import Seo from '../../../components/shared/seo';

const MyProfilePage: NextPageWithLayout = () => {
  const imageRef = React.useRef<any>();
  const router = useRouter();
  const context = trpc.useContext();
  const user = context.auth.user.getData();
  const { imageUrl, uploadFile, imageDataURI } = useImageUpload();
  const { refetch } = trpc.image.signedURL.useQuery(undefined, {
    enabled: false,
  });

  const { mutate: updateDetails, error: updateDetailsError } =
    trpc.auth.details.useMutation({
      onSuccess(data) {
        context.auth.user.setData(undefined, data);
      },
    });

  const {
    isLoading: updatePasswordLoading,
    mutate: updatePassword,
    error: updatePasswordError,
  } = trpc.auth.newPassword.useMutation({
    onSuccess() {
      setAlert(
        'success',
        'your password has been updated! You will be logged out'
      );
      setTimeout(() => {
        router.replace('/auth/logout');
      }, 1500);
    },
  });

  const { showAlert, setAlert, alertMessage, alertType } = useAlert();

  return (
    <>
      <Seo title="Dashboard | Profile" />

      {showAlert && (
        <Alert position="top-center" type={alertType}>
          {alertMessage}
        </Alert>
      )}
      <div className={classes.root}>
        <Formik
          validationSchema={toFormikValidationSchema(updateDetailsSchema)}
          initialValues={{
            name: user?.name || '',
            email: user?.email || '',
            photo: user?.photo,
          }}
          onSubmit={async (data, { setErrors }) => {
            try {
              if (user) {
                if (imageDataURI) {
                  const formData = new FormData();

                  const { data: rData } = await refetch();

                  if (!rData) {
                    return;
                  }

                  formData.append('file', imageDataURI);
                  formData.append('signature', rData.signature);
                  formData.append('api_key', rData.api_key!);
                  formData.append('timestamp', `${rData.timestamp}`);
                  formData.append('folder', `${rData.folder}/users`);

                  const imgRes = await fetch(`${rData.url}`, {
                    method: 'POST',
                    body: formData,
                  });

                  await imgRes.json().then((d) => {
                    const photo = {
                      publicId: d.public_id,
                      url: d.secure_url,
                    };

                    updateDetails({
                      name: data.name,
                      email: data.email,
                      photo,
                    });
                  });
                } else {
                  await updateDetails({
                    name: data.name,
                    email: data.email,
                    photo: {
                      ...user.photo,
                    },
                  });
                }
              }
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
          }}
        >
          {({ isSubmitting }) => (
            <Form
              autoComplete="off"
              className={clsx(classes.form, classes['form--1'])}
            >
              <Heading
                align="left"
                variant="h2"
                color="primary"
                weight="regular"
                className={classes.heading}
              >
                Update User Details
              </Heading>
              <FormInput label="Name" name="name" />
              <FormInput label="Email" name="email" />
              <div className={classes['form-photo']}>
                <Button
                  type="button"
                  onClick={() => {
                    imageRef.current.click();
                  }}
                  variant="primary-outline"
                  size="sm"
                >
                  Upload Photo
                </Button>
                <input
                  onChange={uploadFile}
                  type="file"
                  style={{ display: 'none' }}
                  ref={imageRef}
                />
                <div>
                  <figure className={classes['form-photo-media']}>
                    <Image
                      src={imageUrl || user?.photo?.url || ''}
                      alt={user?.name || ''}
                      height={40}
                      width={40}
                    />
                  </figure>
                </div>
              </div>
              <Button type="submit" color="tertiary">
                {isSubmitting ? 'Loading...' : 'Update Details'}
              </Button>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{
            oldPassword: '',
            password: '',
            passwordConfirm: '',
          }}
          validationSchema={toFormikValidationSchema(updatePasswordSchema)}
          onSubmit={async (values, { setErrors }) => {
            try {
              updatePassword(values as any);
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
          }}
        >
          {() => {
            return (
              <Form
                autoComplete="off"
                className={clsx(classes['form'], classes['form--2'])}
              >
                <Heading
                  align="left"
                  variant="h2"
                  color="primary"
                  weight="regular"
                  className={classes.heading}
                >
                  Update User Password
                </Heading>
                <FormInput
                  label="Current Password"
                  name="oldPassword"
                  type="password"
                />
                <FormInput label="Password" name="password" type="password" />
                <FormInput
                  label="Password Confirm"
                  name="passwordConfirm"
                  type="password"
                />
                <Button color="tertiary">
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

MyProfilePage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyProfilePage;
