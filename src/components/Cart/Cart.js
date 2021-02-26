import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd) => total + prd.price, 0);
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const tax = total * 0.1;
    const grandTotal = total + shipping + tax;

    const formatNumber = num => {
        const price = num.toFixed(2);
        return Number(price);
    }
    return (
        <div>
            <h5>Order Summery</h5>
            <p><small>Items Ordered: {cart.length}</small></p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>shipping: {shipping}</small></p>
            <p><small>Tax + Vat: {formatNumber(tax)}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
        </div>
    );
};

export default Cart;