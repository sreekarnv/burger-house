import './backdrop.scss';

import * as React from 'react';

import { AnimatePresence, Variants, motion } from 'framer-motion';

type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	show: boolean;
	onClose: () => void;
	className?: string;
};

const variants: Variants = {
	hide: {
		opacity: 0,
		transition: {
			duration: 0.3,
			type: 'tween',
		},
	},
	show: {
		opacity: 1,
		transition: {
			duration: 0.3,
			type: 'tween',
		},
	},
};

const Backdrop: React.FC<Props> = ({ show, onClose, className }) => {
	return (
		<AnimatePresence>
			{show && (
				<motion.div
					typeof='div'
					variants={variants}
					initial='hide'
					animate='show'
					exit='hide'
					onClick={(e) => {
						onClose();
					}}
					className={`backdrop ${className ? className : ''}`}></motion.div>
			)}
		</AnimatePresence>
	);
};

export default Backdrop;
