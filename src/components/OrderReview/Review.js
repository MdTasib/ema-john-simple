import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import '../Shop/shop.css';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';


const Review = () => {
    // page title
    document.title = 'Review Product';
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

        fetch('http://localhost:4000/productsByKeys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data));
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
