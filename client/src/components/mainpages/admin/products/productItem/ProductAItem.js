import React, { useState } from 'react';
import './productAItem.css';
import { NavLink } from 'react-router-dom';
import { ModalUpdateProduct } from '../modalUpdateProduct/ModalUpdateProduct';
import { productActions } from '../../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const ProductAItem = ({ product }) => {
  const dispatch = useDispatch();
  let categories = [];
  product.categories.map((cate) => {
    categories.push(cate.name);
  });
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  return (
    <tr className="product-item">
      <ModalUpdateProduct
        oldProduct={product}
        isOpenUpdate={isOpenUpdate}
        setIsOpenUpdate={setIsOpenUpdate}
      />
      <th className="table-product-image hidden-ct">
        <div>
          <img src={product.images[0].url} alt="" width="50px" height="50px" />{' '}
        </div>
      </th>
      <th className="table-product-title ">
        <div>
          <NavLink to={`/product/${product._id}`}>{product.title}</NavLink>
        </div>
      </th>
      <th className="table-product-des hidden-ctt ">
        <div>{product.description}</div>
      </th>
      <th className="table-product-info">
        <div>${product.price.toFixed(2)}</div>
      </th>
      <th className="table-product-info hidden-c ">
        <div>{product.sale} %</div>
      </th>
      <th className="table-product-cate hidden-c ">
        <div>{categories.join(', ')}</div>
      </th>
      <th className="table-product-new hidden-c ">
        <div>{product.new ? 'true' : 'false'}</div>
      </th>
      <th className="table-product-cate ">
        <div>
          <button
            onClick={() => {
              setIsOpenUpdate(true);
            }}
            className="edit"
          >
            Edit
          </button>

          <button
            onClick={() => dispatch(productActions.deleteProduct(product._id))}
            className="delete"
          >
            Delete
          </button>
        </div>
      </th>
    </tr>
  );
};
