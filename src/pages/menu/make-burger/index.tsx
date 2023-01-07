import MenuNavCard from '../../../components/menu-nav-card';
import Heading from '../../../components/shared/heading';
import Seo from '../../../components/shared/seo';
import BaseLayout from '../../../layouts/base-layout';
import { NextPageWithLayout } from '../../_app';
import classes from './diet-choice.module.scss';

const DietChoice: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="Menu | Make Your Burger" />
      <div className={classes.root}>
        <Heading variant="h2" component="h2" color="primary">
          Choose your diet
        </Heading>
        <div className={classes.nav}>
          <MenuNavCard to={`/menu/make-burger/vegetarian`} veg />
          <MenuNavCard to={`/menu/make-burger/non-vegetarian`} />
        </div>
      </div>
    </>
  );
};

DietChoice.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};

export default DietChoice;
