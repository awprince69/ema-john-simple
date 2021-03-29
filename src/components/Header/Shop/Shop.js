import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../Product/Product';
import './shop.css';
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('https://emajhon-server.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

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
    }, [])

    const handleAddProduct = (product) => {
        // console.log('product added',product);
        const toBeAdded = product.key;

        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(pd => <Product
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}
                        key={pd.key}
                    ></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className='add-cart'> Order Review</button></Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;