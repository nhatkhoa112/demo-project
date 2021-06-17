import React from 'react';
import './cart.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image from './images/rose-green.png';

export const Cart = () => {
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
              <table className="order-table">
                <thead>
                  <tr>
                    <th class="table-thumbnail">Image</th>
                    <th class="table-name">Name</th>
                    <th class="table-price">Price</th>
                    <th class="table-quantity">Quantity</th>
                    <th class="table-subtotal">Subtotal</th>
                    <th class="table-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="order-item">
                    <th class="table-product-thumbnail"></th>
                    <th class="table-product-name">table-product</th>
                    <th class="table-product-price">Price</th>
                    <th class="table-product-quantity">Quantity</th>
                    <th class="table-product-subtotal">Subtotal</th>
                    <th class="table-product-remove">Remove</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="total-info">
              <div className="cart-totals">
                <h2>Cart Totals</h2>
                <div className="sub">
                  <span>Subtotal: </span>
                  <span className="second"> $49.00 </span>
                </div>
                <div className="all">
                  <span>Total: </span>
                  <span className="second">$49.00</span>
                </div>
                <button className="checkout">Proceed to checkout</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
