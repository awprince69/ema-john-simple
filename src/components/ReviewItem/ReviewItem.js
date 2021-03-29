import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity,key,price} = props.product
    const reviewItemStyle = {
        borderBottom: '1px solid gray',
        marginLeft: "80px",
        paddingBottom: "10px"
    }
    return (
        <div style={reviewItemStyle} className="product-name">
            <h4 >{name}</h4>
            <h5>Quantity: {quantity}</h5>
            <p>Price: {price}</p>
            <br/>
            <button className='add-cart' onClick={()=>props.removeItem(key)}> Remove </button>
        </div>
    );
};

export default ReviewItem;