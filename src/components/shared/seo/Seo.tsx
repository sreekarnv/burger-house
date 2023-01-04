import Head from 'next/head';
import React from 'react';

interface SeoProps {
  title?: string;
  children?: React.ReactNode;
}

const Seo: React.FC<SeoProps> = ({ title, children }) => {
  const fullTitle = `Burger House ${title ? `| ${title}` : ''}`.trim();

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta property="og:title" content={fullTitle} />
        <meta name="twitter:title" content={fullTitle} />
        {children}
      </Head>
    </>
  );
};

export default Seo;
