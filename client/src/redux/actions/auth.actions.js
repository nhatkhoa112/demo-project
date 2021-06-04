import * as types from '../constants/auth.constants';
import api from '../../utils/api';
import { routeActions } from './route.actions';
import { toast } from 'react-toastify';

const loginRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    const { data } = await api.post('/user/login', user);
    toast.success(`Welcome ${data.data.user.name}`);
    dispatch({ type: types.LOGIN_REQUEST, payload: data.data });
    console.log(api.defaults);
    api.defaults.headers.common['authorization'] = data.data.accesstoken;
    api.defaults.headers['Authorization'] = data.data.accesstoken;
    // console.log(api.defaults.headers.common['authorization']);
    localStorage.setItem('accessToken', data.data.accesstoken);
    dispatch(routeActions.redirect('/'));
  } catch (error) {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    console.log(error.message);
  }
};

const loginFacebookRequest = (access_token) => async (dispatch) => {
  try {
  } catch (error) {}
};

const loginGoogleRequest = (access_token) => async (dispatch) => {
  try {
  } catch (error) {}
};
const register = (user) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const { data } = await api.post('/user/register', user);
    dispatch({ type: types.REGISTER_SUCCESS, payload: data.data });
    dispatch(routeActions.redirect('/'));
    console.log(data);
    toast.success(`Thank you for your registration}!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
    console.log(error);
  }
};

const verifyEmail = (code) => async (dispatch) => {
  try {
  } catch (error) {}
};

const updateProfile = (name, avatarUrl) => async (dispatch) => {
  try {
  } catch (error) {}
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  try {
  } catch (error) {}
};

const logout = () => (dispatch) => {};

export const authActions = {
  loginRequest,
  loginFacebookRequest,
  loginGoogleRequest,
  register,
  verifyEmail,
  updateProfile,
  getCurrentUser,
  logout,
};
