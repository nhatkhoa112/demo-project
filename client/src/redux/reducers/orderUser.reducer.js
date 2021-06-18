import * as types from '../constants/orderUser.constants';

const orderLocal = JSON.parse(localStorage.getItem('OrderUser'));

const initialState = {
  orderUser: orderLocal ? orderLocal : [],
};

const routeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_ORDER_USER_SUCCESS:
      localStorage.setItem('OrderUser', JSON.stringify(payload));
      return {
        ...state,
        orderUser: payload,
      };

    case types.DELETE_ORDER_USER_SUCCESS:
      localStorage.setItem('OrderUser', JSON.stringify(payload));
      return {
        ...state,
        orderUser: payload,
      };

    case types.UPDATE_ORDER_USER_SUCCESS:
      localStorage.setItem('OrderUser', JSON.stringify(payload));
      return {
        ...state,
        orderUser: payload,
      };

    case types.GET_ORDER_USER_SUCCESS:
      localStorage.setItem('OrderUser', JSON.stringify(payload));
      return {
        ...state,
        orderUser: payload,
      };

    default:
      return state;
  }
};

export default routeReducer;
