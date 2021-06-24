import React, { useState } from 'react';
import './orderItemRow.css';
import { Link } from 'react-router-dom';

export const OrderItemRow = ({ order }) => {
  return (
    <tr className="order-item">
      <th className="table-product-thumbnail">
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
      <th className="table-product-info  ">
        <span>
          $ {(order.quantity * order.price_on_purchase_date).toFixed(2)}
        </span>
      </th>
      <th className="table-product-info ">
        <span>{order.status}</span>
      </th>
      <th className="table-product-info hidden-x">
        <span>$ {order.price_on_purchase_date.toFixed(2)}</span>
      </th>
      <th className="table-product-info hidden-x">
        {' '}
        <span className="quantity">{order.quantity}</span>
      </th>
    </tr>
  );
};
