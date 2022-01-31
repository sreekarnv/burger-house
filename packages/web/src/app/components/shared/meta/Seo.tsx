import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
	title?: string;
	description?: string;
	crawl?: boolean;
}

const Seo: React.FC<SeoProps> = ({
	title,
	description,
	children,
	crawl = true,
}) => {
	const titleContent = title ? title : 'Burger House | Best Burgers';
	const descContent = description
		? description
		: 'Burger House. We Make the best burgers';

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{titleContent}</title>
				<meta name='description' content={descContent} data-rh='true' />
				<meta name='og:title' content={titleContent} />
				<meta name='og:description' content={descContent} />
				<link rel='canonical' href={window.location.href} />
				{!crawl && <meta name='robots' content='noindex' />}
				{children}
			</Helmet>
		</>
	);
};

export default Seo;
