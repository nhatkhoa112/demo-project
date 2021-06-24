import * as types from '../constants/order.constants';
import * as iTypes from '../constants/orderItem.constants';

const initialState = {
  orders: [],
  order: {},
  selectOrder: {},
};

const routeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case iTypes.DELETE_ORDER_ITEM_REQUEST:
    case iTypes.UPDATE_ORDER_ITEM_REQUEST:
    case types.GET_ORDER_BY_ID_REQUEST:
    case types.CREATE_ORDER_REQUEST:
    case types.DELETE_ORDER_REQUEST:
    case types.GET_ORDERS_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
      return { ...state };

    case iTypes.DELETE_ORDER_ITEM_FAILURE:
    case iTypes.UPDATE_ORDER_ITEM_FAILURE:
    case types.GET_ORDER_BY_ID_FAILURE:
    case types.CREATE_ORDER_FAILURE:
    case types.DELETE_ORDER_FAILURE:
    case types.GET_ORDERS_FAILURE:
    case types.UPDATE_ORDER_FAILURE:
      return { ...state };

    case iTypes.UPDATE_ORDER_ITEM_SUCCESS:
      let idz = state.orders.findIndex((o) => o._id === payload.order._id);
      state.orders[idz] = payload.order;
      return { ...state, orders: [...state.orders] };

    case iTypes.DELETE_ORDER_ITEM_SUCCESS:
      let idx = state.orders.findIndex((o) => o._id === payload.order._id);
      state.orders[idx] = payload.order;
      return { ...state, orders: [...state.orders] };

    case types.GET_ORDER_BY_ID_SUCCESS:
      return { ...state, selectOrder: payload.order };

    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
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
        orders: payload.orders,
      };

    default:
      return state;
  }
};

export default routeReducer;
