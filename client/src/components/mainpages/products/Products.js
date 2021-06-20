import React, { useState, useEffect } from 'react';
import './Products.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image from './image/rose-green.png';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../redux/actions';
import { ProductItem } from '../productItem/ProductItem';
import { Loading } from '../utils/loading1/Loading';
import { PaginationBar } from '../utils/pagination/PaginationBar';

export const Products = () => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const { products } = useSelector((state) => state.products);
  const { total } = useSelector((state) => state.products);
  const totalPage = Math.ceil(total / 12);
  const { loading } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);
  const id = user.id;
  const [isFilter, setIsFilter] = useState(true);

  useEffect(() => {
    dispatch(productActions.getAllProducts(1));
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.75 }}
      >
        <div className="products-page">
          <section className="section1">
            <div className="content">
              <img src={image} alt="rose" />
              <div className="content__title">Store 's Products</div>
              <ol className="breadcrumbs-custom">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Products</li>
              </ol>
            </div>
          </section>
          <div className={isFilter ? 'main-content zoom' : 'main-content'}>
            <div
              className={isFilter ? 'left-content hidden' : 'left-content'}
            ></div>
            <div
              className={
                isFilter ? 'right-content full-width' : 'right-content'
              }
            >
              <div className="actions-content">
                <button onClick={() => setIsFilter(!isFilter)}>
                  <div>Filter</div>
                </button>
                <div className="feature">Feature</div>
              </div>
              <div className="product-content">
                {products.length > 0 &&
                  products.map((product, index) => {
                    return (
                      <ProductItem
                        key={index}
                        product={product}
                        isFilter={isFilter}
                      />
                    );
                  })}
              </div>
              <div className="pagination">
                <PaginationBar
                  pageNum={pageNum}
                  setPageNum={setPageNum}
                  totalPage={totalPage}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
