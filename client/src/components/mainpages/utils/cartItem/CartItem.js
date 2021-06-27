import React, { useState } from 'react';
import './orderItems.css';
import { useDispatch } from 'react-redux';
import { orderUserActions } from '../../../../redux/actions';
import { Link } from 'react-router-dom';

export const CartItem = ({ order }) => {
  const dispatch = useDispatch();
  return (
    <tr className="order-item">
      <th className="table-product-thumbnail">
        <button
          className="remove"
          onClick={() => {
            dispatch(orderUserActions.deleteOrderItem(order.orderId));
          }}
        >
          <i className="far fa-trash-alt"></i>
        </button>
        <img
          src={
            order.product.images?.length > 0
              ? order.product.images[0].url
              : undefined
          }
          alt=" "
          width="70px"
          hieght="70px"
        />
      </th>
      <th className="table-product-info">
        <span>
          <Link to={`/product/${order.product._id}`}>
            {order.product.title}
          </Link>
        </span>
      </th>
      <th className="table-product-info">
        <span>$ {order.price_on_purchase_date.toFixed(2)}</span>
      </th>
      <th className="table-product-info">
        <span className="form-quantity">
          <button
            onClick={() => {
              if (order.quantity > 1) {
                dispatch(
                  orderUserActions.updateOrderUser(
                    order.orderId,
                    order.quantity - 1
                  )
                );
              }
              if (order.quantity === 1) {
                dispatch(orderUserActions.deleteOrderUser(order.orderId));
              }
            }}
            className="decrease"
          >
            -
          </button>
          <input type="number" value={order.quantity} />
          <button
            onClick={() => {
              dispatch(
                orderUserActions.updateOrderUser(
                  order.orderId,
                  order.quantity + 1
                )
              );
            }}
            className="increase"
          >
            +
          </button>
        </span>
      </th>
      <th className="table-product-info hidden-x ">
        <span>
          $ {(order.quantity * order.price_on_purchase_date).toFixed(2)}
        </span>
      </th>
      <th className="table-product-info hidden-x">
        <span className="btn-actions">
          <button
            className="remove"
            onClick={() => {
              dispatch(orderUserActions.deleteOrderUser(order.orderId));
            }}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </span>
      </th>
    </tr>
  );
};
