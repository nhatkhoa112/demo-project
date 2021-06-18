import * as types from '../constants/auth.constants';

const koHaUser = JSON.parse(localStorage.getItem('koHaUser'));
const isAuthenticated = !!localStorage.getItem('accessToken');

const initialState = {
  isAuthenticated,
  loading: false,
  user: {
    name: koHaUser ? koHaUser.name : '',
    email: koHaUser ? koHaUser.email : '',
    avatar: koHaUser ? koHaUser.avatar : '',
    id: koHaUser ? koHaUser._id : '',
  },
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_GOOGLE_REQUEST:
      return { ...state, loading: true };
    case types.VERIFY_EMAIL_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_FACEBOOK_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };

    case types.VERIFY_EMAIL_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_SUCCESS:
      localStorage.setItem('accessToken', payload.accesstoken);
      localStorage.setItem('koHaUser', JSON.stringify(payload.user));
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          name: payload.user.name,
          email: payload.user.email,
          id: payload.user._id,
          avatar: payload.user.avatar,
        },
      };

    case types.LOGIN_SUCCESS:
      localStorage.setItem('accessToken', payload.accesstoken);
      localStorage.setItem('koHaUser', JSON.stringify(payload.user));
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          name: payload.user.name,
          email: payload.user.email,
          id: payload.user._id,
          avatar: payload.user.avatar,
        },
      };
    case types.LOGIN_GOOGLE_SUCCESS:
    case types.LOGIN_FACEBOOK_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false };

    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.LOGIN_FAILURE:
    case types.LOGIN_GOOGLE_FAILURE:
    case types.VERIFY_EMAIL_FAILURE:
    case types.LOGIN_FACEBOOK_FAILURE:
    case types.GET_CURRENT_USER_FAILURE:
    case types.REGISTER_FAILURE:
    case types.UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false };

    case types.LOGOUT:
      return {
        ...state,
        user: {
          name: '',
          email: '',
          avatar: '',
          id: '',
        },
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
