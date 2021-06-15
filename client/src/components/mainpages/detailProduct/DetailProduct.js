import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../redux/actions';
import './DetailProduct.css';
import { Loading } from '../utils/loading/Loading';

export const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectProduct);
  const { loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productActions.getProductById(id));
  }, [dispatch, id]);

  if (loading) return <Loading />;

  return (
    <div className="detail-page">
      <div className="detail">
        <div className="images">
          <img
            src={product.images?.length > 0 && product.images[0].url}
            alt=""
          />
        </div>
        <div className="box-detail">
          <div className="row">
            <h2>{product.title}</h2>
            <h6>#id: {product.product_id}</h6>
          </div>
          <span>$ {product.price}</span>
          <p>{product.description}</p>
          <p>{product.content}</p>
          <p>Sold: {product.sold}</p>
          <Link
            to="/cart"
            className="cart"
            // onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>

      {/* <div>
        <h2>Related products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div> */}
    </div>
  );
};
