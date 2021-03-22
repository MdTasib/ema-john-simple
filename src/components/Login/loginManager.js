import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.confiq';



// // firebase.initializeApp(firebaseConfig);
export const initializeLoginFramework = () => {
    // if (!firebase.apps.length) {
    //     firebase.initializeApp(firebaseConfig);
    // }
    // or

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

// google provider
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const { displayName, email, photoURL } = result.user;
            console.log(displayName, email, photoURL)

            // user setState --> setUser
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser

        })
        .catch(error => {
            console.log(error.message)
        })
}


export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(result => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false,
            }
            return signedOutUser
        })
        .catch(error => {
            console.log(error.message)
        })

}

// facebook provider
export const handleFacebookSignIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(facebookProvider)
        .then((result) => {
            var credential = result.credential;
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            user.success = true;
            return user;
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



export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
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
