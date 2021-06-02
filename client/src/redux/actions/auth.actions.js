import * as types from '../constants/auth.constants';
import api from '../../utils/api';
import { routeActions } from './route.actions';
import { toast } from 'react-toastify';

const loginRequest = (email, password) => async (dispatch) => {
  try {
  } catch (error) {}
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
  try {
  } catch (error) {}
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
