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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400"
                  height={23}
                  width={23}
                  id="svg2"
                  version="1.1"
                  xmlnsDc="http://purl.org/dc/elements/1.1/"
                  xmlnsCc="http://creativecommons.org/ns#"
                  xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  xmlnsSvg="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                >
                  <metadata id="metadata8">
                    <rdf>
                      <work rdfAbout>
                        <format>image/svg+xml</format>
                        <type rdfResource="http://purl.org/dc/dcmitype/StillImage" />
                      </work>
                    </rdf>
                  </metadata>
                  <defs id="defs6" />
                  <g
                    transform="matrix(1.3333333,0,0,-1.3333333,0,400)"
                    id="g10"
                  >
                    <g transform="scale(0.1)" id="g12">
                      <path
                        id="path14"
                        style={{
                          fill: '#231f20',
                          fillOpacity: 1,
                          fillRule: 'nonzero',
                          stroke: 'none',
                        }}
                        d="M 2565.21,2412.71 H 450.992 V 0 H 2565.21 V 2412.71 Z M 2366.79,2214.29 V 198.43 H 649.418 V 2214.29 H 2366.79"
                      />
                      <path
                        id="path16"
                        style={{
                          fill: '#231f20',
                          fillOpacity: 1,
                          fillRule: 'nonzero',
                          stroke: 'none',
                        }}
                        d="m 1508.11,2990 h -0.01 c -361.22,0 -654.037,-292.82 -654.037,-654.04 V 2216.92 H 2162.14 v 119.04 c 0,361.22 -292.82,654.04 -654.03,654.04 z m 0,-198.43 c 224.16,0 411.02,-162.7 448.69,-376.23 h -897.39 c 37.66,213.53 224.53,376.23 448.7,376.23"
                      />
                      <path
                        id="path18"
                        style={{
                          fill: '#231f20',
                          fillOpacity: 1,
                          fillRule: 'nonzero',
                          stroke: 'none',
                        }}
                        d="m 1946.24,1868.17 h -876.27 v 169.54 h 876.27 v -169.54"
                      />
                    </g>
                  </g>
                </svg>{' '}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 400"
                height={23}
                width={23}
                id="svg2"
                version="1.1"
                xmlnsDc="http://purl.org/dc/elements/1.1/"
                xmlnsCc="http://creativecommons.org/ns#"
                xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlnsSvg="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
              >
                <metadata id="metadata8">
                  <rdf>
                    <work rdfAbout>
                      <format>image/svg+xml</format>
                      <type rdfResource="http://purl.org/dc/dcmitype/StillImage" />
                    </work>
                  </rdf>
                </metadata>
                <defs id="defs6" />
                <g transform="matrix(1.3333333,0,0,-1.3333333,0,400)" id="g10">
                  <g transform="scale(0.1)" id="g12">
                    <path
                      id="path14"
                      style={{
                        fill: '#231f20',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none',
                      }}
                      d="M 2565.21,2412.71 H 450.992 V 0 H 2565.21 V 2412.71 Z M 2366.79,2214.29 V 198.43 H 649.418 V 2214.29 H 2366.79"
                    />
                    <path
                      id="path16"
                      style={{
                        fill: '#231f20',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none',
                      }}
                      d="m 1508.11,2990 h -0.01 c -361.22,0 -654.037,-292.82 -654.037,-654.04 V 2216.92 H 2162.14 v 119.04 c 0,361.22 -292.82,654.04 -654.03,654.04 z m 0,-198.43 c 224.16,0 411.02,-162.7 448.69,-376.23 h -897.39 c 37.66,213.53 224.53,376.23 448.7,376.23"
                    />
                    <path
                      id="path18"
                      style={{
                        fill: '#231f20',
                        fillOpacity: 1,
                        fillRule: 'nonzero',
                        stroke: 'none',
                      }}
                      d="m 1946.24,1868.17 h -876.27 v 169.54 h 876.27 v -169.54"
                    />
                  </g>
                </g>
              </svg>{' '}
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
