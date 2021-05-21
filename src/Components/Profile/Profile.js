import React, { useContext, useEffect, useState } from 'react'
//import { useCookies, withCookies, Cookies } from 'react-cookie';
import UserContext from '../../context/UserContext'
import Sidebar from '../Sidebar/Sidebar'
import './Profile.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Flight, HomeOutlined } from '@material-ui/icons';
import config from '../../config';
function Profile() {
    const [user, setUser] = useContext(UserContext);
    
    return (
        <UserContext.Consumer>
            {user => {
                return (
                    <div className="profile__container">
                        <img src={`${user[0].img}`} className="profile__photo"/>

                        
                        <h2>{user[0].firstName} {user[0].lastName}</h2>
                        <p>{user[0].username}</p>
                        <p className="bio">{user[0].bio ? user[0].bio : "Write something about yourself..."}</p>
                        <div className="profile__about">
                            <p>{user[0].livesIn && (<div className="about__info"><HomeOutlined/> <p className="about__p">Lives in {user[0].livesIn}</p></div>)}</p>
                            <p>{user[0].from && (<div className="about__info"><Flight/> <p className="about__p">From {user[0].from}</p></div>)}</p>
                        </div>
                            
                        <Link className="" to='/editProfile'>Edit</Link>
                        {/* <p>Studies in {user[0].education[0] && user[0].education[0]}</p> */}
                    </div>
                )
            }}
        </UserContext.Consumer>
        
    )
}

export default Profile
