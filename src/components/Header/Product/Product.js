import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props);
    const { name, price, img, seller, stock } = props.product;
    // console.log(props.product);
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-name'>
                <h4 >{name}</h4>
                <p><small>By: {seller}</small></p>
                <br />
                <p><strong>${price}</strong></p>
                <p><small>only {stock} left in stock- Order soon</small></p>
                <button
                    className='add-cart'
                    onClick={() => props.handleAddProduct(props.product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart
                </button>
            </div>

        </div>
    );
};

export default Product;