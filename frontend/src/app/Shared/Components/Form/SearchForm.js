import React from "react";

const SearchForm = (props) => {
	const {
		onSubmit,
		placeholder,
		searchValue,
		setSearchValue,
		resetForm,
		reset,
	} = props;

	const onChangeHandler = (e) => {
		setSearchValue(e.target.value);
	};

	return (
		<form className='search-form' onSubmit={onSubmit}>
			<input
				type='text'
				placeholder={placeholder}
				value={searchValue}
				onChange={onChangeHandler}
				className='form__input'
				required
			/>

			<button type='submit' className='btn btn__tertiary'>
				Search
			</button>

			{reset && (
				<button
					onClick={resetForm}
					type='reset'
					className='btn btn__secondary u-text-dark'>
					Reset
				</button>
			)}
		</form>
	);
};

export default SearchForm;
