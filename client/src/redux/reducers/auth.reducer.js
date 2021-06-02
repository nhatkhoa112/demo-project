import * as types from '../constants/auth.constants';

const initialState = {
  //   loading: false,
  //   isAuthenticated,
  //   accessToken: localStorage.getItem('accessToken'),
  //   user: {
  //     name: fbUser ? fbUser.name : '',
  //     email: fbUser ? fbUser.email : '',
  //     avatarUrl: fbUser ? fbUser.avatarUrl : '',
  //     // _id: fbUser ? fbUser._id : '',
  //   },
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

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.LOGIN_SUCCESS:
    case types.LOGIN_GOOGLE_SUCCESS:
    case types.VERIFY_EMAIL_SUCCESS:
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
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
