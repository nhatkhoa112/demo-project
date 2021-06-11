import React, { useState, useEffect } from 'react';
import logo from './icon/typography-image-1-83x72.png';
import cart from './icon/cart.png';
import { NavLink } from 'react-router-dom';
let prevScrollY = 0;

export const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInforOpen, setIsInforOpen] = useState(false);
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY - prevScrollY > 200) {
      setIsScroll(true);
    }
    if (currentScrollY - prevScrollY <= 200) {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="header-page">
        <div className={isScroll ? 'header-hidden' : 'header'}>
          <div className="left-menu">
            <div className="left__top">
              <div className=" item active ">
                <NavLink activeClassName="active-navLink" to="/">
                  Home
                </NavLink>
              </div>
              <div className="item ">
                <NavLink activeClassName="active-navLink" to="/about">
                  About us
                </NavLink>
              </div>
              <div className="item">
                <NavLink activeClassName="active-navLink" to="/products">
                  <div>Products</div>

                  <i className="fas fa-chevron-up"></i>
                </NavLink>
              </div>
            </div>
            <div className="left__bottom">
              <i className="fas fa-home"></i>
              <div>9th, Hoang Dieu Street, Hoi An city</div>
            </div>
          </div>
          <div className="logo">
            <NavLink activeClassName="active-navLink" to="/">
              <img src={logo} alt="logo" />
              <span className="title">KoHaKu</span>
              <span>COSMETICS</span>
              <p>shop</p>
            </NavLink>
          </div>
          <div className="right-menu">
            <div className="right__top">
              <div className=" item ">
                <NavLink activeClassName="active-navLink" to="/news">
                  News
                </NavLink>
              </div>
              <div className="item ">
                <NavLink activeClassName="active-navLink" to="/user/:id">
                  Profile Page
                </NavLink>
              </div>
              <div className="item ">
                <NavLink activeClassName="active-navLink" to="/login">
                  SIGN IN / UP
                </NavLink>
              </div>
            </div>
            <div className="right__bottom">
              <i className="fas fa-phone"></i>
              <div> +84 122 333 444</div>
            </div>
          </div>
        </div>
        <div className={isScroll ? 'header2' : 'header-hidden'}>
          <ul className="menu">
            <li
              className="item 
            "
            >
              <NavLink activeClassName="active-navLink" to="/">
                Home
              </NavLink>
            </li>
            <li className="item">
              <NavLink activeClassName="active-navLink" to="/about">
                About us
              </NavLink>
            </li>
            <li className="item">
              <NavLink activeClassName="active-navLink" to="/products">
                <div>Products</div>
              </NavLink>{' '}
            </li>
            <li className="item">
              <NavLink activeClassName="active-navLink" to="/news">
                News
              </NavLink>
            </li>
            <li className="item">
              <NavLink activeClassName="active-navLink" to="/profiles">
                Profile{' '}
              </NavLink>
            </li>
            <li className="item">
              <NavLink activeClassName="active-navLink" to="/login">
                SIGN IN / UP
              </NavLink>
            </li>
            <div className="cart-btn">
              <NavLink to="cart">
                <img src={cart} alt="cart" />
                <span className="count">0</span>
              </NavLink>
            </div>
          </ul>
        </div>

        <div className="header3">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={isOpen ? 'menu-btn open' : 'menu-btn'}
          >
            <span className="menu-btn__burger"></span>
          </div>
          <div className="logo">
            <img src={logo} alt="logo" />
            <NavLink to="/">
              <div className="logo__title">
                <span className="name">kohaku</span>
                <span>cosmetics</span>
              </div>
            </NavLink>
          </div>
          <div className="cart-btn">
            <NavLink to="cart">
              <img src={cart} alt="cart" />
              <span className="count">0</span>
            </NavLink>
          </div>
          <div
            className="info-btn"
            onClick={() => setIsInforOpen(!isInforOpen)}
          >
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>
      </div>

      <div className={isOpen ? 'sidebar sidebar-show' : 'sidebar'}>
        <li onClick={() => setIsOpen(false)} className="item">
          <NavLink activeClassName="active-navLink" to="/">
            Home
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <NavLink activeClassName="active-navLink" to="/about">
            About us
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <NavLink activeClassName="active-navLink" to="/products">
            <div>Products</div>
            <i className="fas fa-chevron-right"></i>
          </NavLink>{' '}
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <NavLink activeClassName="active-navLink" to="/">
            News
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <NavLink activeClassName="active-navLink" to="/user/:id">
            Profile Page
          </NavLink>
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <NavLink activeClassName="active-navLink" to="/login">
            SIGN IN / UP
          </NavLink>
        </li>
      </div>

      <div className={isInforOpen ? 'sidebar-card card-open' : 'sidebar-card'}>
        <div className="left__bottom">
          <i className="fas fa-home"></i>
          <div>9th, Hoang Dieu Street, Hoi An city</div>
        </div>
        <div className="right">
          <i className="fas fa-phone"></i>
          <div> +84 122 333 444</div>
        </div>
      </div>
    </>
  );
};
