import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import '../Shop/shop.css';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();

    const handleProccedCheck = () => {
        history.push('/shipment')
    }

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


    let thinkYou;
    if (orderPlaced) {
        thinkYou = <img src={happyImage} alt="" />
    }

    return (
        <div className='shop-container'>
            <div className="item-container">
                {
                    cart.map(pd => <ReviewItem
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd} />)
                }
                {thinkYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProccedCheck} className='order-btn'>Procced Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;