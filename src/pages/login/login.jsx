import React, { useState } from "react";
import "./login.css";
import users from '../../data/users.json'
import { useNavigate } from "react-router-dom";
import { loginAxios } from "./loginAxios";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [payload, setPayload] = useState();

    const navigate = useNavigate()

    const signUp = () => {
        console.log('%csrc/pages/login/login.jsx:9 object', 'color: #007acc;');
    }

    const signIn = async () => {
        const { data } = await loginAxios(payload);
        console.log('%csrc/pages/login/login.jsx:18 user', 'color: #007acc;', data);
        if (data) {
            localStorage.setItem('id', data.id);
            localStorage.setItem('name', data.name);
            navigate('/');
        } else {
            console.log('User not found')
        }

    }

    return (

        <div className="containerBody">
            <div className={`container ${isSignUp ? "active" : ""} `} id="container">
                {/* Sign-Up Form */}
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        {/* <div className="social-icons">
                         <a href="#" className="icon">
                             <FontAwesomeIcon icon={faGooglePlusG} />
                         </a>
                         <a href="#" className="icon">
                             <FontAwesomeIcon icon={faFacebookF} />
                         </a>
                         <a href="#" className="icon">
                             <FontAwesomeIcon icon={faGithub} />
                         </a>
                         <a href="#" className="icon">
                             <FontAwesomeIcon icon={faLinkedinIn} />
                         </a>
                     </div> */}
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="button" onClick={signUp}>Sign Up</button>
                    </form>
                </div>

                {/* Sign-In Form */}
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        {/* <div className="social-icons">
                         <a href="#" className="icon">
                             <FontAwesomeIcon icon={faGooglePlusG} />
                         </a>
                         <a href="#" className="icon">
                             <FontAwesomeIcon icon={faFacebookF} />
                         </a>
                         <a href="#" className="icon">
                             <FontAwesomeIcon icon={faGithub} />
                         </a>
                         <a href="#" className="icon">
                             <FontAwesomeIcon icon={faLinkedinIn} />
                         </a>
                     </div> */}
                        <span>or use your email and password</span>
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => {
                                setPayload((pre) => {
                                    return {
                                        ...pre,
                                        email: e.target.value,
                                    }
                                })
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPayload((pre) => {
                                    return {
                                        ...pre,
                                        password: e.target.value,
                                    }
                                })
                            }} />
                        {/* <a href="#">Forgot Your Password?</a> */}
                        <button type="button" onClick={signIn}>Sign In</button>
                    </form>
                </div>

                {/* Toggle Panels */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to start your journey with us</p>
                            <button className="hidden" id="login" onClick={() => setIsSignUp(false)}>
                                Sign In
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to enjoy all features</p>
                            <button className="hidden" id="register" onClick={() => setIsSignUp(true)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};