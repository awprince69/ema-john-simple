import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createWithEmailAndPassword, handleFbSignIn, handleGhSignIn, handleSignIn, handleSignOut, initializeApp, logInWithEmailAndPassword } from "./LoginManager";

initializeApp();

function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleSignIn()
            .then(res => {
                setUser(res)
                setLoggedInUser(res)
                history.replace(from)
            })
    }
    const FbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                setUser(res)
                setLoggedInUser(res)
                history.replace(from)
            })
    }
    const gitHubSignIn = () => {
        handleGhSignIn()
            .then(res => {
                setUser(res)
                setLoggedInUser(res)
                history.replace(from);
            })
    }
    const googleSignOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res)
                setLoggedInUser(res)
            })
    }
    const handleChange = (e) => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordValid = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordValid;
        }
        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createWithEmailAndPassword(user.name, user.email, user.password)
                .thn(res => {
                    console.log(res);
                    setUser(res)
                    setLoggedInUser(res)
                    history.replace(from);
                })
        }
        if (!newUser && user.email && user.password) {
            logInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res);
                    setUser(res)
                    setLoggedInUser(res)
                    history.replace(from);
                })
        }
        e.preventDefault();
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignIn ? <button onClick={googleSignOut}>Sign out</button>
                    : <button onClick={googleSignIn}>Sign in</button>
            }
            <br />
            <button onClick={FbSignIn}>Facebook Login</button>
            <br />
            <button onClick={gitHubSignIn}>GitHub Login</button>
            {
                user.isSignIn && <div>
                    <p>welcome {user.name}</p>
                    <p>email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <h1>Our Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser"> For Reregistration</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input name='name' type="text" onBlur={handleChange} placeholder='Enter your name' />}
                <br />
                <input type="text" name='email' onBlur={handleChange} placeholder='Enter your email' required />
                <br />
                <input type="password" name="password" id="" required placeholder='Enter your password' onBlur={handleChange} />
                <br />
                <input type="submit" value={newUser ? 'Sing Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} Successfully</p>
            }
        </div>
    );
}

export default Login;
