import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../redux/actions';
import './DetailProduct.css';
import { Loading } from '../utils/loading/Loading';
import { FaStar } from 'react-icons/fa';
import { ModalCart } from '../utils/modalCart/ModalCart';
import { orderItemActions } from '../../../redux/actions';

export const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const product = useSelector((state) => state.products.selectProduct);
  const { loading } = useSelector((state) => state.products);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const price =
    product && product.sale
      ? (product.price * (100 - product.sale)) / 100
      : product.price;
  const orderItems = useSelector((state) => state.orderItems.orderItemsOfUser);
  const orderItemsProduct = orderItems.find(
    (order) => order.product._id === product._id && order.status === true
  );

  useEffect(() => {
    dispatch(productActions.getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(orderItemActions.getAllOrderItemsByUserId(user.id));
  }, [dispatch, user]);

  if (loading) return <Loading />;
  return (
    <div className="detail-page">
      <ModalCart
        quantity={
          orderItemsProduct ? orderItemsProduct.quantity + quantity : quantity
        }
        product={product}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="product-content">
        <div className="images">
          <div className="preview"></div>
          <div className="image">
            <img
              src={
                product.images?.length > 0 ? product.images[0].url : undefined
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
                    <input
                      type="radio"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= rating ? '#7AAB86' : '#e4e5e9'}
                      className="fas fa-star"
                    />
                  </label>
                );
              })}
            </span>
            <div className="review">
              {product.reviews?.length === 0 ? 'No' : product.review?.length}{' '}
              {product.reviews?.length > 1 ? 'reviews' : 'review'}
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
                  dispatch(
                    orderItemActions.createOrderItem(
                      product._id,
                      quantity,
                      price
                    )
                  );
                  setIsOpen(!isOpen);
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
      <div className="product-other"></div>
    </div>
  );
};
