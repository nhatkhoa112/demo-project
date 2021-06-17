import * as types from '../constants/product.constants';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const getAllProducts = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_PRODUCTS_REQUEST, payload: null });
  try {
    const { data } = await api.get('/products');
    dispatch({ type: types.GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: types.GET_ALL_PRODUCTS_FAILURE,
      payload: null,
    });
  }
};

const getProductById = (id) => async (dispatch) => {
  dispatch({ type: types.GET_PRODUCT_BY_ID_REQUEST, payload: null });
  try {
    const { data } = await api.get(`/products/${id}`);
    dispatch({ type: types.GET_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: types.GET_PRODUCT_BY_ID_FAILURE,
      payload: null,
    });
  }
};

export const productActions = {
  getAllProducts,
  getProductById,
};
