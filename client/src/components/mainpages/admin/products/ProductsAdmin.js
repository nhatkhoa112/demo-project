import React, { useEffect, useState } from 'react';
import './productsAdmin.css';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../../../redux/actions';
import { ProductAItem } from './productItem/ProductAItem';
import { ModalAddProduct } from './modalAddProduct/ModalAddProduct';
import { Loading } from '../../utils/loading/Loading';

export const ProductsAdmin = () => {
  const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(productActions.getAllProducts(1, '', '', 100));
  }, [dispatch]);

  if (loading) return <Loading />;
  return (
    <div className="product-admin">
      <ModalAddProduct isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="category-admin">
        <h4>Products Table</h4>
        <div className="add-button">
          <button onClick={() => setIsOpen(true)}>Add Product</button>
        </div>

        <table className="cate-table">
          <thead>
            <tr>
              <th className="table-image hidden-ct">Image</th>
              <th className="table-name">Name</th>
              <th className="table-des hidden-ctt">Description</th>
              <th className="table-price">Price</th>
              <th className="table-sale hidden-c">Sale</th>
              <th className="table-cate hidden-c">Categories</th>
              <th className="table-cate hidden-c">New</th>
              <th className="table-new">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.length > 0 &&
              products.map((product) => {
                return <ProductAItem key={product._id} product={product} />;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
