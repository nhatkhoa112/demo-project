import React, { useState, useEffect } from 'react';
import './Products.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import image from './image/rose-green.png';
import { useDispatch, useSelector } from 'react-redux';
import { productActions, categoryActions } from '../../../redux/actions';
import { ProductItem } from '../productItem/ProductItem';
import { Loading } from '../utils/loading1/Loading';
import { PaginationBar } from '../utils/pagination/PaginationBar';

export const Products = () => {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [query, setQuery] = useState('');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [titleFeature, setTitleFeature] = useState('Featured');
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState([]);
  const [priceButton, setPriceButton] = useState(0);
  const { isPagination } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.products);
  const { total } = useSelector((state) => state.products);
  const totalPage = Math.ceil(total / 12);
  const { loading } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);
  const id = user.id;
  const [isFilter, setIsFilter] = useState(true);

  const sorts = [
    { title: 'Featured', value: '' },
    { title: 'Alphabetically, A-Z', value: 'title' },
    { title: 'Price, high to low', value: '-price' },
    { title: 'Price, low to high', value: 'price' },
    { title: 'Date, old to new', value: 'createdAt' },
    { title: 'Date, new to old', value: '-createdAt' },
  ];

  useEffect(() => {
    dispatch(productActions.getAllProducts(1, '', '', 12));
  }, [dispatch]);

  useEffect(() => {
    dispatch(categoryActions.getCategories());
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
          <section className="search">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(productActions.getAllProducts(1, query, '', 12));
              }}
              className="search-form"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Enter product title"
              />
              <button
                onClick={() =>
                  dispatch(productActions.getAllProducts(1, query, '', 12))
                }
                className="search-btn"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </section>
          <div className={isFilter ? 'main-content zoom' : 'main-content'}>
            <div className={isFilter ? 'left-content hidden' : 'left-content'}>
              <div className="categories">
                <div className="cate__title">
                  <h2>Categories</h2>
                </div>
                <div className="widget-content">
                  <ul className="list-category-toggle toggle-tab list-none">
                    {categories?.length > 0 &&
                      categories.map((cate) => {
                        return (
                          <li key={cate._id} className="item-toggle-tab">
                            <label className="option_item">
                              <input
                                value={cate._id}
                                onClick={(e) => {
                                  let newCategory = category;
                                  if (e.target.checked) {
                                    newCategory = [...category, e.target.value];
                                    setCategory(newCategory);
                                  } else {
                                    let idx = newCategory.findIndex(
                                      (cate) => cate === e.target.value
                                    );
                                    if (idx !== -1) {
                                      newCategory.splice(idx, 1);
                                      setCategory(newCategory);
                                    }
                                  }
                                  dispatch(
                                    productActions.filter(
                                      '',
                                      '',
                                      newCategory,
                                      price
                                    )
                                  );
                                }}
                                type="checkbox"
                                className="checkbox"
                              />
                              <div className="option_inner">
                                <div className="tickmark"></div>
                                <div className="icon"></div>
                                <div className="name">{cate.name}</div>
                              </div>
                            </label>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="price-filter">
                <div className="price__title">
                  <h2>Price Filter</h2>
                </div>

                <div className="widget-content">
                  <ul className="list-category-toggle toggle-tab list-none">
                    <ul className="list-none list-price">
                      <li className="cat-item">
                        <div
                          onClick={() => {
                            setPriceButton(0);
                            if (priceButton !== 0) {
                              setPrice([0, 20]);

                              dispatch(
                                productActions.getAllProducts(1, '', '', 12)
                              );
                            }
                          }}
                          className={
                            priceButton === 0 ? 'name price-active' : 'name'
                          }
                        >
                          All
                        </div>
                        <div
                          onClick={() => {
                            setPriceButton(1);
                            if (priceButton !== 1) {
                              dispatch(
                                productActions.filter('', '', category, [0, 20])
                              );
                            }
                          }}
                          className={
                            priceButton === 1 ? 'name price-active' : 'name'
                          }
                        >
                          0$-20$
                        </div>
                      </li>
                      <li className="cat-item">
                        <div
                          onClick={() => {
                            setPriceButton(2);
                            if (priceButton !== 2) {
                              setPrice([20, 30]);

                              dispatch(
                                productActions.filter(
                                  '',
                                  '',
                                  category,
                                  [20, 30]
                                )
                              );
                            }
                          }}
                          className={
                            priceButton === 2 ? 'name price-active' : 'name'
                          }
                        >
                          20$-30$
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            setPriceButton(3);
                            if (priceButton !== 3) {
                              setPrice([30, 50]);

                              dispatch(
                                productActions.filter(
                                  '',
                                  '',
                                  category,
                                  [30, 50]
                                )
                              );
                            }
                          }}
                          className={
                            priceButton === 3 ? 'name price-active' : 'name'
                          }
                        >
                          30$-50$
                        </div>
                      </li>
                      <li className="cat-item">
                        <div
                          onClick={() => {
                            setPriceButton(4);
                            if (priceButton !== 4) {
                              setPrice([50, 100]);
                              dispatch(
                                productActions.filter(
                                  '',
                                  '',
                                  category,
                                  [50, 100]
                                )
                              );
                            }
                          }}
                          className={
                            priceButton === 4 ? 'name price-active' : 'name'
                          }
                        >
                          50$-100$
                        </div>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className={
                isFilter ? 'right-content full-width' : 'right-content'
              }
            >
              <div className="actions-content">
                <button onClick={() => setIsFilter(!isFilter)}>
                  <div>Filter</div>
                </button>
                <div className="feature-button">
                  {' '}
                  <div
                    className="feature"
                    onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                  >
                    {titleFeature}
                  </div>
                  <ul
                    className={
                      isOpenDropdown
                        ? 'dropdown-content dropdown-menu'
                        : 'dropdown-content dropdown-menu hidden-dropdown'
                    }
                    aria-labelledby="dropdownMenuLink"
                    x-placement="bottom-start"
                  >
                    {sorts.map((s, i) => {
                      return (
                        <li key={i} className="active">
                          <button
                            onClick={() => {
                              setTitleFeature(s.title);
                              dispatch(
                                productActions.getAllProducts(
                                  1,
                                  '',
                                  s.value,
                                  12
                                )
                              );
                              setIsOpenDropdown(false);
                            }}
                          >
                            {s.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
              {isPagination ? (
                <div className="pagination">
                  <PaginationBar
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    totalPage={totalPage}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
