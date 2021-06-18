import React, { useState } from 'react';
import './orderItems.css';
import { useDispatch, useSelector } from 'react-redux';
import { orderItemActions } from '../../../../redux/actions';
import { Link } from 'react-router-dom';

export const OrderItem = ({ order }) => {
  const [quantity, setQuantity] = useState(order.quantity);
  const dispatch = useDispatch();
  return (
    <tr className="order-item">
      <th className="table-product-thumbnail">
        <button
          className="remove"
          onClick={() => {
            dispatch(orderItemActions.deleteOrderItem(order._id));
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
        <div>
          <Link to={`/product/${order.product._id}`}>
            {order.product.title}
          </Link>
        </div>
      </th>
      <th className="table-product-info">
        <div>$ {order.price_on_purchase_date.toFixed(2)}</div>
      </th>
      <th className="table-product-info">
        <div className="form-quantity">
          <button
            onClick={() => {
              if (quantity > 1) {
                dispatch(
                  orderItemActions.updateOrderItem(order._id, quantity - 1)
                );
              }
              if (quantity === 1) {
                dispatch(orderItemActions.deleteOrderItem(order._id));
              }
            }}
            className="decrease"
          >
            -
          </button>
          <input type="number" value={quantity} />
          <button
            onClick={() => {
              dispatch(
                orderItemActions.updateOrderItem(order._id, quantity + 1)
              );
            }}
            className="increase"
          >
            +
          </button>
        </div>
      </th>
      <th className="table-product-info hidden ">
        <div>$ {(quantity * order.price_on_purchase_date).toFixed(2)}</div>
      </th>
      <th className="table-product-info hidden">
        <div className="btn-actions">
          <button
            className="remove"
            onClick={() => {
              dispatch(orderItemActions.deleteOrderItem(order._id));
            }}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </th>
    </tr>
  );
};
