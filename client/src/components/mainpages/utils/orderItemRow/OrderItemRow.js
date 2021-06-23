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
        <div>
          <Link to={`/product/${order.product._id}`}>
            {order.product.title}
          </Link>
        </div>
      </th>
      <th className="table-product-info hidden">
        <div>$ {order.price_on_purchase_date.toFixed(2)}</div>
      </th>
      <th className="table-product-info hidden">
        {' '}
        <div className="quantity">{order.quantity}</div>
      </th>
      <th className="table-product-info  ">
        <div>
          $ {(order.quantity * order.price_on_purchase_date).toFixed(2)}
        </div>
      </th>
      <th className="table-product-info ">
        <div>{order.status}</div>
      </th>
    </tr>
  );
};
