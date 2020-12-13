import React from "react";

const FormInput = (props) => {
	const { id, formState, onFormStateChange } = props;

	const onChangeHandler = (e) => {
		onFormStateChange({
			...formState,
			[id]: {
				...formState[id],
				value: e.target.value,
			},
		});
	};

	const onFileChangeHandler = (e) => {
		onFormStateChange({
			...formState,
			[id]: {
				...formState[id],
				value: e.target.files[0],
				preview: URL.createObjectURL(e.target.files[0]),
			},
		});
	};

	if (formState[id].type === "file") {
		return (
			<div className='form__group form__group-sb'>
				<label className='btn btn__goto u-text-tertiary' htmlFor={id}>
					Upload Photo
				</label>
				<input
					onChange={onFileChangeHandler}
					name={id}
					id={id}
					style={{ display: "none" }}
					type={formState[id].type || "text"}
				/>
				<div className='form__image'>
					<img src={formState[id].preview} alt={id} />
				</div>
			</div>
		);
	}

	return (
		<div className='form__group'>
			<label htmlFor={id} className='form__label'>
				{formState[id].label}
			</label>
			<input
				className='form__input'
				value={formState[id].value}
				onChange={onChangeHandler}
				name={id}
				id={id}
				placeholder={formState[id].placeholder}
				type={formState[id].type || "text"}
				required={formState[id].required}
			/>
		</div>
	);
};

export default FormInput;
