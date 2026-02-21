import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router';
import { ReactNode } from 'react';
import { pageEnterVariants } from '../lib/animations';

/**
 * PageTransition Component
 * Wraps page content with smooth fade/slide animations
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageEnterVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default PageTransition;
