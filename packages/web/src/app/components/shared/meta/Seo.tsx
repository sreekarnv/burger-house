import React from 'react';
import { Helmet } from 'react-helmet';

interface SeoProps {
	title?: string;
}

const Seo: React.FC<SeoProps> = ({ title, children }) => {
	return (
		<>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{title}</title>
				{children}
			</Helmet>
		</>
	);
};

export default Seo;
