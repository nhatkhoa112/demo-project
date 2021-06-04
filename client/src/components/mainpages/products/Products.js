import React from 'react';
import './Product.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import image from '../auth/image/image3.svg';
import { Link } from 'react-router-dom';

export const Products = () => {
  const transition = { duration: 0.6, ease: [0.6, 0.13, 0.25, 0.9] };
  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.75 }}
    // >
    <motion.div transition={transition} className="products-page">
      <Link to="/cart">
        <motion.img src={image} alt="image" width="200px" height="200px" />
      </Link>
    </motion.div>
    // </motion.div>
  );
};
