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
      return {
        ...state,
        loading: false,
        orderItemsOfUser: payload.orderItems,
      };
    case types.GET_ORDER_ITEM_BY_PRODUCT_ID_SUCCESS:
      return { ...state, loading: false };

    case types.CREATE_ORDER_ITEM_SUCCESS:
      let idx = state.orderItemsOfUser.findIndex(
        (order) => order._id === payload.orderItem._id
      );

      if (idx === -1) {
        state.orderItemsOfUser = [...state.orderItemsOfUser, payload.orderItem];
      }

      if (idx !== -1) {
        state.orderItemsOfUser[idx].quantity = payload.orderItem.quantity;
      }

      return {
        ...state,
        loading: false,
        orderItemsOfUser: [...state.orderItemsOfUser],
      };

    case types.DELETE_ORDER_ITEM_SUCCESS:
      let idu = state.orderItemsOfUser.findIndex(
        (order) => order._id === payload.orderItem._id
      );
      state.orderItemsOfUser.splice(idu, 1);
      return {
        ...state,
        loading: false,
        orderItemsOfUser: [...state.orderItemsOfUser],
      };

    case types.GET_ORDER_ITEMS_BY_USER_ID_SUCCESS:
      return { ...state, loading: false };

    case types.UPDATE_ORDER_ITEM_SUCCESS:
      let idz = state.orderItemsOfUser.findIndex(
        (order) => order._id === payload.orderItem._id
      );
      state.orderItemsOfUser[idz] = payload.orderItem;
      return {
        ...state,
        loading: false,
        orderItemsOfUser: [...state.orderItemsOfUser],
      };

    case types.GET_ORDER_ITEMS_SUCCESS:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default routeReducer;
