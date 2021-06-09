import React, { useState, useEffect } from 'react';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import logo from './icon/typography-image-1-83x72.png';
import { Link } from 'react-router-dom';
let prevScrollY = 0;

export const Header = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInforOpen, setIsInforOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
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
                <Link to="/">Home</Link>
              </div>
              <div className="item ">
                <Link to="/about">About us</Link>
              </div>
              <div
                className="item"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <Link to="/products">
                  <div>Products</div>

                  <i className="fas fa-chevron-up"></i>
                </Link>
              </div>
            </div>
            <div className="left__bottom">
              <i className="fas fa-home"></i>
              <div>9th, Hoang Dieu Street, Hoi An city</div>
            </div>
          </div>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
              <span className="title">KoHaKu</span>
              <span>COSMETICS</span>
              <p>shop</p>
            </Link>
          </div>
          <div className="right-menu">
            <div className="right__top">
              <div className=" item ">
                <Link to="/">News</Link>
              </div>
              <div className="item ">
                <Link to="/user/:id">Profile Page</Link>
              </div>
              <div className="item ">
                <Link to="/login">SIGN IN/UP</Link>
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
            <li className="item active">
              <Link to="/">Home</Link>
            </li>
            <li className="item">
              <Link to="/about">About us</Link>
            </li>
            <li className="item">
              <Link to="/products">
                <div>Products</div>
              </Link>{' '}
            </li>
            <li className="item">
              <Link to="/">News</Link>
            </li>
            <li className="item">
              <Link to="/user/:id">Profile </Link>
            </li>
            <li className="item">
              <Link to="/login">SIGN IN/UP</Link>
            </li>
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
            <Link to="/">
              <div className="logo__title">
                <span className="name">kohaku</span>
                <span>cosmetics</span>
              </div>
            </Link>
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
          <Link to="/">Home</Link>
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <Link to="/about">About us</Link>
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <Link to="/products">
            <div>Products</div>
            <i className="fas fa-chevron-right"></i>
          </Link>{' '}
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <Link to="/">News</Link>
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <Link to="/user/:id">Profile Page</Link>
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          <Link to="/login">SIGN IN/UP</Link>
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
