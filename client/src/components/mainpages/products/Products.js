import React from 'react';
import './Products.css';
import { motion } from 'framer-motion';
import image from '../auth/image/image3.svg';

export const Products = () => {
  const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.75 }}
      >
        <div className="product-page"></div>
      </motion.div>
    </>
  );
};
