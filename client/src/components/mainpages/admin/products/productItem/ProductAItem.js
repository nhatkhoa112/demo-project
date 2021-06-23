import React from 'react';
import './productAItem.css';
import { NavLink } from 'react-router-dom';

export const ProductAItem = ({ product }) => {
  let categories = [];
  product.categories.map((cate) => {
    categories.push(cate.name);
  });

  return (
    <tr className="product-item">
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
          <button onClick={() => {}} className="edit">
            Edit
          </button>

          <button className="delete">Delete</button>
        </div>
      </th>
    </tr>
  );
};
