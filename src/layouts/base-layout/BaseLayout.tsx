import React from 'react';
import Footer from '../shared/footer';
import Navbar from '../shared/navbar';

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default BaseLayout;
