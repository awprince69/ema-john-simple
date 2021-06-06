import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig'

export const initializeApp = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

const setIdToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        sessionStorage.setItem('token',idToken)
    }).catch(function (error) {
        // Handle error
    });
}

export const handleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const userSignedIn = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setIdToken();
            return userSignedIn;
        })
        .catch(err => {
            console.log(err);
        })
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((res) => {
            var credential = res.credential;
            const user = res.user;
            const { displayName, email, photoURL } = res.user;
            const userSignedIn = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            return userSignedIn
            var accessToken = credential.accessToken;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            var email = error.email;
            var credential = error.credential;
        });
}

export const handleGhSignIn = () => {
    const ghProvider = new firebase.auth.GithubAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(ghProvider)
        .then((res) => {
            var credential = res.credential;
            var token = credential.accessToken;
            var user = res.user;
            const { displayName, email, photoURL } = res.user;
            const userSignedIn = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return userSignedIn;
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorMessage);
        });
}

export const handleSignOut = () => {
    return firebase.auth()
        .signOut()
        .then((res) => {
            const userSignedOut = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
            }
            return userSignedOut
        }).catch((error) => {
            console.log(error.message);
        });
}

export const createWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user
            console.log(newUserInfo);
            newUserInfo.error = ''
            newUserInfo.success = true
            return (newUserInfo);
            updateUserName(name);
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const logInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user
            console.log(newUserInfo);
            newUserInfo.error = ''
            newUserInfo.success = true
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return (newUserInfo)
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('name changed');
    }).catch(function (error) {
        console.log(error);
    });
}