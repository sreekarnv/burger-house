import { motion, Variants } from 'framer-motion';
import React from 'react';

const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,

    transition: {
      duration: 0.4,
      delay: 0.3,
    },
  },
  out: {
    opacity: 0,
  },
};

interface PageFade {
  children: React.ReactNode;
}

const PageFade: React.FC<PageFade> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageFade;
