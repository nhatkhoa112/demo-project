import * as types from '../constants/orderItem.constants';
import api from '../../utils/api';

const getAllOrderItems = () => async (dispatch) => {};

const getOrderItemsByUserId = (id) => async (dispatch) => {
  dispatch({ type: types.GET_ORDER_ITEMS_BY_USER_ID_REQUEST, payload: null });
  try {
    const { data } = await api.get(`/orderItems/${id}`);
    dispatch({
      type: types.GET_ORDER_ITEMS_BY_USER_ID_SUCCESS,
      payload: null,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_ORDER_ITEMS_BY_USER_ID_FAILURE,
      payload: null,
    });
  }
};

const createOrderItem = () => async (dispatch) => {};

const updateOrderItem = () => async (dispatch) => {};

const deleteOrderItem = () => async (dispatch) => {};

export const orderItemActions = {
  getAllOrderItems,
  getOrderItemsByUserId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
