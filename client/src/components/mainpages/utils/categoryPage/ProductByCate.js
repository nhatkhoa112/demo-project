import React, { useEffect } from 'react';
import './prodcutByCate.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productActions, categoryActions } from '../../../../redux/actions';
import image from '../../about/images/rose-green.png';
import { Link } from 'react-router-dom';
import { ProductItem } from '../../productItem/ProductItem';

export const ProductByCate = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.category);
  const selectCate =
    categories?.length > 0 && categories.find((cate) => cate._id === id);

  useEffect(() => {
    dispatch(productActions.getAllProducts(1, '', '', 100));
  }, [dispatch]);

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, [dispatch]);

  let newProducts = products.filter(
    (p) => p.categories.findIndex((cate) => cate._id === id) !== -1
  );

  return (
    <div className="product-cate">
      <section className="section1">
        <div className="content">
          <img src={image} alt="rose" />
          <div className="content__title">{selectCate.name}</div>
          <ol className="breadcrumbs-custom">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{selectCate.name}</li>
          </ol>
        </div>
      </section>
      <div className="product-content">
        {newProducts.length > 0 &&
          newProducts.map((product, index) => {
            return <ProductItem key={index} product={product} />;
          })}
      </div>
    </div>
  );
};
