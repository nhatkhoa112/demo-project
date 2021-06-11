import React from 'react';
import './cart.css';
import { motion } from 'framer-motion';

export const Cart = () => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.75 }}
      >
        <div className="cart-page"></div>
      </motion.div>
    </>
  );
};
