import React from 'react';
import './Product.css';

const Product = (props) => {
    console.log(props.product)
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className='product'>
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <h4>{name}</h4>
                <span>by: {seller}</span><br />
                <span>Price: ${price}</span>
                <p>only {stock} left in stock - order soon</p>
            </div>
        </div>
    );
};

export default Product;