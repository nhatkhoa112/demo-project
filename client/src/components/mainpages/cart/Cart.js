import React, { useEffect, useState } from 'react';
import './cart.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image from './images/rose-green.png';
import { useSelector } from 'react-redux';
import { CartItem } from '../utils/cartItem/CartItem';

export const Cart = () => {
  const { orderUser } = useSelector((state) => state.orderUser);

  let price = 0;

  orderUser.map((o) => {
    price += o.quantity * o.price_on_purchase_date;
  });

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.75 }}
      >
        <div className="cart-page">
          <section className="section1">
            <div className="content">
              <img src={image} alt="rose" />
              <div className="content__title">Cart</div>
              <ol className="breadcrumbs-custom">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Cart</li>
              </ol>
            </div>
          </section>

          <div className="cart-content">
            <div className="order-info">
              {orderUser?.length === 0 ? (
                <div>
                  <h2 className="text-center">
                    Your cart is empty, let chose some products
                  </h2>
                  <Link className="alink" to="/products">
                    {' '}
                    Back to Shop
                  </Link>
                </div>
              ) : (
                <table className="order-table">
                  <thead>
                    <tr>
                      <th className="table-thumbnail">Image</th>
                      <th className="table-name">Name</th>
                      <th className="table-price">Price</th>
                      <th className="table-ble-quantity">Quantity</th>
                      <th className="table-ble-subtotal">Subtotal</th>
                      <th className="table-ble-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderUser?.length > 0 &&
                      orderUser.map((order) => {
                        return <CartItem key={order.orderId} order={order} />;
                      })}
                  </tbody>
                </table>
              )}
            </div>
            <div className="total-info">
              <div className="cart-totals">
                <h2>Cart Totals</h2>
                <div className="sub">
                  <span>Subtotal: </span>
                  <span className="second"> ${price.toFixed(2)} </span>
                </div>
                <div className="all">
                  <span>Total: </span>
                  <span className="second">${price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    if (price === 0) {
                      alert(
                        "You don't have any product in cart, let chose some"
                      );
                    } else {
                      window.location.href = '/proceed';
                    }
                  }}
                  className="checkout"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
