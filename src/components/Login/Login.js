import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleFacebookSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
    })

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };




    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const facebookSignIn = () => {
        handleFacebookSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }


    const handleBlur = e => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value > 5;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }


    // state destructuring
    const { name, email, photo } = user;

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn
                    ?
                    <button onClick={signOut}>Sing Out</button>
                    :
                    <button onClick={googleSignIn}>Sing In</button>
            }
            <br />
            <button onClick={facebookSignIn}>Sign in with facebook</button>
            {
                user.isSignedIn && <div>
                    <h3>Name : {name}</h3>
                    <p>Email : {email}</p>
                    <img src={photo} alt="" />
                </div>
            }



            {/* form validation */}
            <h3>Form Validation</h3>
            <input type="checkbox" onChange={() => { setNewUser(!newUser) }} name="newUser" />
            <label htmlFor="newUser">New User Sign Up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder='Your Name' />}<br />
                <input type="email" name="email" onBlur={handleBlur} placeholder='Your email address' required /><br />
                <input type="password" name="password" onBlur={handleBlur} placeholder='Your password' required /><br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
            </form>

            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'loged in'} successfully</p>
            }
        </div>
    );
}

export default Login;