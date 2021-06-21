import * as types from '../constants/product.constants';
import * as reviewTypes from '../constants/review.constants';

const initialState = {
  loading: false,
  total: 0,
  products: [],
  newProducts: [],
  selectProduct: {},
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case reviewTypes.CREATE_REVIEW_OF_PRODUCT_REQUEST:
    case reviewTypes.DELETE_REVIEW_OF_PRODUCT_REQUEST:
    case reviewTypes.UPDATE_REVIEW_OF_PRODUCT_REQUEST:
    case types.GET_PRODUCT_BY_ID_REQUEST:
    case types.GET_ALL_PRODUCTS_REQUEST:
    case types.GET_NEW_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case reviewTypes.CREATE_REVIEW_OF_PRODUCT_FAILURE:
    case reviewTypes.DELETE_REVIEW_OF_PRODUCT_FAILURE:
    case reviewTypes.UPDATE_REVIEW_OF_PRODUCT_FAILURE:
    case types.GET_NEW_PRODUCTS_FAILURE:
    case types.GET_PRODUCT_BY_ID_FAILURE:
    case types.GET_ALL_PRODUCTS_FAILURE:
      return { ...state, loading: false };

    case reviewTypes.CREATE_REVIEW_OF_PRODUCT_SUCCESS:
      console.log(payload.product);
      return {
        ...state,
        loading: false,
        selectProduct: payload.product,
      };
    case reviewTypes.DELETE_REVIEW_OF_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case reviewTypes.UPDATE_REVIEW_OF_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...payload.products],
        total: payload.total,
      };
    case types.GET_NEW_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        newProducts: [...payload.products],
        total: payload.total,
      };
    case types.GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, selectProduct: payload.product };

    default:
      return state;
  }
};

export default productReducer;
