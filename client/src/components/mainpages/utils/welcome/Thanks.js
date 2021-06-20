import React from 'react';
import './notFound.css';
import image from '../../about/images/rose-green.png';
import { Link } from 'react-router-dom';

export const Thanks = () => {
  return (
    <div className="thanks">
      <section className="section1">
        <div className="content">
          <img src={image} alt="rose" />
          <div className="content__title">
            Thank you for choosing our products{' '}
          </div>
          <div className="content__link">
            <Link to="/">Go to Home Page</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
