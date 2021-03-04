import React from 'react';
import './header.css';
import logo from '../../images/logo.png';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="Logo" />

            <nav>
                <ul>
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/review">Order Review</a></li>
                    <li><a href="/inventory">Manage Inventory here</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;