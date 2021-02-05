import React, {useState, useEffect} from 'react'
import './Navbar.css';
import {Link, useLocation} from 'react-router-dom'
function Navbar() {
    const locationPath = useLocation().pathname;
    return (
        <div className="navbar">
            <div className="navbar__left">
                <h1>The Social Network</h1>
            </div>
            <div className="navbar__right">
                {locationPath!='/login' && <Link className="navbar__link" to="/login">Log in</Link>}
                
                {locationPath!='/register' && <Link className="navbar__link" to="/register">Register</Link>}
                <Link className="navbar__link" to="/users">Users</Link>
            </div>
            
        </div>
    )
}

export default Navbar
