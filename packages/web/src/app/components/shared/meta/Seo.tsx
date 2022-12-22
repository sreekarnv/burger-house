import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
	title?: string;
	children?: any;
}

const Seo: React.FC<SeoProps> = ({ title, children }) => {
	const titleContent = title ? title : 'Burger House | Best Burgers';

	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{titleContent}</title>
				{children}
			</Helmet>
		</>
	);
};

export default Seo;
