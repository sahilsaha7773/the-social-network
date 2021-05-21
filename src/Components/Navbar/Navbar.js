import React, {useState, useEffect, useContext} from 'react'
import './Navbar.css';
import {Link, useLocation} from 'react-router-dom'
import UserContext from '../../context/UserContext';
import Cookies from 'js-cookie';

function Navbar() {
    const [user, setUser] = useContext(UserContext);
    function handleLogout(){
        setUser({});
        Cookies.remove('token');
    }
    const locationPath = useLocation().pathname;
    return (
        <UserContext.Consumer>
            {user => {
                if(user[0]._id){
                    return (
                        <div className="navbar">
                            <div className="navbar__left">
                                <h1>The Social Network</h1>
                            </div>
                            <div className="navbar__right">
                                <Link className="navbar__profile" to='/profile'>
                                        <img src={user[0].img} className="navbar__profileimg"/>
                                        {user[0].username}
                                </Link>
                                
                                <button className="logout__btn" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    )
                    
                }
                else {
                    return (<div className="navbar">
                        <div className="navbar__left">
                            <h1>The Social Network</h1>
                        </div>
                        <div className="navbar__right">
                            {locationPath!='/login' && <Link className="navbar__link" to="/login">Log in</Link>}
                            
                            {locationPath!='/register' && <Link className="navbar__link" to="/register">Register</Link>}
                            <Link className="navbar__link" to="/users">Users</Link>
                        </div>
                        
                    </div>)
                }
            }}
        </UserContext.Consumer>
        
    )
}

export default Navbar
