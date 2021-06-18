import * as types from '../constants/orderUser.constants';
import { v4 as uuid_v4 } from 'uuid';

const createOrderUser =
  (product, quantity, price_on_purchase_date) => async (dispatch) => {
    const orderUser = JSON.parse(localStorage.getItem('OrderUser')) || [];
    const orderItemUser = {
      orderId: uuid_v4(),
      product,
      quantity,
      price_on_purchase_date,
    };

    let idx = orderUser.findIndex((o) => o.product._id === product._id);

    if (idx === -1) {
      orderUser.unshift(orderItemUser);
    } else {
      orderUser[idx].quantity += quantity;
      orderUser[idx].price_on_purchase_date = price_on_purchase_date;
    }

    dispatch({ type: types.CREATE_ORDER_USER_SUCCESS, payload: orderUser });
  };

const getOrderUser = () => async (dispatch) => {
  const orderUser = JSON.parse(localStorage.getItem('OrderUser')) || [];
  dispatch({ type: types.GET_ORDER_USER_SUCCESS, payload: orderUser });
};

const updateOrderUser = (id, quantity) => async (dispatch) => {
  let orderUser = JSON.parse(localStorage.getItem('OrderUser'));

  if (quantity === 0) {
    orderUser = orderUser.filter((o) => o.orderId !== id);
  } else {
    let idx = orderUser.findIndex((o) => o.orderId === id);
    orderUser[idx].quantity = quantity;
  }

  dispatch({ type: types.UPDATE_ORDER_USER_SUCCESS, payload: orderUser });
};

const deleteOrderUser = (id) => async (dispatch) => {
  let orderUser = JSON.parse(localStorage.getItem('OrderUser'));
  let idx = orderUser.findIndex((o) => o.orderId === id);
  orderUser.splice(idx, 1);
  dispatch({ type: types.DELETE_ORDER_USER_SUCCESS, payload: orderUser });
};

export const orderUserActions = {
  createOrderUser,
  getOrderUser,
  updateOrderUser,
  deleteOrderUser,
};
