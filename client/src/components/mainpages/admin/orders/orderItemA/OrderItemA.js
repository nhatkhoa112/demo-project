import React, { useEffect } from 'react';
import './orderItemA.css';
import { useSelector, useDispatch } from 'react-redux';
import { orderActions } from '../../../../../redux/actions';
import { useParams } from 'react-router-dom';
import { CartItemE } from '../cartItem/CartItem';

export const OrderItemA = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const order = orders?.find((o) => o._id === id);

  useEffect(() => {
    dispatch(orderActions.getOrders());
  }, [dispatch]);

  return (
    <div className="OrderItemA">
      <h4 style={{ margin: '30px' }}>Order Item Table</h4>
      <table className="order-table">
        <thead>
          <tr>
            <th className="table-thumbnail">Image</th>
            <th className="table-name">Name</th>
            <th className="hidden-xy">Price</th>
            <th className="hidden-xy">Quantity</th>
            <th className="table-subtotal">Subtotal</th>
            <th className="table-remove">Action</th>
            <th className="table-remove">Status</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order.orderItems?.length > 0 &&
            order.orderItems.map((o) => {
              return <CartItemE key={o._id} order={o} orderId={order._id} />;
            })}
        </tbody>
      </table>
    </div>
  );
};
