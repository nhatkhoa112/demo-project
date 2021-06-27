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
    api.defaults.headers.common['Authorization'] = data.data.accesstoken;
    api.defaults.headers['Authorization'] = data.data.accesstoken;
    localStorage.setItem('accessToken', data.data.accesstoken);
    dispatch(routeActions.redirect('/'));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: null });
    console.log(error.message);
  }
};

const loginFacebookRequest = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_FACEBOOK_REQUEST, payload: null });
  console.log(access_token);
  try {
    const { data } = await api.post('/user/login/facebook', { access_token });
    // const name = res.data.data.user.name;
    console.log(data);
    // toast.success(`Welcome ${name}`);
    dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: data });
    // api.defaults.headers.common['Authorization'] = data.data.accesstoken;
    // api.defaults.headers['Authorization'] = data.data.accesstoken;
  } catch (error) {
    dispatch({ type: types.LOGIN_FACEBOOK_FAILURE, payload: error });
  }
};

const loginGoogleRequest = (access_token) => async (dispatch) => {
  try {
  } catch (error) {}
};

const register = (user) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const { data } = await api.post('/user/register', user);
    const name = data.data.user.name;
    dispatch({ type: types.REGISTER_SUCCESS, payload: data.data });
    api.defaults.headers.common['Authorization'] = data.data.accesstoken;
    api.defaults.headers['Authorization'] = data.data.accesstoken;
    localStorage.setItem('accessToken', data.data.accesstoken);
    toast.success(`Welcome to my store, ${name}! `, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
    console.log(error);
  }
};

const verifyEmail = (activation_token) => async (dispatch) => {
  // dispatch({ type: types.VERIFY_EMAIL_REQUEST, payload: null });
  // try {
  //   const { data } = await api.post('/user/activation', { activation_token });
  //   dispatch({ type: types.VERIFY_EMAIL_SUCCESS, payload: data.data });
  //   const name = data.data.user.name;
  //   toast.success(`Welcome, ${name}! Your email address has been verified.`);
  //   api.defaults.headers.common['authorization'] = data.data.accesstoken;
  //   api.defaults.headers['authorization'] = data.data.accesstoken;
  // } catch (error) {
  //   dispatch({ type: types.VERIFY_EMAIL_FAILURE, payload: error });
  // }
};

const updateProfile = (name, email, avatar) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE_REQUEST, payload: null });

  try {
    const { data } = await api.patch('/user/update', { name, email, avatar });
    toast.success('Update user profile successfully', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.UPDATE_PROFILE_FAILURE, payload: null });
  }
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
