import React from 'react';
import './Products.css';
import { motion } from 'framer-motion';

export const Products = () => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.75 }}
      >
        <div className="product-page">
       
        </div>
      </motion.div>
    </>
  );
};
