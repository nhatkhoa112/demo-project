import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import image from './image/bg-image-21.jpeg';

export const Footer = () => {
  return (
    <div className="footer-page">
      <img src={image} alt="" />
      <div className="content">
        <div className="content__links">
          <div className="content__title">Links</div>
          <div className="items">
            <li>
              <Link to="/">news & event</Link>
            </li>
            <li>
              <Link to="/">TERMS & CONDITIONS</Link>
            </li>
            <li>
              <Link to="/">PRIVACY POLICY</Link>
            </li>
            <li>
              <Link to="/">RETURN POLICY</Link>
            </li>
            <li>
              <Link to="/">ABOUT US</Link>
            </li>
            <li>
              <Link to="/">INGREDIENTS</Link>
            </li>
          </div>
        </div>
        <div className="content__categories">
          <div className="content__title">Category</div>
          <div className="items">
            <li>
              <Link to="/">Face</Link>
            </li>
            <li>
              <Link to="/">Body</Link>
            </li>
            <li>
              <Link to="/">Hair</Link>
            </li>
            <li>
              <Link to="/">Hands-feet</Link>
            </li>
            <li>
              <Link to="/">Hello</Link>
            </li>
            <li>
              <Link to="/">Bye</Link>
            </li>
          </div>
        </div>
        <div className="content__info">
          <div className="content__top">
            <div className="content__title">Get In Touch</div>
            <div className="info__text">
              <div className="text__item">
                9th, Hoang Dieu Street, Hoi An city
              </div>
              <div className="text__item">
                <span>+84 {0} 122 333 444</span>
              </div>
              <div className="text__item">
                Email:
                <span className="email">nhatkhoa.tin@gmail.com</span>
              </div>
              <div className="text__icons"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
