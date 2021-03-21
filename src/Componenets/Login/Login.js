import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
// import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const { register, errors, getValues, handleSubmit } = useForm();
    const { log } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = log;
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isLoggedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })


    const handleSignIn = () => {

        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const userInfo = {
                    isLoggedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(userInfo);
                setLoggedIn(userInfo)
                history.replace(from);
                // console.log(displayName, email, photoURL);
            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
            })
    }

    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            const signOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                error: ''
            }
            setUser(signOutUser)
        })
            .catch(error => {
                console.log(error);
            })
    }


    const onSubmit = (data) => {
        if (newUser && data.email && data.password && data.name) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    console.log(res);
                    const { displayName, email } = res.user;

                    const newUserInfo = { ...user }
                    newUserInfo.success = true;
                    newUserInfo.name = displayName;
                    newUserInfo.email = email;
                    newUserInfo.error = '';
                    setUser(newUserInfo)
                    setLoggedIn(newUserInfo);
                    history.replace(from);
                    updateUsername(data.name)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(error);
                });
        }
        if (!newUser && data.email && data.password) {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then(res => {
                    const { displayName, email } = res.user;

                    const newUserInfo = { ...user }
                    newUserInfo.success = true;
                    newUserInfo.name = displayName;
                    newUserInfo.email = email;
                    newUserInfo.error = '';
                    setUser(newUserInfo)
                    setLoggedIn(newUserInfo);
                    history.replace(from);
                    // console.log('user name', res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        // e.preventDefault()
    }

    const updateUsername = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('User name update successfully')
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <div className="m-5 justify-content-center align-content-center d-flex">
                <div>
                    


                    <form onSubmit={handleSubmit(onSubmit)}>
                        {
                            newUser &&
                            <div className="mb-3">
                                <label for="text" className="form-label">UserName</label>
                                <br />
                                <input type="text" name="name" className="form-control" placeholder="Enter your Name..." required ref={register({ required: true, maxLength: 80 })} />

                            </div>
                        }
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required ref={register({
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="exampleInputPassword1" required ref={register({ required: "Password is required!" })}
                            />
                            {errors.password && (
                                <p style={{ color: "black" }}>{errors.password.message}</p>
                            )}
                        </div>
                        {
                            newUser &&
                            <div className="mb-3">
                                <label for="exampleInputPassword2" className="form-label">Confirm Password</label>
                                <input type="password" name="password2" className="form-control" id="exampleInputPassword2" required ref={register({
                                    required: "Please confirm password!",
                                    validate: {
                                        matchesPreviousPassword: value => {
                                            const { password } = getValues();
                                            return password === value || "Passwords should match!";
                                        }
                                    }
                                })}
                                />
                                {errors.password2 && (
                                    <p style={{ color: "black" }}>
                                        {errors.password2.message}
                                    </p>
                                )}
                            </div>
                        }
                        <input type="submit" value={newUser ? 'Sign Up' : 'Log In'} className="btn btn-primary" />
                    </form>




                    <label htmlFor="newUser"> New User !!!</label>
                    <Link onClick={() => setNewUser(!newUser)} name="" id="newUser"> { newUser?  'Log In' : 'Create an Account'} </Link>
                    <br />
                    <h4 className="text-center">Or</h4>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {
                        user.success && <p style={{ color: 'green' }}>Your account {newUser ? 'created' : 'Log In'} successfully</p>
                    }
                    {
                        user.isLoggedIn ? <button className="btn btn-success" onClick={handleSignOut}>Sign Out</button> : <button className="btn btn-success" onClick={handleSignIn}><i class="fab fa-google"> Continue with Google</i></button>
                    }
                </div>
            </div>

        </div>
    );
};

export default Login;