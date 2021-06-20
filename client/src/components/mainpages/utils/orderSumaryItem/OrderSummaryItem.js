import React from 'react';
import './orderSumaryItem.css';

export const OrderSummaryItem = ({ order }) => {
  return (
    <div className="order-summary-item">
      <div className="item__quantity">{order.quantity}</div>
      <div className="item__image">
        <img src={order.product.images[0].url} alt="" />
      </div>
      <div className="item__title">{order.product.title}</div>
      <div className="item__price">
        ${(order.price_on_purchase_date * order.quantity).toFixed(2)}
      </div>
    </div>
  );
};
