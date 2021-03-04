import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className='product'>
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-description">
                <h4><Link to={`/product/${key}`}>{name}</Link></h4>
                <span>by: {seller}</span><br />
                <span>Price: ${price}</span>
                <p>only {stock} left in stock - order soon</p>
                {props.showAddToCart === true && <button onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;