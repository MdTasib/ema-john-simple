import React from 'react';
import './reviewitem.css';

const ReviewItem = (props) => {
    const { name, quantity, key, img, price } = props.product;
    return (
        <div className='review-item product'>
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <h3 style={{ color: 'blue', fontSize: '20px' }}>{name}</h3>
                <p>Quantity : {quantity}</p>
                <p><small>Price : ${price}</small></p>
                <button
                    onClick={() => props.removeProduct(key)}
                    className='review-btn'>Review Item
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;