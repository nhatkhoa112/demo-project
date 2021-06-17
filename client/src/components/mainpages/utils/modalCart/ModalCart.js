import React from 'react';
import './modalCart.css';
import { Modal } from './ModalElements.js';
import { Link } from 'react-router-dom';

export const ModalCart = ({ quantity, product, isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} className="modal-cart">
      <div className="modal-cart">
        <div className="modal-card">
          <button onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
          <div className="product-info">
            <div className="alert">Added to cart successfully!</div>
            <img
              src={
                product.images?.length > 0 ? product.images[0].url : undefined
              }
              alt=""
            />
            <div className="modal-product-title">{product.title}</div>
            <div className="modal-product-price">
              <span className="modal-first">Price</span>
              <span className="modal-last">
                $
                {product && product.sale
                  ? ((product.price * (100 - product.sale)) / 100)?.toFixed(2)
                  : product.price?.toFixed(2)}{' '}
              </span>
            </div>
            <div className="modal-quantity">
              <span className="modal-first">Quantity: </span>

              <span className="modal-last">{quantity}</span>
            </div>
            <div className="modal-quantity">
              <span className="modal-first">Cart Total: </span>

              <span className="modal-last">
                ${(quantity * product.price).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="wrapper-btn">
            <p>
              {' '}
              There are <span>8</span> items
              <br />
              in your cart
            </p>
            <div className="cart-total">
              CART TOTALS : <span>$ 180.00</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="continue">
              continue shopping
            </button>
            <Link to="/cart" className="go-to-cart">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
