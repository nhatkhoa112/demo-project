import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { DetailProduct } from './detailProduct/DetailProduct';
import { Products } from './products/Products';
import { PrivateRoute } from '../privateRoute/PrivateRoute';
import { PrivateAdminRoute } from '../privateRoute/PrivateAdminRoute';
import { ProfilePage } from './auth/ProfilePage';
import { Login } from './auth/Login';
import { Home } from './homePage/Home';
import { About } from './about/About';
import { Cart } from './cart/Cart';
import { NotFound } from './utils/not_found/NotFound';
import { Thanks } from './utils/welcome/Thanks';
import { ActivationPage } from './auth/ActivationPage';
import { AnimatePresence } from 'framer-motion';
import { ProceedPage } from './proceedPage/ProceedPage';
import { OrderInfo } from '../mainpages/utils/orderInfo/OrderInfo';
import { ProductsAdmin } from '../mainpages/admin/products/ProductsAdmin';
import { CategoriesAdmin } from '../mainpages/admin/categories/CategoriesAdmin';
import { OrdersAdmin } from '../mainpages/admin/orders/OrdersAdmin';
import { OrderPageById } from '../mainpages/utils/orderPageById/OrderPageById';
import { UsersAdmin } from './admin/users/UsersAdmin';
import { OrderItemA } from './admin/orders/orderItemA/OrderItemA';
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
        <Route path="/proceed" exact component={() => <ProceedPage />} />
        <Route path="/thanks" exact component={Thanks} />
        <Route path="/orderInfo" exact component={OrderInfo} />
        <PrivateAdminRoute
          path="/products_admin"
          exact
          component={ProductsAdmin}
        />
        <PrivateAdminRoute
          path="/category_admin"
          exact
          component={CategoriesAdmin}
        />
        <PrivateAdminRoute
          path="/orderItems/:id"
          exact
          component={OrderItemA}
        />
        <PrivateAdminRoute path="/users_admin" exact component={UsersAdmin} />
        <PrivateAdminRoute path="/order_admin" exact component={OrdersAdmin} />
        <PrivateRoute path="/order/:id" exact component={OrderPageById} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
};
