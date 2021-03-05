import React from 'react';
import './reviewitem.css';

const ReviewItem = (props) => {
    const { name, quantity, key } = props.product;
    return (
        <div className='review-item'>
            <h3 style={{ color: 'blue', fontSize: '20px' }}>{name}</h3>
            <p>Quantity : {quantity}</p>
            <button
                onClick={() => props.removeProduct(key)}
                className='review-btn'>Review Item</button>
        </div>
    );
};

export default ReviewItem;