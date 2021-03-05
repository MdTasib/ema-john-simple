import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
    const removeProduct = productKeys => {
        const newCart = cart.filter(pd => pd.key !== productKeys);
        setCart(newCart);
        removeFromDatabaseCart(productKeys);
    }

    useEffect(() => {
        // cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])


    return (
        <div>
            <h2>Product Item : {cart.length}</h2>
            {
                cart.map(pd => <ReviewItem
                    removeProduct={removeProduct}
                    key={pd.key}
                    product={pd} />)
            }
        </div>
    );
};

export default Review;