import React from 'react';
import './reviewItem.css';
import { FaStar } from 'react-icons/fa';
import Moment from 'react-moment';

export const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <div className="rating-star">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                style={{ display: 'none' }}
                value={ratingValue}
              />
              <FaStar
                className="star"
                color={ratingValue <= review.rating ? 'black' : '#e4e5e9'}
                className="fas fa-star"
              />
            </label>
          );
        })}
      </div>
      <h3 class="spr-review-header-title">{review.title}</h3>
      <span class="spr-review-header-byline">
        <strong>{review.owner.name}</strong> on{' '}
        <strong>
          {<Moment format="DD, MM, YYYY">{review.createdAt}</Moment>}
        </strong>
      </span>
      <div class="spr-review-content">
        <p class="spr-review-content-body">{review.body}</p>
      </div>
    </div>
  );
};
