import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { DetailProduct } from './detailProduct/DetailProduct';
import { Products } from './products/Products';
import { PrivateRoute } from '../privateRoute/PrivateRoute';
import { ProfilePage } from './auth/ProfilePage';
import { Login } from './auth/Login';
import { Home } from './homePage/Home';
import { About } from './about/About';
import { Cart } from './cart/Cart';
import { NotFound } from './utils/not_found/NotFound';
import { ActivationPage } from './auth/ActivationPage';
import { AnimatePresence } from 'framer-motion';

export const MainPages = () => {
  const location = useLocation();
  return (
    <AnimatePresence initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={() => <Products />} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Login} />
        <Route path="/cart" exact component={Cart} />
        <Route
          path="/user/activate/:active_token"
          exact
          component={ActivationPage}
        />
        <Route path="/product/:id" exact component={() => <DetailProduct />} />
        <PrivateRoute path="/auth/:id" exact component={ProfilePage} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
};
