import * as types from '../constants/orderItem.constants';
import api from '../../utils/api';

const getAllOrderItems = () => async (dispatch) => {};

const getAllOrderItemsByUserId = (id) => async (dispatch) => {
  dispatch({
    type: types.GET_ALL_ORDER_ITEMS_BY_USER_ID_REQUEST,
    payload: null,
  });
  try {
    const { data } = await api.get(`/orderItems/${id}`);
    dispatch({
      type: types.GET_ALL_ORDER_ITEMS_BY_USER_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_ALL_ORDER_ITEMS_BY_USER_ID_FAILURE,
      payload: null,
    });
  }
};

const getOrderItemByProduct = (id, productId) => async (dispatch) => {
  dispatch({
    type: types.GET_ORDER_ITEM_BY_PRODUCT_ID_REQUEST,
    payload: null,
  });
  try {
    const { data } = await api.get(
      `/orderItems/${id}/product?status=true&product=${productId}`
    );
    dispatch({
      type: types.GET_ORDER_ITEM_BY_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_ORDER_ITEM_BY_PRODUCT_ID_FAILURE,
      payload: null,
    });
  }
};

const getOrderItemsByUserId = (id) => async (dispatch) => {
  dispatch({ type: types.GET_ORDER_ITEMS_BY_USER_ID_REQUEST, payload: null });
  try {
    const { data } = await api.get(`/orderItems/${id}?status=true`);
    dispatch({
      type: types.GET_ORDER_ITEMS_BY_USER_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_ORDER_ITEMS_BY_USER_ID_FAILURE,
      payload: null,
    });
  }
};

const createOrderItem = (productId, quantity, price) => async (dispatch) => {
  dispatch({ type: types.CREATE_ORDER_ITEM_REQUEST, payload: null });
  try {
    const { data } = await api.post(`/orderItems`, {
      product: productId,
      price_on_purchase_date: price,
      quantity,
    });
    dispatch({
      type: types.CREATE_ORDER_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.CREATE_ORDER_ITEM_FAILURE,
      payload: null,
    });
  }
};

const updateOrderItem = (id, quantity, status, orderId) => async (dispatch) => {
  dispatch({ type: types.UPDATE_ORDER_ITEM_REQUEST, payload: null });
  try {
    const { data } = await api.patch(`/orderItems/${id}/order/${orderId}`, {
      quantity,
      status,
    });
    dispatch({
      type: types.UPDATE_ORDER_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.UPDATE_ORDER_ITEM_FAILURE,
      payload: null,
    });
  }
};

const deleteOrderItem = (id, orderId) => async (dispatch) => {
  dispatch({ type: types.DELETE_ORDER_ITEM_REQUEST, payload: null });
  try {
    const { data } = await api.delete(`/orderItems/${id}/order/${orderId}`);
    dispatch({
      type: types.DELETE_ORDER_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.DELETE_ORDER_ITEM_FAILURE,
      payload: null,
    });
  }
};

export const orderItemActions = {
  getAllOrderItems,
  getOrderItemsByUserId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  getAllOrderItemsByUserId,
};
