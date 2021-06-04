import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Products } from './products/Products';
import { Login } from './auth/Login';
import { Cart } from './cart/Cart';
import { NotFound } from './utils/not_found/NotFound';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
// import { DetailProduct } from './detailProduct/DetailProduct';

export const MainPages = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <ToastContainer />
      <Switch location={location} key={location.pathname}>
        {/* <Route path="/detail/:id" exact component={DetailProduct} /> */}
        <Route path="/" exact component={Products} />
        <Route path="/login" exact component={Login} />
        <Route path="/cart" exact component={Cart} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
};
