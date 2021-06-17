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
    case types.CREATE_ORDER_ITEM_REQUEST:
    case types.DELETE_ORDER_ITEM_REQUEST:
    case types.GET_ORDER_ITEMS_BY_USER_ID_REQUEST:
    case types.UPDATE_ORDER_ITEM_REQUEST:
    case types.GET_ORDER_ITEMS_REQUEST:
    case types.GET_ALL_ORDER_ITEMS_BY_USER_ID_REQUEST:
    case types.GET_ORDER_ITEM_BY_PRODUCT_ID_REQUEST:
      return { ...state, loading: true };

    case types.CREATE_ORDER_ITEM_FAILURE:
    case types.DELETE_ORDER_ITEM_FAILURE:
    case types.GET_ORDER_ITEMS_BY_USER_ID_FAILURE:
    case types.UPDATE_ORDER_ITEM_FAILURE:
    case types.GET_ORDER_ITEMS_FAILURE:
    case types.GET_ALL_ORDER_ITEMS_BY_USER_ID_FAILURE:
    case types.GET_ORDER_ITEM_BY_PRODUCT_ID_FAILURE:
      return { ...state, loading: false };

    case types.GET_ALL_ORDER_ITEMS_BY_USER_ID_SUCCESS:
      console.log(payload);
      return {
        ...state,
        loading: false,
        orderItemsOfUser: payload.orderItems,
      };
    case types.GET_ORDER_ITEM_BY_PRODUCT_ID_SUCCESS:
      return { ...state, loading: false };

    case types.CREATE_ORDER_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        orderItemsOfUser: [...state.orderItemsOfUser, payload.orderItem],
      };

    case types.DELETE_ORDER_ITEM_SUCCESS:
      return { ...state, loading: false };

    case types.GET_ORDER_ITEMS_BY_USER_ID_SUCCESS:
      return { ...state, loading: false };

    case types.UPDATE_ORDER_ITEM_SUCCESS:
      return { ...state, loading: false };

    case types.GET_ORDER_ITEMS_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default routeReducer;
