import React, { useState } from 'react';
import './categoryItem.css';
import { useDispatch } from 'react-redux';
import { categoryActions } from '../../../../../redux/actions';

function CategoryItem({ cate, i }) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');

  return (
    <tr key={cate._id} className="cate-item">
      <th className="table-cate-info">
        <div>
          <div>{i + 1}</div>
        </div>
      </th>
      <th className="table-cate-info ">
        <div>
          <div>
            {isEdit ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Name"
              />
            ) : (
              cate.name
            )}
          </div>
        </div>
      </th>
      <th className="table-cate-info ">
        <div>
          <div>
            {isEdit ? (
              <button
                onClick={() => {
                  dispatch(categoryActions.updateCategory(name, cate._id));
                  setIsEdit(false);
                }}
                className="edit"
              >
                Save
              </button>
            ) : (
              <button onClick={() => setIsEdit(true)} className="edit">
                Edit
              </button>
            )}
            <button
              onClick={() => dispatch(categoryActions.deleteCategory(cate._id))}
              className="delete"
            >
              Delete
            </button>
          </div>
        </div>
      </th>
    </tr>
  );
}

export default CategoryItem;
