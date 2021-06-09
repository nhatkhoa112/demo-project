import React from 'react';
import './home.css';
import image from './images/rose-green.png';
import image2 from './images/typography-image-1-83x72.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="home-page">
        <section className="section1">
          <div className="content">
            <div className="text-content">
              <img src={image} alt="rose-green" />
              <div className="title">Natural Products.</div>
              <div className="body">
                We are collected all our knowledge to deliver you the best
                organic , cosmetology brands in the world
              </div>
            </div>
            <div className="button-content">
              <div className="button-to-products">
                <Link to="/products">View products</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section2">
          <div className="title">
            <img src={image2} alt="logo2" />
            <div>Visit Our Store</div>
          </div>
          <div className="container content "></div>
        </section>

        <section className="section3">
          <div className="title">
            <img src={image2} alt="logo2" />
            <div>Our Best Seller</div>
          </div>
          <div className="container content "></div>
        </section>
      </div>
    </motion.div>
  );
};
