import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    const { name, price, img, seller, stock, key } = props.product;
    // console.log(props.product);
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-name'>
                <h4 > <Link to={'/product/' + key}>{name}</Link>  </h4>
                <p><small>By: {seller}</small></p>
                <br />
                <p><strong>${price}</strong></p>
                <p><small>only {stock} left in stock- Order soon</small></p>
                {props.showAddToCart && <button
                    className='add-cart'
                    onClick={() => props.handleAddProduct(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart
            </button>}
            </div>

        </div>
    );
};

export default Product;