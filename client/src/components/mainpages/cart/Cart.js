import React from 'react';
import './cart.css';
import { motion } from 'framer-motion';
import image from '../auth/image/image3.svg';

export const Cart = () => {
  const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.75 }}
      >
        <div className="cart-page">
          <motion.img
            initial={{
              width: '200px',
              height: '200px',
            }}
            animate={{
              width: '100%',
              height: '350px',
              transition: { delay: 0.2, ...transition },
            }}
            className="image"
            src={image}
            alt="image"
          />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }}></motion.div>
    </>
  );
};
