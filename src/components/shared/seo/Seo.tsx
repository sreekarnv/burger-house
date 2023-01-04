import Head from 'next/head';
import React from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const Seo: React.FC<SeoProps> = ({
  title,
  children,
  description = 'We make the best burgers',
}) => {
  const fullTitle = `Burger House ${title ? `| ${title}` : ''}`.trim();

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`}
        />
        <meta name="author" content="Sreekar Venkata Nutulapati" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {children}
      </Head>
    </>
  );
};

export default Seo;
