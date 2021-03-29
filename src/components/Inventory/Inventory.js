import React from 'react';

const Inventory = () => {
    const handleAddProduct = () => {
        const products = {}
        fetch('http://localhost:5000/addProduct', {
            method: "POST",
            body: JSON.stringify(products),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text" /></p>
                <p><span>Price: </span><input type="text" /></p>
                <p><span>Quantity: </span><input type="text" /></p>
                <p><span>Product Image</span><input type="file" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;