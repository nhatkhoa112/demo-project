import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import './modalUpdateProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import { categoryActions, productActions } from '../../../../../redux/actions';
import Select from 'react-select';

export const ModalUpdateProduct = ({
  oldProduct,
  isOpenUpdate,
  setIsOpenUpdate,
}) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const classes = useStyles();
  let newCategories = [];
  oldProduct.categories?.length > 0 &&
    oldProduct.categories.map((cate) => {
      newCategories.push(cate._id);
    });

  const [product, setProduct] = useState({
    title: oldProduct.title,
    description: oldProduct.description,
    price: oldProduct.price,
    sale: oldProduct.sale,
    categories: newCategories,
    images: oldProduct.images,
    sold: oldProduct.sold,
  });

  let imageUpload = [];

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'kohaku121',
      uploadPreset: 'ml_default',
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        imageUpload.push({
          public_id: result.info.public_id,
          url: result.info.secure_url,
        });
        setProduct({ ...product, images: imageUpload });
      }
    }
  );
  let options = [];

  categories?.length > 0 &&
    categories.map((cate) => {
      options.push({ value: cate._id, label: cate.name });
    });

  return (
    <div className={isOpenUpdate ? `modal-page` : ' hidden'}>
      <div className="add-content">
        <button onClick={() => setIsOpenUpdate(false)}>
          <i className="fas fa-times"></i>
        </button>
        <Paper className={classes.paper}>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.form} ${classes.root}`}
          >
            <Typography variant="h6">Updating Product</Typography>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />

            <TextField
              className="description"
              multiline
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              height="100px"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />

            <div
              className={classes.fileInput}
              style={{
                width: '100%',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                type="number"
                name="price"
                variant="outlined"
                autoComplete="new-password"
                label="Price"
                fullWidth
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
              <TextField
                type="number"
                name="sale"
                variant="outlined"
                label="Sale"
                autoComplete="new-password"
                fullWidth
                value={product.sale}
                onChange={(e) =>
                  setProduct({ ...product, sale: e.target.value })
                }
              />
            </div>

            <div
              className={classes.fileInput}
              style={{
                width: '100%',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                type="number"
                name="sold"
                // defaultValue={0}
                variant="outlined"
                autoComplete="new-password"
                label="Sold"
                fullWidth
                value={product.sold}
                onChange={(e) =>
                  setProduct({ ...product, sold: e.target.value })
                }
              />
              {/* <TextField
                variant="outlined"
                select
                defaultValue="false"
                label="New"
                value={isNew}
                onChange={(e) => setIsNew(e.target.value)}
                fullWidth
              >
                <option value="true">{'true'}</option>
                <option value="false">{'false'}</option>
              </TextField> */}
            </div>
            <div
              className={classes.fileInput}
              style={{
                width: '100%',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 7px',
              }}
            >
              <Select
                isMulti
                name="categories"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(e) => {
                  let value = [];
                  e.map((s) => {
                    value.push(s.value);
                  });
                  setProduct({ ...product, categories: value });
                }}
              />
            </div>
            <div
              className={classes.fileInput}
              style={{
                width: '100%',
                height: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 7px',
              }}
            >
              <button
                className="add"
                style={{
                  padding: '7px 15px',
                  background: '#5C986A',
                  color: 'white',
                  fontWeight: '500',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  widget.open();
                }}
              >
                Add picture
              </button>
            </div>
            <div
              className={classes.fileInput}
              style={{
                width: '100%',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    productActions.updateProduct(oldProduct._id, product)
                  );
                  setIsOpenUpdate(false);
                }}
                className={classes.buttonSubmit}
                value={product.categories}
                variant="container"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};
