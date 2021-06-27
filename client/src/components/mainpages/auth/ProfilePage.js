import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './profilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import image from './image/rose-green.png';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { authActions } from '../../../redux/actions';

export const ProfilePage = ({ userOrder, setUserOrder }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [newUser, setNewUser] = useState({
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  });
  let imageUpload = [];
  const [avatar, setAvatar] = useState(user.avatar);
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) return <Redirect to="/" />;

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'kohaku121',
      uploadPreset: 'ml_default',
    },
    (error, result) => {
      if (result.event === 'success') {
        imageUpload.push({
          public_id: result.info.public_id,
          url: result.info.secure_url,
        });

        setAvatar(imageUpload[0].url);
        dispatch(
          authActions.updateProfile(user.name, user.email, imageUpload[0].url)
        );
      }
    }
  );

  let handleOpenWidget = (e) => {
    e.preventDefault();
    widget.open();
  };

  return (
    <div className="profile-page">
      {isOpen ? (
        <section className="update-user">
          <div className="update-card">
            <button onClick={() => setIsOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
            <form className="sign-in-form">
              <h2 className="title">Update </h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  autoComplete="new-password"
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="User Name"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  autoComplete="new-password"
                  type="text"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>

              <input
                onClick={() => {
                  dispatch(
                    authActions.updateProfile(
                      newUser.name,
                      newUser.email,
                      newUser.avatar
                    )
                  );
                  setIsOpen(false);
                }}
                type="submit"
                defaultValue="Login"
                className="btn solid"
              />
            </form>
          </div>
        </section>
      ) : (
        ''
      )}

      <section className="section1">
        <div className="content">
          <img src={image} alt="rose" />
          <div className="content__title">Profile Info</div>
          <ol className="breadcrumbs-custom">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>ProfilePage</li>
          </ol>
        </div>
      </section>

      <div className="user-info">
        <div className="avatar">
          <button onClick={handleOpenWidget} className="change-avatar">
            +
          </button>
          <img src={user.avatar} alt="avatar" />
        </div>
        <div className="content">
          <div className="name">
            Username: <span>{user.name}</span>
          </div>
          <div className="email">
            Email: <span>{user.email}</span>
          </div>
          <div className="action">
            Action:{' '}
            <span onClick={() => setIsOpen(true)}>
              <i className="fas fa-pen"></i>
            </span>{' '}
            {/* <span>
              <i className="far fa-trash-alt"></i>
            </span> */}
          </div>
        </div>
      </div>
      <div className="orders">
        <h4>Recent orders</h4>
        {user.orders?.length > 0 ? (
          <table className="woocommerce-orders-table woocommerce-MyAccount-orders shop_table shop_table_responsive my_account_orders account-orders-table">
            <thead>
              <tr>
                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-number">
                  <span className="nobr">Order Id</span>
                </th>
                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-date hidden-on">
                  <span className="nobr">Date</span>
                </th>
                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-status">
                  <span className="nobr">Status</span>
                </th>
                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-total hidden-on">
                  <span className="nobr">Total</span>
                </th>
                <th className="woocommerce-orders-table__header woocommerce-orders-table__header-order-actions">
                  <span className="nobr">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {user.orders.length > 0 &&
                user.orders.map((order) => {
                  return (
                    <tr
                      key={order._id}
                      className="woocommerce-orders-table__row woocommerce-orders-table__row--status-processing order"
                    >
                      <td
                        className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-number id"
                        data-title="Order"
                      >
                        {order._id}
                      </td>
                      <td
                        className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-date hidden-on"
                        data-title="Date"
                      >
                        <time datetime="2021-06-22T12:07:04+00:00">
                          <Moment format="DD / MM / YYYY">
                            {order.createdAt}
                          </Moment>
                        </time>
                      </td>
                      <td
                        className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-status"
                        data-title="Status"
                      >
                        {order.status}
                      </td>
                      <td
                        className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-total hidden-on"
                        data-title="Total"
                      >
                        <span className="woocommerce-Price-amount amount">
                          <span className="woocommerce-Price-currencySymbol">
                            $
                          </span>
                          {order.totals.toFixed(2)}
                        </span>{' '}
                        for {order.orderItems?.length} items
                      </td>
                      <td
                        className="woocommerce-orders-table__cell woocommerce-orders-table__cell-order-actions"
                        data-title="Actions"
                      >
                        <Link to={`/order/${order._id}`}>View</Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <h5>You don't have any order, let chose some product!!!</h5>
        )}
      </div>
    </div>
  );
};
