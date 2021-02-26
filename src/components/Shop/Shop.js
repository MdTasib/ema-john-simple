import './shop.css';
import React, { useState } from 'react';
import fakeData from '../../fakeData';

const Shop = () => {
    const product10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(product10);

    return (
        <div className='shop-container'>
            <div className="products-container">
                <ul>
                    {
                        products.map(product => <li>{product.name}</li>)
                    }
                </ul>
            </div>
            <div className="cart-container"><h1>THis is cart area</h1></div>
        </div>
    );
};

export default Shop;