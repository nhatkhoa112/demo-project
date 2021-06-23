import * as types from '../constants/order.constants';

const initialState = {
  orders: [],
  order: {},
  selectOrder: {},
};

const routeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ORDER_BY_ID_REQUEST:
    case types.CREATE_ORDER_REQUEST:
    case types.DELETE_ORDER_REQUEST:
    case types.GET_ORDERS_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
      return { ...state };

    case types.GET_ORDER_BY_ID_FAILURE:
    case types.CREATE_ORDER_FAILURE:
    case types.DELETE_ORDER_FAILURE:
    case types.GET_ORDERS_FAILURE:
    case types.UPDATE_ORDER_FAILURE:
      return { ...state };

    case types.GET_ORDER_BY_ID_SUCCESS:
      return { ...state, selectOrder: payload.order };

    case types.CREATE_ORDER_SUCCESS:
      console.log(payload);
      return {
        ...state,
        order: payload.order,
      };

    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
      };

    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
      };

    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default routeReducer;
