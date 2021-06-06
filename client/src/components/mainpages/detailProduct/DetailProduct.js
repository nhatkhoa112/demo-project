import React, { useState } from 'react';
import './DetailProduct.css';
import { Carousel } from 'react-responsive-carousel';
import image from './image/alexandra-gorn-CJ6SJO_yR5w-unsplash.jpeg';
import image2 from './image/revolt-164_6wVEHfI-unsplash.jpeg';
import image3 from './image/jakob-owens-JzJSybPFb3s-unsplash.jpeg';
import image4 from './image/wengang-zhai-_fOL6ebfECQ-unsplash.jpeg';

export const DetailProduct = () => {
  const productImages = [
    { id: 0, img: image },
    { id: 1, img: image2 },
    // { id: 2, img: image3 },
    // { id: 3, img: image4 },
  ];
  const [selectImage, setSelectImage] = useState(productImages[0].img);

  const handleClick = (e) => {
    e.preventDefault();
    const idx = e.target.getAttribute('data-index');
    setSelectImage(productImages[idx].img);
  };

  return (
    // <div className="product-detail">
    //   <div id="product-content" class="row product-content">
    //     <div id="thumbnails" className="product-thumbnails">
    //       <div className="selected-image">

    //       </div>
    //       <div className="thumb-image"></div>
    //     </div>
    //     <div id="content"></div>
    //   </div>
    //   <section id="overview" className="row"></section>
    // </div>
    <div className="hero">
      <div className="row">
        <div className="col">
          <div className="slider">
            <div className="preview">
              <img src={selectImage} id="imagebox" alt="" />
            </div>
            <div className="product">
              {productImages.map((image) => {
                return (
                  <img
                    key={image.id}
                    data-index={image.id}
                    src={image.img}
                    alt=""
                    onClick={handleClick}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="content">
            <p className="brand">Brand: Varanga</p>
            <h2>Woman Black Quirky Print Empire Dress</h2>
            <div className="rating">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-half-o" />
            </div>
            <p className="price">Brand: Varanga</p>
            <p>
              Size:{' '}
              <select name="size">
                <option value="select size">select size</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </p>
            <p>
              Quantity: <input type="text" defaultValue={1} />
            </p>
            <button type="button">
              <i className="fa fa-shopping-cart" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
