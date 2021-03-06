import './shop.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const product10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(product10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const productsCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(productsCart);
    }, [])

    const handleAddProduct = (product) => {
        const toBeadded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeadded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeadded)
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
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
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button><FontAwesomeIcon icon={faShoppingCart} />Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div >
    );
};

export default Shop;