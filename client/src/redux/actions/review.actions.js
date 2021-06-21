import * as types from '../constants/review.constants';
import api from '../../utils/api';

const createReviewOfProduct = (review, productId) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_OF_PRODUCT_REQUEST, payload: null });
  try {
    const { data } = await api.post('/reviews', {
      title: review.title,
      body: review.body,
      rating: review.rating,
      productId,
    });
    dispatch({ type: types.CREATE_REVIEW_OF_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_OF_PRODUCT_FAILURE, payload: null });
  }
};

export const reviewsActions = { createReviewOfProduct };
