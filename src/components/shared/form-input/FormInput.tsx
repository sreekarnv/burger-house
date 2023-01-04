import React from 'react';

import { Field, FieldHookConfig, useField } from 'formik';

import classes from './form-input.module.scss';
import clsx from 'clsx';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const FormInput: React.FC<Props> = ({
  label,
  type = 'text',
  required = true,
  className,
  ...props
}) => {
  const [field, { touched, error }] = useField<
    FieldHookConfig<string | number>
  >(props.name!);

  return (
    <div className={clsx([classes.root, touched && error && classes.error])}>
      {label && (
        <label className={classes.label} htmlFor={field.name}>
          {label}{' '}
          {required ? (
            <span
              className={clsx([
                touched && error ? 'u-text-danger' : 'u-text-tertiary',
                className,
              ])}
            >
              *
            </span>
          ) : null}
        </label>
      )}
      <Field
        className={classes.field}
        type={type}
        id={field.name}
        {...field}
        {...props}
      />
      {touched && error ? (
        <small className={classes['error-message']}>{error}</small>
      ) : (
        <small>&nbsp;</small>
      )}
    </div>
  );
};

export default FormInput;
