import './shop.css';
import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const product10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(product10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;

        addToDatabaseCart(product.key, count);
    }


    return (
        <div className='shop-container'>
            <div className="item-container">
                {
                    products.map((singleProduct, index) => <Product
                        key={index}
                        handleAddProduct={handleAddProduct}
                        product={singleProduct}
                        showAddToCart={true}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div >
    );
};

export default Shop;