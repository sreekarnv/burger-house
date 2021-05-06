import './search-form.scss';

import * as React from 'react';

import Button from '~app/components/shared/ui/button/Button';
import SearchInput from '~app/components/shared/ui/form/SearchInput/SearchInput';

type Props = React.DetailedHTMLProps<
	React.FormHTMLAttributes<HTMLFormElement>,
	HTMLFormElement
> & {
	onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onResetBtn: any;
};

const SearchForm: React.FC<Props> = ({
	placeholder,
	onChangeText,
	onResetBtn,
	...props
}) => {
	return (
		<form className='search-form' autoComplete='off' {...props}>
			<SearchInput onChange={onChangeText} {...{ placeholder }} />
			<div className='search-form__cta u-w-100'>
				<Button type='submit' color='tertiary'>
					Search
				</Button>
				<Button onClick={onResetBtn} type='reset' color='secondary'>
					Reset
				</Button>
			</div>
		</form>
	);
};

export default SearchForm;
