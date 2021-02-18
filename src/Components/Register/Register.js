import React, { useContext, useState } from 'react'
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import './Register.css';
function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [user, setUser] = useContext(UserContext);
   // console.log("jkhjjk", user);
    function handleChange(e) {
        if(e.target.name==="username")
            setUsername(e.target.value);
        else if(e.target.name==="password")
            setPassword(e.target.value);
        else if(e.target.name==="email")
            setEmail(e.target.value);
    }
    
    function handleSignUp(e) {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }
        fetch("http://localhost:4000/user/signup", requestOptions)
        .then(response => response.json())
        .then(data => {
            setCookie("token", data.token);
            console.log(user);
            //console.log(data)
            fetch("http://localhost:4000/user/me", {
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
            {
                user => {
                    console.log(user);
                    if(user[0]._id){
                        console.log("Red");
                        return <Redirect to="/"/>
                    }
                    return (
                        <div className="register__container">
                            <div className="register__card">
                                <h1 className="register__heading" id="h1">Gateway to . . .</h1> 
                                <form className="register__form">
                                    <input type="text" name="username" value={username} onChange={handleChange} placeholder="Enter your fake name"/>
                                    <input type="email" name="email" value={email} onChange={handleChange} placeholder="Enter your email address"/>
                                    <input type="password" name="password" value={password} onChange={handleChange} placeholder="Your top secret password"/>
                                </form>
                                <button onClick={handleSignUp}>Get in!?</button>
                                <p>Okay, already have an account? Login here :D</p>
                            </div>
                        </div>
                    )
                }
            }
        </UserContext.Consumer>
            
        
    )
}

export default Register
