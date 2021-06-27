import React, { useState } from 'react';
import useStyles from './styles';
import './modalAddProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Paper, Button, Typography } from '@material-ui/core';
import { productActions } from '../../../../../redux/actions';
import Select from 'react-select';

export const ModalAddProduct = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const classes = useStyles();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    sale: 0,
    categories: [],
    images: [],
    sold: 0,
    new: true,
    reviews: [],
  });

  let imageUpload = [];

  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'kohaku121',
      uploadPreset: 'ml_default',
    },
    (error, result) => {
      if (result.event === 'success') {
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
    <div className={isOpen ? `modal-page` : ' hidden'}>
      <div className="add-content">
        <button onClick={() => setIsOpen(false)}>
          <i className="fas fa-times"></i>
        </button>
        <Paper className={classes.paper}>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.form} ${classes.root}`}
          >
            <Typography variant="h6">Creating Product</Typography>
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
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 7px',
              }}
            >
              <button
                className="add"
                onClick={(e) => {
                  e.preventDefault();
                  widget.open();
                }}
                style={{
                  padding: '7px 15px',
                  background: '#5C986A',
                  color: 'white',
                  fontWeight: '500',
                }}
              >
                Add picture
              </button>
            </div>
            <div
              className={classes.fileInput}
              style={{
                width: '100%',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(productActions.createProduct(product));
                  setIsOpen(false);
                }}
                className={classes.buttonSubmit}
                variant="container"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                fullWidth
              >
                Clear
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </div>
  );
};
