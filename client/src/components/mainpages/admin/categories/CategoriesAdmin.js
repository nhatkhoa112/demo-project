import React, { useEffect, useState } from 'react';
import './categoriesAdmin.css';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActions } from '../../../../redux/actions';
import CategoryItem from './categoryItem/CategoryItem';

export const CategoriesAdmin = () => {
  const { categories } = useSelector((state) => state.category);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, [dispatch]);
  return (
    <div className="category-admin">
      <h4>Categories Table</h4>
      <div className="add-button">
        <button onClick={() => setIsOpenAdd(!isOpenAdd)}>Add Category</button>
      </div>
      <div className={isOpenAdd ? 'add-form' : 'hidden'}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Category Name"
        />
        <button
          onClick={() => {
            dispatch(categoryActions.createCategory(name));
            setName('');
            setIsOpenAdd(!isOpenAdd);
          }}
        >
          Submit
        </button>
      </div>
      <table className="cate-table">
        <thead>
          <tr>
            <th className="table-thumbnail">STT</th>
            <th className="table-name">Name</th>
            <th className="table-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 &&
            categories?.map((cate, i) => {
              return <CategoryItem key={cate._id} cate={cate} i={i} />;
            })}
        </tbody>
      </table>
    </div>
  );
};
