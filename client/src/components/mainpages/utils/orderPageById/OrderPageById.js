import React from 'react';
import { useSelector } from 'react-redux';
import './orderPageById.css';
import { OrderItemRow } from '../orderItemRow/OrderItemRow';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';

export const OrderPageById = () => {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();

  const order = user.orders?.find((order) => order._id === id);

  return (
    <div className="order-info-page">
      <h3>Order Information</h3>
      {order && (
        <>
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
                      {order && order.shippingAddress.phoneNumber}
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
                        {order.shippingAddress.address}
                        {', '}
                        {order.shippingAddress.cityOrProvince}
                        {', '}
                        {order.shippingAddress.countryOrRegion}
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
                            {order.createdAt}
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
                      USD ${order.totals.toFixed(2)}
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
                <th className="hidden-xy ">{'Price'}</th>
                <th className="hidden-xy  ">{'Quantity'}</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((order) => {
                return <OrderItemRow key={order._id} order={order} />;
              })}
            </tbody>
          </table>

          <h4>
            If you want to change or remove the order, please call me with phone
            number +84 (0) 122 333 444
          </h4>

          <div className="btn-wrapper">
            <Link to={`/auth/${user.id}`}>Back to Profile Page</Link>
          </div>
        </>
      )}
    </div>
  );
};
