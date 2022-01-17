import * as React from 'react';

import { Field, FieldHookConfig, useField } from 'formik';

import './form-input.scss';
import clsx from 'clsx';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

const FormInput: React.FC<Props> = ({
	label,
	type = 'text',
	required = true,
	...props
}) => {
	const [field, { touched, error }] = useField<
		FieldHookConfig<string | number>
	>(props.name!);

	return (
		<div
			className={`form-input ${touched && error ? 'form-input--error' : ''}`}>
			<label className='form-input__label' htmlFor={field.name}>
				{label}{' '}
				{required ? (
					<span
						className={clsx([
							touched && error ? 'u-text-danger' : 'u-text-tertiary',
						])}>
						*
					</span>
				) : null}
			</label>
			<Field
				className='form-input__field'
				type={type}
				id={field.name}
				{...field}
				{...props}
			/>
			{touched && error ? (
				<small className='form-input__error-message'>{error}</small>
			) : (
				<small>&nbsp;</small>
			)}
		</div>
	);
};

export default FormInput;
