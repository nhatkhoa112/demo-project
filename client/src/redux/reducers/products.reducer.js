import * as types from '../constants/product.constants';
import * as reviewTypes from '../constants/review.constants';

const initialState = {
  loading: false,
  total: 0,
  products: [],
  newProducts: [],
  selectProduct: {},
  isPagination: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FILTER_PRODUCT_REQUEST:
    case types.CREATE_PRODUCT_REQUEST:
    case types.DELETE_PRODUCT_REQUEST:
    case types.UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: false };

    case reviewTypes.CREATE_REVIEW_OF_PRODUCT_REQUEST:
    case reviewTypes.DELETE_REVIEW_OF_PRODUCT_REQUEST:
    case reviewTypes.UPDATE_REVIEW_OF_PRODUCT_REQUEST:
    case types.GET_PRODUCT_BY_ID_REQUEST:
    case types.GET_ALL_PRODUCTS_REQUEST:
    case types.GET_NEW_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.FILTER_PRODUCT_FAILURE:
    case types.CREATE_PRODUCT_FAILURE:
    case types.DELETE_PRODUCT_FAILURE:
    case types.UPDATE_PRODUCT_FAILURE:
    case reviewTypes.CREATE_REVIEW_OF_PRODUCT_FAILURE:
    case reviewTypes.DELETE_REVIEW_OF_PRODUCT_FAILURE:
    case reviewTypes.UPDATE_REVIEW_OF_PRODUCT_FAILURE:
    case types.GET_NEW_PRODUCTS_FAILURE:
    case types.GET_PRODUCT_BY_ID_FAILURE:
    case types.GET_ALL_PRODUCTS_FAILURE:
      return { ...state, loading: false };
    case types.CREATE_PRODUCT_SUCCESS:
      state.products.unshift(payload.product);
      return {
        ...state,
        loading: false,
        products: [...state.products],
      };
    case types.DELETE_PRODUCT_SUCCESS:
      let idz = state.products.findIndex(
        (pro) => pro._id === payload.product._id
      );
      state.products.splice(idz, 1);
      return { ...state, loading: false, products: [...state.products] };
    case types.UPDATE_PRODUCT_SUCCESS:
      console.log(payload);
      let ido = state.products.findIndex(
        (pro) => pro._id === payload.product._id
      );
      state.products[ido] = payload.product;
      return { ...state, loading: false, products: [...state.products] };

    case reviewTypes.CREATE_REVIEW_OF_PRODUCT_SUCCESS:
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
        isPagination: payload.isPagination,
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

    case types.FILTER_PRODUCT_SUCCESS:
      return {
        ...state,
        products: payload.products,
        isPagination: payload.isPagination,
      };

    default:
      return state;
  }
};

export default productReducer;
