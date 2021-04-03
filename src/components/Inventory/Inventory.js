import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const product = {}
    const handleAddProduct = () => {
        fetch('http://localhost:4000/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text" /></p>
                <p><span>price</span><input type="text" /></p>
                <p><span>quantity</span><input type="text" /></p>
                <p><span>product image</span><input type="file" /></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;