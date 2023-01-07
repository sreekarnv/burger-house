import clsx from 'clsx';
import { useRouter } from 'next/router';
import BurgerListItem from '../../components/burger-list-item';
import Button from '../../components/shared/button';
import Heading from '../../components/shared/heading';
import Seo from '../../components/shared/seo';
import BaseLayout from '../../layouts/base-layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart } from '../../store/modules/cart';
import { trpc } from '../../utils/trpc';
import { NextPageWithLayout } from '../_app';

import classes from './cart.module.scss';

const CartPage: NextPageWithLayout = ({}) => {
  const router = useRouter();
  const context = trpc.useContext();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartValue = useAppSelector((state) => state.cart.value);
  const cartPrice = useAppSelector((state) => state.cart.price);
  const user = context.auth.user.getData();
  const dispatch = useAppDispatch();

  const { mutate: createOrder, isLoading } = trpc.order.create.useMutation({
    onSuccess() {
      dispatch(clearCart());
      router.replace('/dashboard');
    },
  });

  return (
    <>
      <Seo title="Cart" />
      <div className={classes.root}>
        {cartValue > 0 ? (
          <>
            <div className={classes.content}>
              <div className={classes['content__header']}>
                <Heading align="left" variant="h3" color="dark">
                  Your Cart{' '}
                  <span className="u-text-primary">({cartValue})</span>{' '}
                </Heading>
              </div>
              <ul className={classes['content__list']}>
                {cartItems?.map((burger) => {
                  return <BurgerListItem key={burger._id} burger={burger} />;
                })}
              </ul>
            </div>

            <div className={classes.total}>
              <div>
                <div className={classes['total__header']}>
                  <Heading component="h3" color="dark" variant="h3">
                    Cart Total
                  </Heading>
                </div>
                <ul className={classes['total__details']}>
                  <li className={classes['total__item']}>
                    <p className="u-fw-400 u-text-primary">Subtotal</p>
                    <p className="u-text-tertiary">Rs {cartPrice}</p>
                  </li>
                  <li className={classes['total__item']}>
                    <p className="u-fw-400 u-text-primary">Tax</p>
                    <p className="u-text-tertiary">Rs 30</p>
                  </li>
                </ul>
              </div>
              <div className={classes['total__cta__container']}>
                <div className={clsx([classes['total__cta']])}>
                  <h1>Total</h1>
                  <h1 className="u-text-tertiary">Rs {cartPrice + 30}</h1>
                </div>
                <div className={classes['total__btn']}>
                  {user ? (
                    <Button
                      onClick={async () => {
                        const items = [] as any;

                        cartItems.forEach((item) => {
                          const ingredients = [...item.ingredients];

                          let itemIngredients = ingredients;

                          if (item.photo?.url) {
                            itemIngredients = ingredients.map(
                              (ingredient: any) => {
                                return {
                                  ...ingredient.ingredient,
                                  amount: ingredient.amount,
                                };
                              }
                            );
                          }

                          items.push({
                            itemsInCart: item.itemsInCart,
                            photoUrl: item.photo?.url ?? '/burgers/default.svg',
                            name: item.name,
                            isVegetarian: item.isVegetarian,
                            price: item.price,
                            ingredients: itemIngredients,
                          });
                        });

                        return createOrder({
                          items,
                          price: cartPrice,
                        });
                      }}
                      className="u-w-100"
                      variant="primary-outline"
                    >
                      {isLoading ? 'Loading...' : 'Place Order'}
                    </Button>
                  ) : (
                    <Button
                      className="u-w-100"
                      variant="primary-outline"
                      isLink
                      href="/auth/login?redirect=/cart"
                    >
                      Login To Place Order
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={clsx([classes.empty, 'u-text-center'])}>
            <Heading
              textTransform="uppercase"
              hasMarginBottom
              variant="h1"
              color="primary"
            >
              Your Cart is empty
            </Heading>
            <Button isLink href="/menu" variant="tertiary">
              Check Menu
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

CartPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default CartPage;
