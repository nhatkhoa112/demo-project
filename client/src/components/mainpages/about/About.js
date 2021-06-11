import React from 'react';
import './about.css';
import { motion } from 'framer-motion';
import image from './images/rose-green.png';
import { Link } from 'react-router-dom';
import image2 from './images/about_1296x.jpeg';
import image3 from './images/smile.jpeg';

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="about-page">
        <section className="section1">
          <div className="content">
            <img src={image} alt="rose" />
            <div className="content__title">About us</div>
            <ol className="breadcrumbs-custom">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>About us</li>
            </ol>
          </div>
        </section>
        <section className="section2">
          <img src={image2} alt="" />
          <div className="content">
            <div className="introduce">
              <div className="title">
                <span className="first">Our</span>
                <span className="last">Mission</span>
              </div>
              <div className="body">
                <img src={image3} alt="" />
                <div className="body__right">
                  A shop dedicated to enhancing your personal beauty with years
                  of research, fashion sense and hands on experience. We work
                  along side you to reignite that spark of confidence and
                  self-love. We also believe that we don't have to sacrifice our
                  well being or the environment's well being to achieve our
                  goals.
                  <br />
                  <br /> Though some things can't be helped (yet) we strive to
                  recommend the most effective healthiest option for you. Our
                  Skincare and Makeup brands promise to be free of harmful
                  chemicals and processes, not test on animals, use
                  recycled/compostable materials, the highest quality of
                  ingredients and to be as effective as possible. Thank you for
                  sharing your beauty with me.
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section3"></section>
      </div>
    </motion.div>
  );
};
