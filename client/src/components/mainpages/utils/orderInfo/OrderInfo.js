import React from 'react';
import './orderInfo.css';
import { useSelector } from 'react-redux';
import { OrderItemRow } from '../orderItemRow/OrderItemRow';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export const OrderInfo = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="order-info-page">
      <h3>Order Information</h3>
      <div className="section">
        <div className="content-box">
          <div
            role="table"
            className="content-box__row content-box__row--tight-spacing-vertical"
          >
            <div role="row" className="review-block">
              <div className="review-block__inner">
                <div role="rowheader" className="review-block__label">
                  Name:
                </div>
                <div
                  role="cell"
                  className="review-block__content"
                  data-review-section="shipping-cost"
                >
                  {user.name}
                </div>
              </div>
            </div>

            <div role="row" className="review-block">
              <div className="review-block__inner">
                <div role="rowheader" className="review-block__label">
                  Contact:
                </div>
                <div role="cell" className="review-block__content">
                  <bdo dir="ltr">{user.email}</bdo>
                </div>
              </div>
            </div>

            <div role="row" className="review-block">
              <div className="review-block__inner">
                <div role="rowheader" className="review-block__label">
                  Phone number:
                </div>
                <div
                  role="cell"
                  className="review-block__content"
                  data-review-section="shipping-cost"
                >
                  {user.orders.length > 0 &&
                    user.orders[user.orders?.length - 1].shippingAddress
                      .phoneNumber}
                </div>
              </div>
            </div>

            <div role="row" className="review-block">
              <div className="review-block__inner">
                <div role="rowheader" className="review-block__label">
                  Ship to
                </div>
                <div role="cell" className="review-block__content">
                  <address className="address address--tight">
                    {user.orders.length > 0 &&
                      user.orders[user.orders?.length - 1].shippingAddress
                        .address}
                    {', '}
                    {user.orders.length > 0 &&
                      user.orders[user.orders?.length - 1].shippingAddress
                        .cityOrProvince}
                    {', '}
                    {user.orders.length > 0 &&
                      user.orders[user.orders?.length - 1].shippingAddress
                        .countryOrRegion}
                    <address></address>
                  </address>
                </div>
              </div>
            </div>
            <div role="row" className="review-block">
              <div className="review-block__inner">
                <div role="rowheader" className="review-block__label">
                  Created At:
                </div>
                <div role="cell" className="review-block__content">
                  <bdo dir="ltr">
                    {' '}
                    {
                      <Moment format="DD / MM / YYYY">
                        {user.orders.length > 0 &&
                          user.orders[user.orders?.length - 1].createdAt.format}
                      </Moment>
                    }
                  </bdo>
                </div>
              </div>
            </div>
            <div role="row" className="review-block">
              <div className="review-block__inner">
                <div role="rowheader" className="review-block__label">
                  Totals:
                </div>
                <div role="cell" className="review-block__content">
                  USD $
                  {(
                    user.orders.length > 0 &&
                    user.orders[user.orders?.length - 1].totals
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th className="table-thumbnail">Image</th>
            <th className="table-name">Name</th>
            <th className="table-subtotal">Subtotal</th>
            <th className="table-remove">Status</th>
            <th className=" hidden-xyz ">{'Price'}</th>
            <th className=" hidden-xyz ">{'Quantity'}</th>
          </tr>
        </thead>
        <tbody>
          {user.orders?.length > 0 &&
            user.orders[user.orders?.length - 1].orderItems?.map((order) => {
              return <OrderItemRow key={order._id} order={order} />;
            })}
        </tbody>
      </table>

      <h4>
        If you want to change or remove the order, please call me with phone
        number +84 (0) 122 333 444
      </h4>

      <div className="btn-wrapper">
        <Link to="/">Back to Home Page</Link>
      </div>
    </div>
  );
};
