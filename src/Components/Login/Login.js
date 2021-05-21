import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../../context/UserContext';
import config from '../../config';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    function handleChange(e) {
        if(e.target.name==="email")
            setEmail(e.target.value);
        else if(e.target.name==="password")
            setPassword(e.target.value);
    }
    function handleLogin(e){
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        fetch('http://localhost:4000/user/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            setCookie("token", data.token);
            fetch(config.APIURL+"/user/me", {
                method: "GET",
                headers: {'token': data.token},
            })
            .then(response => response.json())
            .then(data => {
                setUser(data);
            })
        })
    }
    return (
        <UserContext.Consumer>
            {user => {
                console.log(user);
                if(user[0]._id){
                    return <Redirect to="/"/>
                }
                else {
                    return (
                        <div className="login__container">
                            <div className="login__card">
                                <h1 className="login__heading">Welcome back . . .</h1> 
                                <form className="login__form">
                                    <input type="email" name="email" value={email} onChange={handleChange} placeholder="Enter your email"/>
                                    <input type="password" name="password" value={password} onChange={handleChange} placeholder="Your top secret password"/>
                                    <button type="submit" onClick={handleLogin}>Get in!?</button>
                                </form>
                                <p>What? Don't have an account? That's bad, create one here -_-</p>
                            </div>
                        </div>
                    )
                }
            }}
        </UserContext.Consumer>
        
    )
}

export default Login
