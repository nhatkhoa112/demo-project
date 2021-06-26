import React, { useState } from 'react';
import './order.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../../../../redux/actions';

export const Order = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(order.status);
  const dispatch = useDispatch();

  let options = [
    { value: 'Pending', label: 'Pending' },
    { value: 'On delivery', label: 'On delivery' },
    { value: 'Completed', label: 'Completed' },
  ];

  let totals = 0;
  order.orderItems?.length > 0 &&
    order.orderItems.map((order) => {
      if (order.status !== 'Out of stock') {
        totals += order.quantity * order.price_on_purchase_date;
      }
    });

  return (
    <tr>
      <td
        className="table-name"
        style={{ fontSize: '10px', maxWidth: '150px' }}
      >
        {order._id}
      </td>
      <td className="table-name" style={{ fontSize: '10px', maxWidth: '80px' }}>
        {order.owner.name}
      </td>
      <td
        className="table-name"
        style={{ fontSize: '10px', maxWidth: '120px' }}
      >
        {order.owner.email}
      </td>
      <td className="table-name" style={{ fontSize: '10px', width: '120px' }}>
        {order.shippingAddress.phoneNumber}
      </td>
      <td className="table-name" style={{ fontSize: '10px', width: '180px' }}>
        {order.shippingAddress.address} {', '}
        {order.shippingAddress.cityOrProvince} {', '}
        {order.shippingAddress.countryOrRegion}
      </td>
      <td className="table-name" style={{ fontSize: '10px' }}>
        ${totals.toFixed(2)}
      </td>
      <td
        className="table-name"
        style={{
          fontSize: '10px',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
        }}
      >
        {order.orderItems.map((o) => {
          return (
            <Link
              key={o._id}
              className="nav-link"
              to={`orderItems/${order._id}`}
            >
              {o.product.title}
            </Link>
          );
        })}{' '}
      </td>
      <td className="table-name">
        <button onClick={() => setIsOpen(!isOpen)} className="button-dropdown">
          {status}
        </button>
        <ul>
          <li className={isOpen ? 'dropdown' : 'hidden'}>
            {options.map((t) => {
              return (
                <button
                  onClick={() => {
                    setStatus(t.label);
                    dispatch(orderActions.updateOrder(order._id, t.label));

                    setIsOpen(false);
                  }}
                  key={t.value}
                >
                  {t.label}
                </button>
              );
            })}
          </li>
        </ul>
      </td>
    </tr>
  );
};
