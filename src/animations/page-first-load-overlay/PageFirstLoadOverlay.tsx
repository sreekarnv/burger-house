import { motion, TargetAndTransition, Variants } from 'framer-motion';
import React from 'react';

interface PageFirstLoadOverlayProps {
  children: React.ReactNode;
}

const overlayDefaultStyles: TargetAndTransition = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  background: '#000',
  zIndex: '9999',
};

const overlayVariants: Variants = {
  initial: {
    ...overlayDefaultStyles,
    opacity: 1,
    y: 0,
    visibility: 'visible',
    scrollbarWidth: 'none',
  },
  in: {
    ...overlayDefaultStyles,
    opacity: 1,
    height: '100vh',
    y: '100vh',
    visibility: 'hidden',
    display: 'none',
    scrollbarWidth: 'auto',
    transition: {
      duration: 1.2,
      y: {
        delay: 1.4,
        duration: 1.4,
      },
      visibility: {
        delay: 3,
        duration: 1.2,
      },
      display: {
        delay: 3,
        duration: 1.2,
      },
    },
  },
};

const loadVariants: Variants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      delay: 3,
    },
  },
};

const PageFirstLoadOverlay: React.FC<PageFirstLoadOverlayProps> = ({
  children,
}) => {
  return (
    <>
      <motion.div initial="initial" animate="in" variants={overlayVariants} />
      <motion.div initial="initial" animate="in" variants={loadVariants}>
        {children}
      </motion.div>
    </>
  );
};

export default PageFirstLoadOverlay;
