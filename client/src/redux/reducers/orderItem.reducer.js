import * as types from '../constants/orderItem.constants';
const initialState = {
  loading: false,
  orderItems: [],
  orderItemsOfUser: [],
  selectOrderItem: {},
};

const routeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_ORDER_ITEMS_REQUEST:
    case types.DELETE_ORDER_ITEMS_REQUEST:
    case types.GET_ORDER_ITEMS_BY_USER_ID_REQUEST:
    case types.UPDATE_ORDER_ITEMS_REQUEST:
    case types.GET_ORDER_ITEMS_REQUEST:
      return { ...state, loading: true };

    case types.CREATE_ORDER_ITEMS_FAILURE:
    case types.DELETE_ORDER_ITEMS_FAILURE:
    case types.GET_ORDER_ITEMS_BY_USER_ID_FAILURE:
    case types.UPDATE_ORDER_ITEMS_FAILURE:
    case types.GET_ORDER_ITEMS_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_ORDER_ITEMS_SUCCESS:
      return { ...state, loading: false };

    case types.DELETE_ORDER_ITEMS_SUCCESS:
      return { ...state, loading: false };

    case types.GET_ORDER_ITEMS_BY_USER_ID_SUCCESS:
      return { ...state, loading: false };

    case types.UPDATE_ORDER_ITEMS_SUCCESS:
      return { ...state, loading: false };

    case types.GET_ORDER_ITEMS_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default routeReducer;
