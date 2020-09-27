import React, { useContext, useState } from 'react';
import 'react-bootstrap';
import './Login.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from 'react-bootstrap';
import { Link } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import googleIcon from './google.png';
import { UserLoggedInContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '90%',
        },
    },
}));


const Login = () => {

    const [userLoggedIn, setUserLoggedIn] = useContext(UserLoggedInContext);
    const [haveAccount, setHaveAccount] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const classes = useStyles();

                // google Sign In
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = (event) => {
        firebase.auth().signInWithPopup(provider)
        .then( res => {
            const userInfo = {
                isLoggedIn: true,
                name: res.user.displayName,
                photo: res.user.photoURL,
                email: res.user.email,
                error: ""
            }
            setUserLoggedIn(userInfo);
            history.replace(from);
        })
        .catch( err => {
            const userInfo = {
                isLoggedIn: false,
                name: "",
                photo: "",
                email: "",
                error: err.message
            }
            setUserLoggedIn(userInfo);
        });
        event.preventDefault();
    }

            // Fb Sign In
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFBSignIn = (event) => {
        firebase.auth().signInWithPopup(fbProvider)
        .then( res => {
        console.log(res.user);
        })
        .catch( err => {
            const userInfo = {
                isLoggedIn: false,
                name: "",
                photo: "",
                email: "",
                error: err.message
            }
            setUserLoggedIn(userInfo);
        });
        event.preventDefault()
    }

            // Create Account with email and password

    const handleField = (event) => {
        const targetedField = event.target;
        let isFieldValid;
        if (targetedField.name === "email") {
            const regXForEmail = /\S+@\S+\.\S+/;
            isFieldValid = regXForEmail.test(targetedField.value);
            if(isFieldValid){
                const userInfo = {...userLoggedIn};
                userInfo.error = "";
                userInfo.email = targetedField.value;
                setUserLoggedIn(userInfo);
            }
            if(!isFieldValid){
                const userInfo = {...userLoggedIn};
                userInfo.error = "Email address not valid.";
                userInfo.email = "";
                setUserLoggedIn(userInfo);
            }
        }
        if (targetedField.name === "password") {
            const regXForPassword = /^(?=.*?[0-9]).{6,}$/;
            isFieldValid = regXForPassword.test(targetedField.value);
            if(!isFieldValid){
                const userInfo = {...userLoggedIn};
                userInfo.password = "";
                userInfo.error = "Invalid Password.Password should have 6 character and contain at least a digit";
                setUserLoggedIn(userInfo);
            }
            if(isFieldValid){
                const userInfo = {...userLoggedIn};
                userInfo.password = targetedField.value;
                userInfo.error = "";
                setUserLoggedIn(userInfo);
            }
        }

        if (targetedField.name === "name") {
            const userInfo = {...userLoggedIn};
            userInfo.name = targetedField.value;
            setUserLoggedIn(userInfo);
        }
    }

    const handleConfirmPassword = (event) => {
        if (event.target.value !== userLoggedIn.password){
            const userInfo = {...userLoggedIn};
            userInfo.error = "Password doesn't match.";
            userInfo.passwordConfirmed = false;
            setUserLoggedIn(userInfo);
            alert("Password Doesn't Match.");
        }
        if (event.target.value === userLoggedIn.password){
            const userInfo = {...userLoggedIn};
            userInfo.error = "";
            userInfo.passwordConfirmed = true;
            setUserLoggedIn(userInfo);
        }
        event.preventDefault();
    }
    

    const handleSubmit = (event) => {
        if (!haveAccount && userLoggedIn.email && userLoggedIn.password && userLoggedIn.passwordConfirmed) {
            firebase.auth().createUserWithEmailAndPassword(userLoggedIn.email, userLoggedIn.password)
            .then( () => {
                const userInfo = {...userLoggedIn};
                userInfo.isLoggedIn = true;
                userInfo.error = "";
                setUserLoggedIn(userInfo);
                updateUserName(userInfo.name);
                history.replace(from);
            })
            .catch( error => {
                const userInfo = {...userLoggedIn};
                userInfo.isLoggedIn = false;
                userInfo.error = error.message;
                setUserLoggedIn(userInfo);
            });
        }
        if (haveAccount && userLoggedIn.email && userLoggedIn.password) {
            firebase.auth().signInWithEmailAndPassword(userLoggedIn.email, userLoggedIn.password)
            .then( () => {
                const userInfo = {...userLoggedIn};
                userInfo.isLoggedIn = true;
                userInfo.error = "";
                setUserLoggedIn(userInfo);
                history.replace(from);
            })
            .catch( error => {
                const userInfo = {...userLoggedIn};
                userInfo.isLoggedIn = false;
                userInfo.error = error.message;
                setUserLoggedIn(userInfo);
            });
        }

        event.preventDefault();
    } 
    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
        .then( () => {
            console.log("Name updated successfully");
        })
        .catch( error => {
            console.log(error);
        });
    }

    // const userDetails = firebase.auth().currentUser;
    //     if (userDetails != null) {
    //         userDetails.providerData.forEach( profile => {
    //         userLoggedIn.name = profile.displayName;
    //     });
    // }


    return (
        <div>
            <div className="row">
                <div className="col-12 center-block d-flex justify-content-center">
                    <div className="card m-3 p-2">
                        {
                            haveAccount ? <h4 style={{ textAlign: "center" }}>Login</h4>
                            : <h4 style={{ textAlign: "center" }}>Create Account</h4>
                        }
                        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                            {
                                !haveAccount && <TextField type="text" onBlur={handleField} name="name" id="standard-basic" label="Full Name" required/>      
                            }
                            <br/>
                            <TextField onBlur={handleField} type="text" name="email" id="standard-basic" label="User Email" required/><br/>
                            <TextField onBlur={handleField} type="password" id="standard-basic" name="password" label="Password" required/><br />
                            {
                                !haveAccount && <TextField type="password" onBlur={handleConfirmPassword} id="standard-basic" label="Confirm Password" required/>
                            }
                            <br />
                            <div className="row">
                                <div className="col-7">
                                    <input type="checkbox" name="rememberMe" id="" />
                                    <label htmlFor="rememberMe">&nbsp; Remember Me</label>
                                </div>
                                <div className="col-5">
                                    <p style={{ color: "orange" }}>Forgot Password?</p>
                                </div>
                            </div>
                        <Button type="submit" variant="warning" size="lg" block>{haveAccount ? <h4><small>Login</small></h4> : <h4><small>Sign Up</small></h4>}</Button> <br />
                            {
                                haveAccount ?
                                <p style={{ textAlign: "center" }}>Don't have an account? <Link onClick={() => setHaveAccount(!haveAccount)} style={{ color: "orange" }}>Create an account</Link></p>
                                : 
                                <p style={{ textAlign: "center" }}>Already have an account? <Link onClick={() => setHaveAccount(!haveAccount)} style={{ color: "orange" }}>Login</Link></p>
                            }
                            <p style={{color: "red", textAlign: "center"}}>{userLoggedIn.error}</p>
                            
                        </form>
                    </div>
                </div>
            </div>
            <h5 style={{ textAlign: "center" }}>Or</h5>
            <div className="row my-3">
                <div className="col-12 d-flex justify-content-center">
                    <Button onClick={handleFBSignIn} className="sign-in-btn icon-holder" variant="light" size="lg" block><span className="icon"><FacebookIcon color="primary"></FacebookIcon></span> Continue with Facebook</Button>
                </div>
            </div>
            <div className="row my-3">
                <div className="col-12 d-flex justify-content-center">
                    <Button onClick={handleGoogleSignIn} className="sign-in-btn icon-holder" variant="light" size="lg" block><span className="icon"><img src={googleIcon} alt="" className="google-icon"/></span> Continue with Google</Button>
                </div> 
            </div>
        </div>
    );
};

export default Login;