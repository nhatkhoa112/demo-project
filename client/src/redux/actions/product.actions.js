import * as types from '../constants/product.constants';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const getAllProducts = (pageNum, query, sortBy, limit) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_PRODUCTS_REQUEST, payload: null });
  try {
    let queryString = '';
    if (query) {
      queryString = `&title[regex]=${query}&title[$options]=i`;
    }

    let sortByString = '';
    if (sortBy) sortByString = `&sort=${sortBy}`;
    const { data } = await api.get(
      `/products?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );
    dispatch({ type: types.GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: types.GET_ALL_PRODUCTS_FAILURE,
      payload: null,
    });
  }
};

const updateProduct = (id, product) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST, payload: null });
  try {
    const { data } = await api.patch(`/products/${id}`, product);
    dispatch({ type: types.UPDATE_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: types.UPDATE_PRODUCT_FAILURE,
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

const getNewProduct = () => async (dispatch) => {
  dispatch({ type: types.GET_NEW_PRODUCTS_REQUEST, payload: null });
  try {
    const { data } = await api.get(`/products?new=true`);
    dispatch({ type: types.GET_NEW_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: types.GET_NEW_PRODUCTS_FAILURE,
      payload: null,
    });
  }
};

const createProduct = (product) => async (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCT_REQUEST, payload: null });
  try {
    const { data } = await api.post(`/products`, product);
    dispatch({ type: types.CREATE_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: types.CREATE_PRODUCT_FAILURE, payload: null });
  }
};

const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: null });
  try {
    const { data } = await api.delete(`/products/${id}`);
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: null });
  }
};

const filter = (query, sortBy, category, price) => async (dispatch) => {
  dispatch({ type: types.FILTER_PRODUCT_REQUEST, payload: null });
  try {
    let queryString = '';
    let priceString = '';
    let categoryString = '';
    if (query) {
      queryString = `&title[regex]=${query}&title[$options]=i`;
    }

    if (!price) {
      priceString = '';
    } else {
      if (price.length === 2) {
        priceString = `?price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
    }

    let sortByString = '';
    if (sortBy) sortByString = `&sort=${sortBy}`;

    const { data } = await api.post(
      `products/search${priceString}${queryString}${sortByString}`,
      {
        categories: category,
      }
    );
    dispatch({ type: types.FILTER_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.FILTER_PRODUCT_FAILURE, payload: null });
  }
};

export const productActions = {
  getAllProducts,
  getProductById,
  getNewProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  filter,
};
