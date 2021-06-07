import React, { useState } from 'react';
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [menu, setMenu] = useState(false);

  const adminRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(false)}>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li onClick={() => setMenu(false)}>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </>
    );
  };

  return (
    <div className="header-page">
      <header className="header">
        <div className="menu" onClick={() => setMenu(!menu)}>
          <img src={Menu} alt="" width="30" />
        </div>

        <div className="logo">
          <h1>
            <Link to="/">{isAdmin ? 'Admin' : 'KoHaKu Shop'}</Link>
          </h1>
        </div>

        <ul className={menu ? 'menu-show' : ''}>
          <li onClick={() => setMenu(false)}>
            <Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link>
          </li>

          {isAdmin && adminRouter()}

          {isLogged ? (
            loggedRouter()
          ) : (
            <li onClick={() => setMenu(false)}>
              <Link to="/login">Login ✥ Register</Link>
            </li>
          )}

          <li onClick={() => setMenu(!menu)}>
            <img src={Close} alt="" width="30" className="close" />
          </li>
        </ul>

        {isAdmin ? (
          ''
        ) : (
          <div className="cart-icon">
            <span>{0}</span>
            <Link to="/cart">
              <img src={Cart} alt="" width="30" />
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};
