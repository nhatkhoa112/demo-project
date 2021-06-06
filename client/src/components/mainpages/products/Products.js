import React from 'react';
import './Product.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import image from '../auth/image/image3.svg';
import image2 from '../auth/image/image4.svg';
import image3 from './image/anh-nen-thien-nhien-bo-bien-song-vo_085322243.jpg';
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
      <div className="production">
        <Link to="/cart">
          <motion.img
            initial={{ x: '30vw' }}
            animate={{ x: '0' }}
            exit={{ x: '30vw', width: '400px', height: '400px' }}
            transition={{ duration: 2 }}
            src={image}
            alt="image"
            width="200px"
            height="200px"
          />
        </Link>
      </div>
    </motion.div>
    // </motion.div>
  );
};
