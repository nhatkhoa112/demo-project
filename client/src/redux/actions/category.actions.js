import * as types from '../constants/category.constants';
import api from '../../utils/api';

const createCategory = (name) => async (dispatch) => {
  dispatch({ type: types.CREATE_CATEGORY_REQUEST, payload: null });

  try {
    const { data } = await api.post('/categories', { name });
    dispatch({ type: types.CREATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.CREATE_CATEGORY_FAILURE, payload: null });
  }
};

const getCategories = () => async (dispatch) => {
  dispatch({ type: types.GET_CATEGORIES_REQUEST, payload: null });
  try {
    const { data } = await api.get('/categories');
    dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.GET_CATEGORIES_FAILURE, payload: null });
  }
};

const updateCategory = (name, id) => async (dispatch) => {
  dispatch({ type: types.UPDATE_CATEGORY_REQUEST, payload: null });

  try {
    const { data } = await api.patch(`categories/${id}`, { name });
    dispatch({ type: types.UPDATE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.UPDATE_CATEGORY_FAILURE, payload: null });
  }
};

const deleteCategory = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_CATEGORY_REQUEST, payload: null });

  try {
    const { data } = await api.delete(`/categories/${id}`);
    dispatch({ type: types.DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.DELETE_CATEGORY_FAILURE, payload: null });
  }
};

export const categoryActions = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
