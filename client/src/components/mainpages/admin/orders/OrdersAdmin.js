import React, { useEffect } from 'react';
import './ordersAdmin.css';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../../../redux/actions';
import { Order } from './order/Order';

export const OrdersAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderActions.getOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.order);

  return (
    <div className="order-admin">
      <h4 style={{ margin: '20px 0' }}>Orders table</h4>

      <table className="orders-table">
        <thead>
          <tr>
            <th className="table-name">Order Id</th>
            <th className="table-name">Name</th>
            <th className="table-actions">Email</th>
            <th className="table-actions">Phone Number</th>
            <th className="table-actions">Address</th>
            <th className="table-actions">Totals</th>

            <th
              className="table-actions"
              style={{
                maxWidth: '200px',
              }}
            >
              Order items
            </th>
            <th className="table-actions">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order) => {
              return <Order key={order._id} order={order} />;
            })}
        </tbody>
      </table>
    </div>
  );
};
