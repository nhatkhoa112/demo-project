import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../redux/actions';
import './DetailProduct.css';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import { ModalCart } from '../utils/modalCart/ModalCart';
import { orderUserActions, reviewsActions } from '../../../redux/actions';
import { ProductItem } from '../productItem/ProductItem';
import { ReviewItem } from '../utils/reviewItem/ReviewItem';
import styled from 'styled-components';

export const DetailProduct = () => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const product = useSelector((state) => state.products.selectProduct);
  const { loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [isOpenDes, setIsOpenDes] = useState(true);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [isOpenRev, setIsOpenRev] = useState(false);
  const [write, setWrite] = useState(false);
  const reviewsLength = product.reviews?.length;
  const [review, setReview] = useState({
    rating: null,
    title: '',
    body: '',
  });

  let resultRating = 0;
  let totalRating = 0;
  let ratingIndex = 0;

  product.reviews?.length > 0 &&
    product.reviews.map((review) => {
      if (review.rating > 0) {
        ratingIndex += 1;
        totalRating += review.rating;
      }
    });

  let resultRatingExact = totalRating / ratingIndex;
  resultRating = Math.round(resultRatingExact);

  const clearReview = () => {
    setReview({ rating: null, title: '', body: '' });
  };

  const price_on_purchase_date = (product.price * (100 - product.sale)) / 100;

  useEffect(() => {
    dispatch(productActions.getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(productActions.getAllProducts(1, '', '', 40));
  }, [dispatch, id]);

  let productCategory =
    product.categories?.length > 0 && product.categories[0]._id;
  let relatedProducts = [];
  if (products.length > 0) {
    products?.map((pro) => {
      pro.categories?.map((cate) => {
        if (cate._id === productCategory) {
          relatedProducts.push(pro);
        }
      });
    });
  }

  relatedProducts = relatedProducts.filter((pro, index) => index < 8);

  let productImages = [];

  product.images?.map((image, i) => {
    productImages.push({ img: image.url, id: i });
  });

  const handleClick = (e) => {
    e.preventDefault();
    const idx = e.target.getAttribute('data-index');
    setSelectImage(productImages[idx].img);
  };

  // if (loading) return <Loading />;

  return (
    <div className="detail-page">
      <ModalCart
        quantity={quantity}
        product={product}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="product-content">
        <div className="images">
          <div className="preview">
            {productImages?.map((image) => {
              return (
                <img
                  style={{ marginBottom: '5px' }}
                  key={image.id}
                  data-index={image.id}
                  src={image.img}
                  alt=""
                  onClick={handleClick}
                />
              );
            })}
          </div>
          <div className="image">
            <img
              src={
                selectImage ||
                (product.images?.length > 0 && product.images[0].url)
              }
              alt=""
            />
          </div>
        </div>
        <div className="product-info">
          <div className="product-title">{product.title}</div>
          <div className="product-price">
            <span className="final">
              $
              {product && product.sale
                ? ((product.price * (100 - product.sale)) / 100)?.toFixed(2)
                : product.price?.toFixed(2)}{' '}
              USD
            </span>
            {product && product.sale ? (
              <span className="first">
                <strike>${product.price?.toFixed(2)} USD</strike>
              </span>
            ) : (
              ''
            )}
          </div>
          <div className="product-rating">
            <span className="star-rating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input type="radio" value={ratingValue} />
                    <FaStar
                      className="star"
                      color={ratingValue <= resultRating ? 'black' : '#e4e5e9'}
                      className="fas fa-star"
                    />
                  </label>
                );
              })}
            </span>
            <div className="review">
              {resultRatingExact ? (
                <>
                  <span>rating: {'  '}</span>
                  {resultRatingExact} of{' '}
                </>
              ) : (
                ''
              )}
              {product.reviews?.length === 0 ? 'No' : product.review?.length}{' '}
              {product.reviews?.length > 1
                ? `${reviewsLength} reviews `
                : product.reviews?.length === 1
                ? `${reviewsLength} review `
                : 'review'}
            </div>
          </div>
          <div className="product-summary">{product.description}</div>
          <div className="product-cart">
            <div className="quantity">
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="number"
                type="number"
              />
              <div className="number-btn">
                <button
                  className="increase"
                  onClick={(e) => setQuantity(quantity + 1)}
                >
                  +
                </button>
                <button
                  className="decrease"
                  onClick={(e) => {
                    if (quantity > 1) setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>
              </div>
            </div>
            <div className="cart-btn">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    window.alert('You need sign in to create a order!!');
                  } else {
                    dispatch(
                      orderUserActions.createOrderUser(
                        product,
                        quantity,
                        price_on_purchase_date
                      )
                    );
                    setIsOpen(true);
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="categories">
            <label>Categories:</label>
            {product.categories?.map((category) => {
              return (
                <Link key={category._id} to="/">
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="more-info">
        <div className="button-wrapper">
          <button
            onClick={() => {
              setIsOpenDes(true);
              setIsOpenInfo(false);
              setIsOpenRev(false);
            }}
            className={isOpenDes ? 'description active' : 'description'}
          >
            Description
          </button>
          <button
            onClick={() => {
              setIsOpenDes(false);
              setIsOpenInfo(true);
              setIsOpenRev(false);
            }}
            className={isOpenInfo ? 'info active' : 'info'}
          >
            Additional Information
          </button>
          <button
            onClick={() => {
              setIsOpenDes(false);
              setIsOpenInfo(false);
              setIsOpenRev(true);
            }}
            className={isOpenRev ? 'review active' : 'review'}
          >
            Review
          </button>
        </div>
        <div className="content__info">
          <Description isOpenDes={isOpenDes}>{product.description}</Description>
          <Information isOpenInfo={isOpenInfo}>
            <div className="left_info">
              <div className="title_content">
                <p className="more_info">More Infomation To You</p>
                <h3 className="">Things you need to know</h3>
              </div>
              <div className="body__content">
                <div className="content__left">
                  <p className="info_1">
                    We use industry standard SSL encryption to protect your
                    details. Potentially sensitive information such as your
                    name, address and card details are encoded so they can only
                    be read on the secure server.
                  </p>
                  <ul className="method">
                    <li>Safe Payments</li>
                    <li>Price Include VAT</li>
                    <li>Easy To Order</li>
                  </ul>
                </div>
                <div className="delivery">
                  <div className="info2">
                    <h3>Express Delivery</h3>
                    <ul className="list-unstyled">
                      <li>In Viet Nam location within 2-4 days</li>
                      <li>Rest of the Asian within 7-14 days</li>
                      <li>Orther Location within 2-3 weeks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <img
              src={product.images?.length > 0 && product.images[0].url}
              alt=""
            />
          </Information>
          <Review isOpenRev={isOpenRev}>
            <div className="review-actions">
              <p>Customer Reviews</p>
              <div>
                <div className="info">
                  <div>
                    {' '}
                    {[...Array(5)].map((star, i) => {
                      const ratingValue = i + 1;
                      return (
                        <label key={i}>
                          <input type="radio" style={{ display: 'none' }} />
                          <FaStar
                            className="star"
                            color={
                              ratingValue <= resultRating ? 'black' : '#e4e5e9'
                            }
                            className="fas fa-star"
                          />
                        </label>
                      );
                    })}
                  </div>
                  {product.reviews?.length > 0 ? (
                    <div>
                      {' '}
                      base on{' '}
                      {product.reviews?.length === 0
                        ? 'no'
                        : product.review?.length}{' '}
                      {product.reviews?.length > 1
                        ? `${reviewsLength} reviews `
                        : product.reviews?.length === 1
                        ? `${reviewsLength} review `
                        : 'review'}{' '}
                    </div>
                  ) : (
                    <div>no review</div>
                  )}
                </div>
                <button onClick={() => setWrite(!write)} className="write-btn">
                  Write the review
                </button>
              </div>
            </div>
            <div className={write ? 'write-review show' : 'write-review'}>
              <h3 className="spr-form-title">Write a review</h3>
              <div className="spr-form-review-rating">
                <label className="spr-form-label" htmlFor="review[rating]">
                  Rating
                </label>
                <div className="rating-stars">
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          name="rating"
                          style={{ display: 'none' }}
                          value={ratingValue}
                          onClick={() =>
                            setReview({ ...review, rating: ratingValue })
                          }
                        />

                        <FaStar
                          style={{ cursor: 'pointer' }}
                          color={
                            ratingValue <= review.rating ? '#7AAB86' : '#e4e5e9'
                          }
                          className="fas fa-star"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="spr-form-review-title">
                <label
                  className="spr-form-label"
                  htmlFor="review_title_6538634821839"
                >
                  Review Title
                </label>
                <input
                  className="spr-form-input spr-form-input-text "
                  value={review.title}
                  onChange={(e) =>
                    setReview({ ...review, title: e.target.value })
                  }
                  id="review_title_6538634821839"
                  type="text"
                  name="review[title]"
                  placeholder="Give your review a title"
                />
              </div>
              <div className="spr-form-review-body">
                <label
                  className="spr-form-label"
                  htmlFor="review_body_6538634821839"
                >
                  Body of Review
                </label>
                <div className="spr-form-input">
                  <textarea
                    className="spr-form-input spr-form-input-textarea "
                    id="review_body_6538634821839"
                    data-product-id="6538634821839"
                    name="review[body]"
                    rows="10"
                    placeholder="Write your comments here"
                    value={review.body}
                    onChange={(e) =>
                      setReview({ ...review, body: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="submit-btn">
                <button
                  onClick={() => {
                    {
                      dispatch(
                        reviewsActions.createReviewOfProduct(
                          review,
                          product._id
                        )
                      );
                      clearReview();
                      setWrite(false);
                    }
                  }}
                >
                  Submit Review
                </button>
              </div>
            </div>
            <div className="reviews-list">
              {product.reviews?.length > 0 &&
                product.reviews.map((review) => {
                  return <ReviewItem key={review._id} review={review} />;
                })}
            </div>
          </Review>
        </div>
      </div>
      <div className="product-other">
        <h2>Related products</h2>
        <div className="products">
          {relatedProducts.map((pro) => {
            return (
              <ProductItem
                className="productItem"
                key={pro._id}
                product={pro}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Description = styled.div`
  padding: 20px 20px;
  width: 100%;
  height: auto;
  display: ${({ isOpenDes }) => (isOpenDes ? 'flex' : 'none')};
  font-family: 'Lato' sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  color: #a8a8a8;
  border-bottom: 1px solid #ccc;
`;

const Information = styled.div`
  padding: 20px 20px;
  width: 100%;
  height: 100%;
  display: ${({ isOpenInfo }) => (isOpenInfo ? 'flex' : 'none')};
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;

  > div {
    width: 65%;
    display: flex;
    flex-direction: column;
  }
  > img {
    width: 30%;
    /* height: 300px; */
    padding: 20px;
    min-width: 210px;
  }

  @media screen and (max-width: 860px) {
    justify-content: center;
    > div {
      width: 90%;
    }
    > img {
      display: none;
    }
  }
`;

const Review = styled.div`
  padding: 20px 20px;
  width: 100%;
  height: auto;
  min-height: 120px;
  display: ${({ isOpenRev }) => (isOpenRev ? 'flex' : 'none')};
  border-bottom: 1px solid #ccc;
  flex-direction: column;
`;
