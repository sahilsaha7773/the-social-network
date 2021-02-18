import React from 'react'
import UserContext from '../../context/UserContext'
import Sidebar from '../Sidebar/Sidebar'
import './Profile.css';

function Profile() {
    
    return (
        <UserContext.Consumer>
            {user => {
                return (
                    <div className="profile__container">
                        <p>{user[0].username}</p>
                    </div>
                )
            }}
        </UserContext.Consumer>
        
    )
}

export default Profile
