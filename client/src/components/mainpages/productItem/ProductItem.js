import React, { useState, useEffect } from 'react';
import './productItem.css';
import { Link } from 'react-router-dom';
import { ModalCart } from '../utils/modalCart/ModalCart';
import { useDispatch, useSelector } from 'react-redux';
import { orderUserActions } from '../../../redux/actions';

export const ProductItem = ({ product, isFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  let quantity = 1;
  const price_on_purchase_date = (product.price * (100 - product.sale)) / 100;
  const dispatch = useDispatch();

  return (
    <div className="card">
      <ModalCart
        quantity={1}
        product={product}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <img
        className={isFilter ? '' : 'zoom'}
        src={product.images[0].url}
        alt=" "
      />
      {product.sale ? <span className="sale">Sale</span> : ''}
      <div className="eye-icon">
        <i className="far fa-eye" height={20} width={20}></i>
      </div>
      <div
        className="cart-icon"
        onClick={() => {
          dispatch(
            orderUserActions.createOrderUser(
              product,
              quantity,
              price_on_purchase_date
            )
          );
          setIsOpen(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
          height={20}
          width={20}
          id="svg2"
          version="1.1"
          xmlnsdc="http://purl.org/dc/elements/1.1/"
          xmlnscc="http://creativecommons.org/ns#"
          xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlnssvg="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
        >
          <metadata id="metadata8">
            <rdf>
              <work rdfabout="true">
                <format>image/svg+xml</format>
                <type rdfresource="http://purl.org/dc/dcmitype/StillImage" />
              </work>
            </rdf>
          </metadata>
          <defs id="defs6" />
          <g transform="matrix(1.3333333,0,0,-1.3333333,0,400)" id="g10">
            <g transform="scale(0.1)" id="g12">
              <path
                id="path14"
                style={{
                  fill: '#231f20',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none',
                }}
                d="M 2565.21,2412.71 H 450.992 V 0 H 2565.21 V 2412.71 Z M 2366.79,2214.29 V 198.43 H 649.418 V 2214.29 H 2366.79"
              />
              <path
                id="path16"
                style={{
                  fill: '#231f20',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none',
                }}
                d="m 1508.11,2990 h -0.01 c -361.22,0 -654.037,-292.82 -654.037,-654.04 V 2216.92 H 2162.14 v 119.04 c 0,361.22 -292.82,654.04 -654.03,654.04 z m 0,-198.43 c 224.16,0 411.02,-162.7 448.69,-376.23 h -897.39 c 37.66,213.53 224.53,376.23 448.7,376.23"
              />
              <path
                id="path18"
                style={{
                  fill: '#231f20',
                  fillOpacity: 1,
                  fillRule: 'nonzero',
                  stroke: 'none',
                }}
                d="m 1946.24,1868.17 h -876.27 v 169.54 h 876.27 v -169.54"
              />
            </g>
          </g>
        </svg>
      </div>
      <Link to={`/product/${product._id}`} className="card__title">
        {product.title}
      </Link>
      <div className="card__price">
        <span className="final">
          $
          {product.sale
            ? ((product.price * (100 - product.sale)) / 100).toFixed(2)
            : product.price.toFixed(2)}
        </span>
        <span>
          <strike>
            {product.sale ? `$ ${product.price.toFixed(2)} ` : ''}
          </strike>
        </span>
      </div>
    </div>
  );
};
