import * as types from '../constants/category.constants';

const initialState = {
  categories: [],
};

const routeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_CATEGORY_REQUEST:
    case types.DELETE_CATEGORY_REQUEST:
    case types.GET_CATEGORIES_REQUEST:
    case types.UPDATE_CATEGORY_REQUEST:
      return { ...state };

    case types.CREATE_CATEGORY_FAILURE:
    case types.DELETE_CATEGORY_FAILURE:
    case types.GET_CATEGORIES_FAILURE:
    case types.UPDATE_CATEGORY_FAILURE:
      return { ...state };

    case types.DELETE_SUCCESS:
      return { ...state };

    case types.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, payload.category],
      };

    case types.UPDATE_CATEGORY_SUCCESS:
      let idx = state.categories.findIndex(
        (c) => c._id === payload.category._id
      );
      state.categories[idx] = payload.category;
      return {
        ...state,
        categories: [...state.categories],
      };

    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
      };

    default:
      return state;
  }
};

export default routeReducer;
