import React from 'react'
import './Login.css';

function Login() {
    return (
        <div className="login__container">
            <div className="login__card">
                <h1 className="login__heading">Welcome back . . .</h1> 
                <form className="login__form">
                    <input type="text" placeholder="Enter your fake name"/>
                    <input type="password" placeholder="Your top secret password"/>
                    <button type="submit">Get in!?</button>
                </form>
                <p>What? Don't have an account? That's bad, create one here -_-</p>
            </div>
        </div>
    )
}

export default Login
