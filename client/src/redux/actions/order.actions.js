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

const deleteOrder = () => async (dispatch) => {};

const updateOrder = () => async (dispatch) => {};

const getOrders = () => async (dispatch) => {};

const getOrdersByUser = () => async (dispatch) => {};

export const orderActions = {
  createOrder,
  deleteOrder,
  updateOrder,
  getOrders,
  getOrdersByUser,
  getOrderById,
};
