import { Form, Formik } from 'formik';
import React from 'react';
import classes from './menu.module.scss';
import { useRouter } from 'next/router';
import Button from '../../components/shared/button';
import { HiOutlineSearch } from 'react-icons/hi';
import FormInput from '../../components/shared/form-input';
import { trpc } from '../../utils/trpc';
import Heading from '../../components/shared/heading';
import usePagination from '../../hooks/use-pagination';
import Pagination from '../../components/shared/pagination';
import BurgerCardSkeleton from '../../components/burger-card/BurgerCardSkeleton';
import BurgerCard from '../../components/burger-card';
import BaseLayout from '../../layouts/base-layout';
import { NextPageWithLayout } from '../_app';
import Seo from '../../components/shared/seo';

const MenuPage: NextPageWithLayout = ({}) => {
  const router = useRouter();
  const { page, handleNextPage, handlePrevPage, reset, handlePage } =
    usePagination({});
  const [search, setSearch] = React.useState(
    (router.query.search as string) || ''
  );

  const { data, isLoading } = trpc.burger.all.useQuery({
    limit: 4,
    page,
    search,
  });

  return (
    <>
      <Seo title="Menu" />
      <div className={classes.root}>
        <div className={classes.container}>
          <Heading
            variant="h1"
            hasMarginBottom
            weight="regular"
            color="primary"
          >
            Menu
          </Heading>

          <div className={classes.filter}>
            <Formik
              onSubmit={async ({ search: s }, actions) => {
                setSearch(s);

                await handlePage(1);

                await router.push({
                  pathname: router.pathname,
                  query: {
                    page: 1,
                    search: s,
                  },
                });

                actions.resetForm();
              }}
              initialValues={{
                search: '',
              }}
            >
              <Form className={classes.search}>
                <div>
                  <FormInput
                    placeholder="Search by name"
                    className={'u-w-100'}
                    name="search"
                  />
                  <HiOutlineSearch
                    size={20}
                    className={classes['search__icon']}
                  />
                </div>

                <input style={{ display: 'none' }} type="submit" />
              </Form>
            </Formik>

            <div className={classes.cta}>
              {search && (
                <Button
                  onClick={async () => {
                    await router.push({
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        search: undefined,
                      },
                    });

                    setSearch('');

                    reset();
                  }}
                  size="sm"
                  variant="tertiary-outline"
                >
                  Clear Search
                </Button>
              )}
              <Button size="sm" href="/menu/make-burger" isLink>
                Make Burger
              </Button>
            </div>
          </div>

          <div className={classes.items}>
            {isLoading && (
              <>
                {Array(4)
                  .fill(0)
                  .map((_, i) => {
                    return (
                      <BurgerCardSkeleton
                        key={i}
                        imageH={200}
                        numberOfLines={3}
                      />
                    );
                  })}
              </>
            )}

            {!isLoading &&
              data?.burgers.map((burger) => {
                return (
                  <BurgerCard key={burger._id} size="sm" burger={burger} />
                );
              })}
          </div>

          <Pagination
            className={classes.pagination}
            hasMore={!!data?.hasMore}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            page={page}
          />
        </div>
      </div>
    </>
  );
};

MenuPage.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};

export default MenuPage;
