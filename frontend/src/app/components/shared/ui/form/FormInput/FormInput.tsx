import './form-input.scss';
import './../input.scss';

import * as React from 'react';

import { Field, FieldHookConfig, useField } from 'formik';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
};

const FormInput: React.FC<Props> = ({ label, type = 'text', ...props }) => {
	const [field, { touched, error }] = useField<
		FieldHookConfig<string | number>
	>(props.name!);

	return (
		<div
			className={`form-input ${touched && error ? 'form-input--error' : ''}`}>
			<label htmlFor={field.name}>{label}</label>
			<Field
				className='input'
				type={type}
				id={field.name}
				{...field}
				{...props}
			/>
			{touched && error ? (
				<small className='u-text-capitalize'>{error}</small>
			) : (
				<small>&nbsp;</small>
			)}
		</div>
	);
};

export default FormInput;
