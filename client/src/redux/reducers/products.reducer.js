import * as types from '../constants/product.constants';

const initialState = {
  loading: false,
  total: 0,
  products: [],
  selectProduct: {},
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_PRODUCTS_REQUEST:
    case types.GET_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true };

    case types.GET_PRODUCT_BY_ID_FAILURE:
    case types.GET_ALL_PRODUCTS_FAILURE:
      return { ...state, loading: false };

    case types.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...payload.products],
        total: payload.total,
      };
    case types.GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, selectProduct: payload.product };

    default:
      return state;
  }
};

export default productReducer;
