import React, { useState, useEffect } from 'react';
import logo from './icon/typography-image-1-83x72.png';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, orderItemActions } from '../../redux/actions';
let prevScrollY = 0;

export const Header = () => {
  const { orderUser } = useSelector((state) => state.orderUser);
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.orderItems.orderItemsOfUser);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user.role === 1 ? true : false;
  const profileRoute = `/auth/${user.id}`;
  const cartRoute = `/cart`;
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
                {isAdmin ? (
                  <NavLink
                    activeClassName="active-navLink"
                    to="/category_admin"
                  >
                    Category
                  </NavLink>
                ) : (
                  <NavLink activeClassName="active-navLink" to="/about">
                    About us
                  </NavLink>
                )}
              </div>
              <div className="item">
                {isAdmin ? (
                  <NavLink to="/users_admin" activeClassName="active_navLink">
                    Users
                  </NavLink>
                ) : (
                  <NavLink activeClassName="active-navLink" to="/products">
                    <div>Products</div>

                    <i className="fas fa-chevron-up"></i>
                  </NavLink>
                )}
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
                {isAdmin ? (
                  <NavLink
                    activeClassName="active-navLink"
                    to="/products_admin"
                  >
                    Products A
                  </NavLink>
                ) : (
                  <NavLink activeClassName="active-navLink" to="/news">
                    News
                  </NavLink>
                )}
              </div>
              <div className="item ">
                {isAdmin ? (
                  <NavLink activeClassName="active-navLink" to="/order_admin">
                    Orders
                  </NavLink>
                ) : (
                  <NavLink
                    activeClassName="active-navLink"
                    exact
                    to={isAuthenticated ? profileRoute : '/'}
                  >
                    Profile
                  </NavLink>
                )}
              </div>
              <div className="item ">
                {isAuthenticated ? (
                  <button onClick={() => dispatch(authActions.logout())}>
                    Sign Out
                  </button>
                ) : (
                  <NavLink activeClassName="active-navLink" to="/login">
                    SIGN IN / UP
                  </NavLink>
                )}
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
              {isAdmin ? (
                <NavLink activeClassName="active-navLink" to="/category_admin">
                  Category
                </NavLink>
              ) : (
                <NavLink activeClassName="active-navLink" to="/about">
                  About us
                </NavLink>
              )}
            </li>
            <li className="item">
              {isAdmin ? (
                <NavLink to="/users_admin" activeClassName="active_navLink">
                  Users
                </NavLink>
              ) : (
                <NavLink activeClassName="active-navLink" to="/products">
                  <div>Products</div>

                  <i className="fas fa-chevron-up"></i>
                </NavLink>
              )}
            </li>
            <li className="item">
              {isAdmin ? (
                <NavLink activeClassName="active-navLink" to="/products_admin">
                  Products A
                </NavLink>
              ) : (
                <NavLink activeClassName="active-navLink" to="/news">
                  News
                </NavLink>
              )}
            </li>
            <li className="item">
              {isAdmin ? (
                <NavLink activeClassName="active-navLink" to="/order_admin">
                  Orders
                </NavLink>
              ) : (
                <NavLink
                  activeClassName="active-navLink"
                  exact
                  to={isAuthenticated ? profileRoute : '/'}
                >
                  Profile
                </NavLink>
              )}
            </li>
            <li className="item">
              {isAuthenticated ? (
                <button onClick={() => dispatch(authActions.logout())}>
                  Sign Out
                </button>
              ) : (
                <NavLink activeClassName="active-navLink" to="/login">
                  SIGN IN / UP
                </NavLink>
              )}
            </li>

            {isAuthenticated ? (
              <div className={isAdmin ? 'user-btn pink' : 'user-btn'}>
                <NavLink
                  to={
                    isAuthenticated
                      ? isAdmin
                        ? '/products_admin'
                        : profileRoute
                      : '/'
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 400"
                    height={23}
                    width={23}
                    id="svg2"
                    version="1.1"
                    xmlnsdc="http://purl.org/dc/elements/1.1/"
                    xmlnscc="http://creativecommons.org/ns#"
                    xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlnssvg="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                  >
                    <metadata id="metadata8">
                      <rdf>
                        <work rdfabout="true">
                          <format>image/svg+xml</format>
                          <type rdfresource="http://purl.org/dc/dcmitype/StillImage" />
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
                            fillOpacity: 1,
                            fillRule: 'nonzero',
                            stroke: 'none',
                          }}
                          d="m 1506.87,2587.11 c -225.04,0 -408.14,-183.08 -408.14,-408.11 0,-225.06 183.1,-408.13 408.14,-408.13 225.02,0 408.13,183.07 408.13,408.13 0,225.03 -183.11,408.11 -408.13,408.11 z m 0,-1038.56 c -347.64,0 -630.432,282.79 -630.432,630.45 0,347.63 282.792,630.43 630.432,630.43 347.63,0 630.42,-282.8 630.42,-630.43 0,-347.66 -282.79,-630.45 -630.42,-630.45 v 0"
                        />
                        <path
                          id="path16"
                          style={{
                            fillOpacity: 1,
                            fillRule: 'nonzero',
                            stroke: 'none',
                          }}
                          d="M 399.648,361.789 H 2614.07 c -25.06,261.531 -139.49,503.461 -327.47,689.831 -124.25,123.14 -300.78,193.96 -483.86,193.96 h -591.76 c -183.61,0 -359.601,-70.82 -483.863,-193.96 C 539.148,865.25 424.719,623.32 399.648,361.789 Z M 2730.69,139.461 H 283.035 c -61.558,0 -111.16,49.59 -111.16,111.16 0,363.438 141.68,704 398.32,959.019 165.657,164.55 399.414,258.82 640.785,258.82 h 591.76 c 241.94,0 475.14,-94.27 640.8,-258.82 256.63,-255.019 398.31,-595.581 398.31,-959.019 0,-61.57 -49.59,-111.16 -111.16,-111.16 v 0"
                        />
                      </g>
                    </g>
                  </svg>
                </NavLink>
              </div>
            ) : (
              ''
            )}
            <div className="cart-btn">
              {isAuthenticated && !isAdmin ? (
                <NavLink to={cartRoute}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 400 400"
                    height={23}
                    width={23}
                    id="svg2"
                    version="1.1"
                    xmlnsdc="http://purl.org/dc/elements/1.1/"
                    xmlnscc="http://creativecommons.org/ns#"
                    xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlnssvg="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                  >
                    <metadata id="metadata8">
                      <rdf>
                        <work rdfabout="true">
                          <format>image/svg+xml</format>
                          <type rdfresource="http://purl.org/dc/dcmitype/StillImage" />
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
                  <span className={orderUser.length > 0 ? 'count' : 'hidden'}>
                    {orderUser?.length}
                  </span>
                </NavLink>
              ) : (
                ''
              )}
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
          {isAuthenticated ? (
            <div className={isAdmin ? 'user-btn pink' : 'user-btn'}>
              <NavLink
                to={
                  isAuthenticated
                    ? isAdmin
                      ? '/products_admin'
                      : profileRoute
                    : '/'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400"
                  height={23}
                  width={23}
                  id="svg2"
                  version="1.1"
                  xmlnsdc="http://purl.org/dc/elements/1.1/"
                  xmlnscc="http://creativecommons.org/ns#"
                  xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  xmlnssvg="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                >
                  <metadata id="metadata8">
                    <rdf>
                      <work rdfabout="true">
                        <format>image/svg+xml</format>
                        <type rdfresource="http://purl.org/dc/dcmitype/StillImage" />
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
                          fillOpacity: 1,
                          fillRule: 'nonzero',
                          stroke: 'none',
                        }}
                        d="m 1506.87,2587.11 c -225.04,0 -408.14,-183.08 -408.14,-408.11 0,-225.06 183.1,-408.13 408.14,-408.13 225.02,0 408.13,183.07 408.13,408.13 0,225.03 -183.11,408.11 -408.13,408.11 z m 0,-1038.56 c -347.64,0 -630.432,282.79 -630.432,630.45 0,347.63 282.792,630.43 630.432,630.43 347.63,0 630.42,-282.8 630.42,-630.43 0,-347.66 -282.79,-630.45 -630.42,-630.45 v 0"
                      />
                      <path
                        id="path16"
                        style={{
                          fillOpacity: 1,
                          fillRule: 'nonzero',
                          stroke: 'none',
                        }}
                        d="M 399.648,361.789 H 2614.07 c -25.06,261.531 -139.49,503.461 -327.47,689.831 -124.25,123.14 -300.78,193.96 -483.86,193.96 h -591.76 c -183.61,0 -359.601,-70.82 -483.863,-193.96 C 539.148,865.25 424.719,623.32 399.648,361.789 Z M 2730.69,139.461 H 283.035 c -61.558,0 -111.16,49.59 -111.16,111.16 0,363.438 141.68,704 398.32,959.019 165.657,164.55 399.414,258.82 640.785,258.82 h 591.76 c 241.94,0 475.14,-94.27 640.8,-258.82 256.63,-255.019 398.31,-595.581 398.31,-959.019 0,-61.57 -49.59,-111.16 -111.16,-111.16 v 0"
                      />
                    </g>
                  </g>
                </svg>
              </NavLink>
            </div>
          ) : (
            ''
          )}
          <div className="cart-btn">
            {isAuthenticated && !isAdmin ? (
              <NavLink to={cartRoute}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 400"
                  height={23}
                  width={23}
                  id="svg2"
                  version="1.1"
                  xmlnsdc="http://purl.org/dc/elements/1.1/"
                  xmlnscc="http://creativecommons.org/ns#"
                  xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                  xmlnssvg="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                >
                  <metadata id="metadata8">
                    <rdf>
                      <work rdfabout="true">
                        <format>image/svg+xml</format>
                        <type rdfresource="http://purl.org/dc/dcmitype/StillImage" />
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
                <span className={orderItems.length > 0 ? 'count' : 'hidden'}>
                  {orderItems?.length}
                </span>
              </NavLink>
            ) : (
              ''
            )}
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
          {isAdmin ? (
            <NavLink activeClassName="active-navLink" to="/category_admin">
              Category
            </NavLink>
          ) : (
            <NavLink activeClassName="active-navLink" to="/about">
              About us
            </NavLink>
          )}
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          {isAdmin ? (
            <NavLink to="/users_admin" activeClassName="active_navLink">
              Users
            </NavLink>
          ) : (
            <NavLink activeClassName="active-navLink" to="/products">
              <div>Products</div>

              <i className="fas fa-chevron-up"></i>
            </NavLink>
          )}
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          {isAdmin ? (
            <NavLink activeClassName="active-navLink" to="/products_admin">
              Products A
            </NavLink>
          ) : (
            <NavLink activeClassName="active-navLink" to="/news">
              News
            </NavLink>
          )}
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          {isAdmin ? (
            <NavLink activeClassName="active-navLink" to="/order_admin">
              Orders
            </NavLink>
          ) : (
            <NavLink
              activeClassName="active-navLink"
              exact
              to={isAuthenticated ? profileRoute : '/'}
            >
              Profile
            </NavLink>
          )}
        </li>
        <li onClick={() => setIsOpen(false)} className="item">
          {isAuthenticated ? (
            <button onClick={() => dispatch(authActions.logout())}>
              Sign Out
            </button>
          ) : (
            <NavLink activeClassName="active-navLink" to="/login">
              SIGN IN / UP
            </NavLink>
          )}
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
