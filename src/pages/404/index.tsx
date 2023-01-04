import clsx from 'clsx';
import Button from '../../components/shared/button';
import Heading from '../../components/shared/heading';
import Seo from '../../components/shared/seo';
import Footer from '../../layouts/shared/footer';
import { NextPageWithLayout } from '../_app';

import classes from './not-found.module.scss';

const NotFoundPage: NextPageWithLayout = ({}) => {
  return (
    <>
      <>
        <Seo title="Burger House | Not Found" />
        <div className={classes.root}>
          <div className={classes.message}>
            <Heading variant="h2" color="white" className={clsx(classes.h2)}>
              Oops...
            </Heading>
            <Heading variant="h1" color="white" className={classes.h1}>
              Page Not Found: 404
            </Heading>
            <Button isLink href="/" color="tertiary">
              Back to Home
            </Button>
          </div>
        </div>
      </>
    </>
  );
};

NotFoundPage.getLayout = (page) => {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};

export default NotFoundPage;
