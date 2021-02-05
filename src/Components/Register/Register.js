import React from 'react'
import './Register.css';
function Register() {
    const h1 = document.getElementById('h1');
    
    return (
        <div className="register__container">
            <div className="register__card">
                <h1 className="register__heading" id="h1">Gateway to . . .</h1> 
                <form className="register__form">
                    <input type="text" placeholder="Enter your fake name"/>
                    <input type="password" placeholder="Your top secret password"/>
                    <input type="email" placeholder="Enter your email address"/>
                    <button type="submit">Get in!?</button>
                </form>
                <p>Okay, already have an account? Login here :D</p>
            </div>
        </div>
    )
}

export default Register
