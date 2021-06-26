import * as types from '../constants/order.constants';
import api from '../../utils/api';

const createOrder =
  (shippingAddress, totals, orderUser) => async (dispatch) => {
    dispatch({ type: types.CREATE_ORDER_REQUEST, payload: null });
    try {
      const { data } = await api.post('/orders', {
        shippingAddress,
        totals,
        orderUser,
      });
      dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: types.CREATE_ORDER_FAILURE, payload: null });
    }
  };

const getOrderById = (id) => async (dispatch) => {
  dispatch({ type: types.GET_ORDER_BY_ID_REQUEST, payload: null });
  try {
    const { data } = await api.get(`orders/${id}/order`);
    dispatch({ type: types.GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_BY_ID_FAILURE, payload: null });
  }
};

const deleteOrder = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_ORDER_REQUEST, payload: null });
  try {
    const { data } = await api.delete(`/orders/${id}`);
    dispatch({ type: types.DELETE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.DELETE_ORDER_FAILURE, payload: null });
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  dispatch({ type: types.UPDATE_ORDER_REQUEST, payload: null });
  try {
    const { data } = await api.patch(`/orders/${id}`, { status: status });
    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAILURE, payload: null });
  }
};

const getOrders = () => async (dispatch) => {
  dispatch({ type: types.GET_ORDERS_REQUEST, payload: null });
  try {
    const { data } = await api.get(`/orders`);
    dispatch({ type: types.GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_ORDERS_FAILURE, payload: null });
  }
};

const getOrdersByUser = () => async (dispatch) => {};

export const orderActions = {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrders,
  getOrdersByUser,
  getOrderById,
};
