import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Header/Product/Product';

const ProductDetails = () => {
   const {productKey}= useParams();
   const [product,setProduct] = useState({})
   useEffect(()=>{
        fetch(`https://emajhon-server.herokuapp.com/product/${productKey}`)
        .then(res=>res.json())
        .then(data=>setProduct(data))
   },[productKey])
    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;