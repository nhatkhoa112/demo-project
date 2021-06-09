import * as types from '../constants/auth.constants';
import api from '../../utils/api';
import { routeActions } from './route.actions';
import { toast } from 'react-toastify';

const loginRequest = (user) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    const { data } = await api.post('/user/login', user);
    toast.success(`Welcome ${data.data.user.name}`);
    dispatch({ type: types.LOGIN_SUCCESS, payload: data.data });
    api.defaults.headers.common['authorization'] = data.data.accesstoken;
    api.defaults.headers['authorization'] = data.data.accesstoken;
    localStorage.setItem('accessToken', data.data.accesstoken);
    dispatch(routeActions.redirect('/'));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: null });
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
    toast.success(`Thank you for your registration!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
    console.log(error);
  }
};

const verifyEmail = (activation_token) => async (dispatch) => {
  dispatch({ type: types.VERIFY_EMAIL_REQUEST, payload: null });
  try {
    const { data } = await api.post('/user/activation', { activation_token });
    dispatch({ type: types.VERIFY_EMAIL_SUCCESS, payload: data.data });
    const name = data.data.user.name;
    toast.success(`Welcome, ${name}! Your email address has been verified.`);
    api.defaults.headers.common['authorization'] = data.data.accesstoken;
    api.defaults.headers['authorization'] = data.data.accesstoken;
  } catch (error) {
    dispatch({ type: types.VERIFY_EMAIL_FAILURE, payload: error });
  }
};

const updateProfile = (name, avatarUrl) => async (dispatch) => {
  try {
  } catch (error) {}
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  try {
  } catch (error) {}
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common['authorization'];
  localStorage.removeItem('accessToken');
  localStorage.removeItem('koHaUser');

  dispatch({ type: types.LOGOUT, payload: null });
};

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
