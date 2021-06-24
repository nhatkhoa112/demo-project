import React, { useState } from 'react';
import './orderItems.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { orderActions, orderItemActions } from '../../../../../redux/actions';

export const CartItemE = ({ order, orderId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [orderItem, setOrderItem] = useState({
    quantity: order.quantity,
    status: order.status,
  });
  let options = [
    { value: 'Pending', label: 'Pending' },
    { value: 'On delivery', label: 'On delivery' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Out of stock', label: 'Out of stock' },
  ];
  return (
    <tr className="order-item">
      <th className="table-product-thumbnail">
        <button className="remove" onClick={() => {}}>
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
          height="70px"
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
              if (orderItem.quantity >= 1) {
                setOrderItem({
                  ...orderItem,
                  quantity: orderItem.quantity - 1,
                });
              }
            }}
            className="decrease"
          >
            -
          </button>
          <input type="number" value={orderItem.quantity} onChange={() => {}} />
          <button
            onClick={() => {
              setOrderItem({ ...orderItem, quantity: orderItem.quantity + 1 });
            }}
            className="increase"
          >
            +
          </button>
        </div>
      </th>
      <th className="table-product-info hidden-x ">
        <div>
          $ {(orderItem.quantity * order.price_on_purchase_date).toFixed(2)}
        </div>
      </th>
      <th className="table-product-info hidden-x">
        <div className="btn-actions" style={{ justifyContent: 'center' }}>
          <button
            style={{ margin: '0px 3px' }}
            className="remove"
            onClick={() => {
              dispatch(orderItemActions.deleteOrderItem(order._id, orderId));
            }}
          >
            <i className="far fa-trash-alt"></i>
          </button>

          <button
            style={{ margin: '0px 3px' }}
            className="remove"
            onClick={() => {
              dispatch(
                orderItemActions.updateOrderItem(
                  order._id,
                  orderItem.quantity,
                  orderItem.status,
                  orderId
                )
              );
            }}
          >
            <i className="fas fa-save"></i>
          </button>
        </div>
      </th>
      <th className="table-product-info hidden-x">
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="button-dropdown"
          >
            {orderItem.status}
          </button>
          <ul>
            <li className={isOpen ? 'dropdown' : 'hidden'}>
              {options.map((o) => {
                return (
                  <button
                    key={o.value}
                    onClick={() => {
                      setOrderItem({ ...orderItem, status: o.label });
                      setIsOpen(false);
                    }}
                  >
                    {o.label}
                  </button>
                );
              })}
            </li>
          </ul>
        </div>
      </th>
    </tr>
  );
};
