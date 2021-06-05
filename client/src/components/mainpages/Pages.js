import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { DetailProduct } from './detailProduct/DetailProduct';
import { Products } from './products/Products';
import { Login } from './auth/Login';
import { Cart } from './cart/Cart';
import { NotFound } from './utils/not_found/NotFound';
import { ActivationPage } from './auth/ActivationPage';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

export const MainPages = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <ToastContainer />
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Products} />
        <Route path="/login" exact component={Login} />
        <Route path="/cart" exact component={Cart} />
        <Route
          path="/user/activate/:active_token"
          exact
          component={ActivationPage}
        />
        <Route path="/product/detail/:id" exact component={DetailProduct} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
};
