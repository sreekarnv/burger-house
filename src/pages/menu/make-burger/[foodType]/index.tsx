import clsx from 'clsx';

import classes from './food-type.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useRouter } from 'next/router';
import useAlert from '../../../../hooks/use-alert';
import {
  initIngredients,
  resetIngredients,
} from '../../../../store/modules/customBurger';
import { addBurgerToCart } from '../../../../store/modules/cart';
import Alert from '../../../../components/shared/alert';
import Button from '../../../../components/shared/button';
import Burger from '../../../../components/burger/Burger';
import IngredientControls from '../../../../components/ingredient-controls';
import { trpc } from '../../../../utils/trpc';
import BaseLayout from '../../../../layouts/base-layout';
import { NextPageWithLayout } from '../../../_app';
import PageLoader from '../../../../components/shared/loaders/page-loader/PageLoader';
import Seo from '../../../../components/shared/seo';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '../../../../server/trpc/router/_app';
import { createSSGContext } from '../../../../server/trpc/context';
import superjson from 'superjson';
import { Ingredient } from '../../../../server/models/ingredient.model';

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { foodType: 'vegetarian' },
      },
      {
        params: { foodType: 'non-vegetarian' },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createSSGContext() as any,
    transformer: superjson,
  });

  await ssg.ingredient.all.prefetch();

  return {
    props: {
      trpcState: JSON.parse(JSON.stringify(ssg.dehydrate())),
    },
  };
}

const MakeBurger: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading } = trpc.ingredient.all.useQuery(undefined, {
    onSuccess: (data: Ingredient[]) => {
      dispatch(initIngredients({ ingredients: data }));
    },
  });

  const { alertMessage, alertType, setAlert, showAlert } = useAlert();

  const displayIngredients = useAppSelector(
    (state) => state.customBurger.displayIngredients
  );
  const ingredients = useAppSelector((state) => state.customBurger.ingredients);

  const burgerPrice = useAppSelector((state) => state.customBurger.burgerPrice);

  const onResetIngredients = () => {
    dispatch(resetIngredients());
    setAlert('danger', 'You reset all ingredients');
  };

  // Add burger to cart
  const addToCart = async () => {
    let id = '';

    const cartIngredients = [...ingredients];

    ingredients.forEach((ingredient: any) => {
      if (ingredient.amount !== 0)
        id += `${ingredient.name}-${ingredient.amount}-`;
    });

    cartIngredients.forEach((ingredient: any) => {
      // eslint-disable-next-line
      ingredient = { ...ingredient, items: ingredient.amount };
    });

    const burger = {
      name: 'Custom Burger',
      price: burgerPrice,
      _id: id,
      ingredients,
      isVegetarian: router.query.foodType === 'vegetarian' ? true : false,
    };

    dispatch(addBurgerToCart({ burger }));
    setAlert('success', 'Added burger to cart');
  };

  if (isLoading) {
    return <PageLoader variant="embed" />;
  }

  return (
    <>
      <Seo title="Menu | Make Your Burger" />

      {showAlert && (
        <Alert type={alertType} position="bottom-right">
          {alertMessage}
        </Alert>
      )}

      <div className={classes.back}>
        <Button variant="primary-outline" isLink href={'/menu/make-burger'}>
          Go Back
        </Button>
      </div>

      <div className={classes['make-burger']}>
        <div className={classes['make-burger-burger']}>
          <Burger ingredients={displayIngredients as any} />
        </div>
        <div className={classes['make-burger-controls']}>
          <IngredientControls
            type={
              router.query.foodType as
                | 'vegetarian'
                | 'non-vegetarian'
                | undefined
            }
            ingredients={ingredients as any}
          />
        </div>
        <div className={classes['make-burger-cta']}>
          <h3
            className={clsx(
              classes['make-burger-cta-price'],
              'u-text-uppercase u-text-center u-text-tertiary'
            )}
          >
            Burger Price: Rs {burgerPrice}
          </h3>
          <div className={classes['make-burger-cta-btns']}>
            <Button
              variant="dark-outline"
              disabled={burgerPrice > 350 ? false : true}
              onClick={onResetIngredients}
              type="reset"
            >
              Reset
            </Button>
            <Button
              onClick={addToCart}
              disabled={burgerPrice > 350 ? false : true}
              type="submit"
              variant="success-outline"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

MakeBurger.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default MakeBurger;
