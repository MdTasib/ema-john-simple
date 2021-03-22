import React, { useState, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.confiq';
import { UserContext } from '../../App';

// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


function Login() {

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        password: '',
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // google provider
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    // facebook provider
    const facebookProvider = new firebase.auth.FacebookAuthProvider();



    const handleSignInd = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                console.log(displayName, email, photoURL)

                // user setState --> setUser
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                setUser(signedInUser);

            })
            .catch(error => {
                console.log(error.message)
            })
    }


    const facebookHandle = () => {
        firebase.auth().signInWithPopup(facebookProvider)
            .then((result) => {
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;

                console.log('facebook user sign in', user)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
            });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(result => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: '',
                    success: '',
                }
                // user setState --> setUser
                setUser(signedOutUser)
            })
            .catch(error => {
                console.log(error.message)
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
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // console.log(res.user)
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                })
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // console.log(res.user)
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    console.log('sign in user info', res.user)
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                })
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        })
            .then(function () {
                console.log('Update successfully');
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    // state destructuring
    const { name, email, photo } = user;

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn
                    ?
                    <button onClick={handleSignOut}>Sing Out</button>
                    :
                    <button onClick={handleSignInd}>Sing In</button>
            }
            <br />
            <button onClick={facebookHandle}>Sign in with facebook</button>
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