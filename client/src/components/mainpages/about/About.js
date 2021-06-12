import React from 'react';
import './about.css';
import { motion } from 'framer-motion';
import image from './images/rose-green.png';
import { Link } from 'react-router-dom';
import image2 from './images/about_1296x.jpeg';
import image3 from './images/smile.jpeg';
import image4 from './images/rose-white.png';
import Slider from 'react-slick';

const settings = {
  dots: true,
  // autoplay: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  cssEase: 'linear',
  infinite: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        rtl: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
      },
    },
    {
      breakpoint: 580,
      settings: {
        rtl: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const testimonials = [
  {
    text: 'To say that I love KoHaKu Cosmetics Shop would be an understatement.I love all of your products and services. It’s great that everything you sell is of excellent quality.',
    name: 'Yuki Mio',
    job: '(housewife)',
  },
  {
    text: 'I would like to thank you for a wonderful product. I suffer from extreme dryness on my hands during the cold season and I`ve tried numerous hand creams and only your product line of hand creams helped me.',
    name: 'Kana Yushikuro',
    job: '(lawyer)',
  },
  {
    text: 'All I can say is WOW! You definitely have a customer for life.I have been looking for a really high - quality and affordable skin care products provider for years, and now I’m so glad I have eventually found it.',
    name: 'Katsuo Nakamura',
    job: '(teacher)',
  },
];

export const About = () => {
  return (
    <motion.div
      initial={{ translateX: '-100vw', transition: { duration: 1 } }}
      animate={{ translateX: '0', transition: { duration: 1 } }}
      exit={{ translateX: '100vw', transition: { duration: 1 } }}
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
                <img src={image4} alt="logo2" />
                <span className="first">Our</span>
                <span className="last">Mission</span>
              </div>
              <div className="body">
                <img src={image3} alt="" />
                <div className="body__right">
                  Our Shop dedicated to enhancing your personal beauty with
                  years of research, fashion sense and hands on experience. We
                  work along side you to reignite that spark of confidence and
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
        <section className="section3">
          <div className="title">
            <img src={image4} alt="" />
            <div className="text">TESTIMONIALS</div>
            <div className="subtext">What our clients say</div>
          </div>
          <div className="content">
            <Slider {...settings}>
              {testimonials.map((tes, index) => {
                return (
                  <div className="content__card" key={index}>
                    <div className="content__text">
                      <i className="fas fa-quote-left"></i>
                      {tes.text}
                      <i className="fas fa-quote-right"></i>
                    </div>
                    <div className="content__name">{tes.name}</div>
                    <div className="content__job">{tes.job}</div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
