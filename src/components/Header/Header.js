import React, { useContext } from 'react';
import './header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className='header'>
            <img src={logo} alt="Logo" />

            <nav>
                <ul>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/review">Order Review</Link></li>
                    <li><Link to="/inventory">Manage Inventory here</Link></li>
                    <button onClick={() => { setLoggedInUser({}) }}>Sign Out</button>
                </ul>
            </nav>
        </div>
    );
};

export default Header;