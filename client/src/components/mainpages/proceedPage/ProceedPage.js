import React, { useState } from 'react';
import './proceedPage.css';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { OrderSummaryItem } from '../utils/orderSumaryItem/OrderSummaryItem';
import { Link } from 'react-router-dom';
import { orderActions, orderUserActions } from '../../../redux/actions';

export const ProceedPage = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(true);
  const [isOpenShip, setIsOpenShip] = useState(false);
  const [isOpenPay, setIsOpenPay] = useState(false);
  const { orderUser } = useSelector((state) => state.orderUser);
  const user = useSelector((state) => state.auth.user);
  const shippingPriceLocal = JSON.parse(localStorage.getItem('addressPrice'));
  const [shippingPrice, setShippingPrice] = useState(shippingPriceLocal || 0);

  const addressLocal = JSON.parse(localStorage.getItem('address'));

  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState(
    addressLocal || {
      address: '',
      cityOrProvince: '',
      countryOrRegion: '',
      phoneNumber: 0,
    }
  );

  let price = 0;
  orderUser.map((o) => {
    price += o.price_on_purchase_date * o.quantity;
  });

  let totals = price + shippingPrice;

  return (
    <div className="proceed-page">
      <div className="proceed__header">
        <div className="logo">KoHaKu Shop - The cosmetics Ecommerce</div>
        <div className="url">
          <li>
            <NavLink to="/cart" activeClassName="activeNavLink">
              Cart
            </NavLink>{' '}
            {`>`}
          </li>
          <li>
            {isOpenInfo ? (
              <span>Information</span>
            ) : (
              <button
                onClick={() => {
                  setIsOpenInfo(true);
                  setIsOpenShip(false);
                  setIsOpenPay(false);
                }}
              >
                Information
              </button>
            )}

            {`>`}
          </li>
          <li>
            {isOpenShip ? (
              <span>Shipping</span>
            ) : (
              <button
                onClick={() => {
                  setIsOpenInfo(false);
                  setIsOpenShip(true);
                  setIsOpenPay(false);
                }}
              >
                Shipping
              </button>
            )}

            {`>`}
          </li>
          <li>
            {isOpenPay ? (
              <span>Payment</span>
            ) : (
              <button
                onClick={() => {
                  setIsOpenInfo(false);
                  setIsOpenShip(false);
                  setIsOpenPay(true);
                }}
              >
                Payment
              </button>
            )}
          </li>
        </div>
      </div>
      <div className="proceed__content">
        <div className="user-info">
          <div className="main-info">
            <div className="main__content">
              <ContentInformation isOpenInfo={isOpenInfo}>
                <div className="contact__info">
                  <div className="contact__title">Contact Information</div>
                  <div className="contact__name">
                    <span className="item__title">Username: </span>{' '}
                    <span>{user.name}</span>
                  </div>
                  <div className="contact__email">
                    <span className="item__title">Email: </span>{' '}
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="shipping-address">
                  <div className="shipping__title">Shipping Address</div>

                  <div className="shipping__item">
                    <input
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                      autoComplete="new-password"
                      placeholder="Address format no, street, commune, district"
                      className="input-item"
                      type="text"
                    />
                  </div>
                  <div className="shipping__item">
                    <input
                      value={shippingAddress.cityOrProvince}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          cityOrProvince: e.target.value,
                        })
                      }
                      autoComplete="new-password"
                      placeholder="City or Province"
                      className="input-item"
                      type="text"
                    />
                  </div>

                  <div className="shipping__item">
                    <input
                      value={shippingAddress.countryOrRegion}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          countryOrRegion: e.target.value,
                        })
                      }
                      autoComplete="new-password"
                      placeholder="Country or region"
                      type="text"
                      className="input-item-1"
                    />
                    <input
                      value={shippingAddress.phoneNumber}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          phoneNumber: e.target.value,
                        })
                      }
                      autoComplete="new-password"
                      placeholder="Phone Number"
                      type="number"
                      className="input-item-2"
                    />
                  </div>
                  <div className="btn-wrapper">
                    <button
                      onClick={() => {
                        localStorage.setItem(
                          'address',
                          JSON.stringify(shippingAddress)
                        );
                        setIsOpenInfo(false);
                        setIsOpenShip(true);
                        setIsOpenPay(false);
                      }}
                    >
                      Continue to Shipping
                    </button>
                    <Link to="/cart">Return to Cart</Link>
                  </div>
                </div>
              </ContentInformation>
              <ContentShipping isOpenShip={isOpenShip}>
                <div className="information__table">
                  <div className="table__contact">
                    <span>Contact</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="table__ship">
                    <span>Ship to</span>
                    <span>
                      {shippingAddress.address +
                        ', ' +
                        shippingAddress.cityOrProvince +
                        ', ' +
                        shippingAddress.countryOrRegion}
                    </span>
                  </div>
                </div>
                <div className="information__method">
                  <div className="table__contact">
                    <button
                      onClick={() => {
                        setShippingPrice(0);
                      }}
                      className={shippingPrice ? '' : 'active'}
                    >
                      Standard
                    </button>
                    <span>Free</span>
                  </div>
                  <div className="table__ship">
                    <button
                      onClick={() => {
                        setShippingPrice(15);
                      }}
                      className={shippingPrice ? 'active' : ''}
                    >
                      Fast method
                    </button>
                    <span>15$</span>
                  </div>
                </div>
                <div className="information__btn">
                  <div className="btn-wrapper">
                    <button
                      onClick={() => {
                        localStorage.setItem(
                          'addressPrice',
                          JSON.stringify(shippingPrice)
                        );
                        setIsOpenInfo(false);
                        setIsOpenShip(false);
                        setIsOpenPay(true);
                      }}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </ContentShipping>
              <ContentPayment isOpenPay={isOpenPay}>
                <div className="shop__alert">
                  <h2>Sorry, now shop only have COD payment method</h2>
                </div>
                <button
                  onClick={() => {
                    let result = window.confirm(
                      'Are you sure to create the payment.'
                    );
                    if (result) {
                      dispatch(
                        orderActions.createOrder(
                          shippingAddress,
                          totals,
                          orderUser
                        )
                      );
                      dispatch(orderUserActions.deleteAllOrderUsers());
                      // window.location.href = '/thanks';
                    }
                  }}
                >
                  Accept payment
                </button>
              </ContentPayment>
            </div>
          </div>
        </div>
        <div className="order-info">
          <div className="main-info">
            <div className="order__summary">
              {orderUser.map((order) => {
                return <OrderSummaryItem key={order.orderId} order={order} />;
              })}
            </div>
            <div className="order__subtotal">
              <div className="content__subtotal">
                <span>Subtotal: </span>
                <span>${price.toFixed(2)}</span>
              </div>
              <div className="content__shippingPrice">
                <span>Shipping: </span>
                <span>
                  {shippingPrice ? `$ ${shippingPrice.toFixed(2)}` : 'Free'}
                </span>
              </div>
            </div>
            <div className="order__total">
              <span>Total: </span>
              <span> $ {(price + shippingPrice).toFixed(2)} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentInformation = styled.div`
  display: ${({ isOpenInfo }) => (isOpenInfo ? 'flex' : 'none')};
  width: 100%;
  height: auto;
  flex-direction: column;
`;

const ContentShipping = styled.div`
  display: ${({ isOpenShip }) => (isOpenShip ? 'flex' : 'none')};
  width: 100%;
  height: auto;
  flex-direction: column;
`;
const ContentPayment = styled.div`
  display: ${({ isOpenPay }) => (isOpenPay ? 'flex' : 'none')};
  width: 100%;
  height: auto;
  flex-direction: column;
  align-items: center;
  > button {
    margin-top: 20px;
    width: 200px;
    height: 70px;
    background: #3590c6;
    color: white;
    font-size: 16px;
    font-weight: 600;
  }
`;
