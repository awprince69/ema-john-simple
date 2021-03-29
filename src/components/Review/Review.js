import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import './Review.css'
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory();
    const handlePlacedOrder = () => {
        history.push('/shipment')
    }

    const removeItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        fetch('https://emajhon-server.herokuapp.com/productByKeys',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(productKey)
        })
        .then(res=>res.json())
        .then(data=>setCart(data))
    }, []);
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={image} alt="" />
    }
    return (
        <div className="twin-container" >
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem product={pd} key={pd.key} removeItem={removeItem}></ReviewItem>)
                }
                { thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlacedOrder} className='add-cart'>Proceed TO checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;