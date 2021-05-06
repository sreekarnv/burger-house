import * as React from 'react';
import { useHistory } from 'react-router-dom';

// types
import { Burger } from '~@types/burger';

// Components
import BurgerCard from '~app/components/shared/BurgerCard/BurgerCard';
import IconButton from '~app/components/shared/ui/icon-button/IconButton';
import FilterIcon from '~app/components/shared/ui/icons/FilterIcon';
import CrossIcon from '~app/components/shared/ui/icons/CrossIcon';
import SearchForm from '~app/components/shared/SearchForm/SearchForm';
import Switch from '~app/components/shared/ui/switch/Switch';
import LeafIcon from '~app/components/shared/ui/icons/LeafIcon';
import Button from '~app/components/shared/ui/button/Button';
import BurgerCardSkeleton from '~app/components/shared/ui/skeletons/BurgerCardSkeleton';

// hooks
import useBurgersQuery from '~app/hooks/api/queries/useBurgersQuery';
import useNewBurgersQuery from '~app/hooks/api/queries/useNewBurgersQuery';
import useDisclosure from '~app/hooks/useDisclosure';

// styles
import './menu.scss';

const MenuList = () => {
	const [params, setParams] = React.useState<any>();
	const [searchText, setSearchText] = React.useState<string>('');
	const { isLoading: isBurgersLoading, data: burgers } = useBurgersQuery({
		params,
	});
	const { isLoading: isNewBurgersLoading } = useNewBurgersQuery({});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isBtnActive,
		onToggle,
		onClose: onBtnClose,
	} = useDisclosure();
	const history = useHistory();

	React.useEffect(() => {
		if (isBtnActive) {
			setParams((prevProps: any) => {
				return {
					...prevProps,
					isVegetarian: true,
				};
			});
		} else {
			setParams((prevProps: any) => {
				return {
					...prevProps,
					isVegetarian: undefined,
				};
			});
		}
	}, [isBtnActive]);

	const searchFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchText.trim().length > 0) {
			setParams((prevProps: any) => {
				return {
					...prevProps,
					name: searchText,
				};
			});
		} else {
			setParams((prevProps: any) => {
				return {
					...prevProps,
				};
			});
		}
	};

	return (
		<>
			<div className='menu'>
				<div className='menu__header'>
					<div className='menu__header-make-your-own'>
						<Button
							onClick={() => history.push('/menu/make-my-burger')}
							size='sm'>
							Make Your Own
						</Button>
					</div>
					<h1 className='heading-1 u-text-center u-text-primary'>Menu</h1>
					{!isOpen ? (
						<IconButton onClick={onOpen} className='menu__header-filter-icon'>
							<FilterIcon />
						</IconButton>
					) : (
						<IconButton onClick={onClose} className='menu__header-filter-icon'>
							<CrossIcon />
						</IconButton>
					)}
				</div>
				{isOpen && (
					<div className='menu__filter'>
						<div className='menu__filter-switch'>
							<LeafIcon />
							<p className='u-text-dark'>Vegetarian</p>
							<Switch
								color='success'
								onToggle={onToggle}
								active={isBtnActive}
							/>
						</div>
						<SearchForm
							onResetBtn={() => {
								setSearchText('');
								setParams(null);
								onBtnClose();
							}}
							onChangeText={(e) => setSearchText(e.target.value)}
							onSubmit={(e) => searchFormSubmit(e)}
							placeholder='Search by name...'
						/>
					</div>
				)}
				<div className='menu__cards'>
					{(isBurgersLoading || isNewBurgersLoading) &&
						Array(6)
							.fill(0)
							.map((_, i) => {
								return <BurgerCardSkeleton key={i} />;
							})}
					{burgers?.map((burger: Burger) => {
						return <BurgerCard key={burger._id} {...{ burger }} />;
					})}
				</div>
			</div>
		</>
	);
};

export default MenuList;
