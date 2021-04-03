import './shop.css';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    // const product10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    // page title
    document.title = 'Shop More';

    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:4000/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data));
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
                    products.length === 0 && <img src="https://beta.derbywars.com/730962f1428d399370f94df3aa99a10273b07ff9/images/horse-running-large-gray.gif" alt="" />
                }
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