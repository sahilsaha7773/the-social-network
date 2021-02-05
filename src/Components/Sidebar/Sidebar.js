import { AccountCircle, Chat, GroupAddRounded, Home, People, Whatshot } from '@material-ui/icons';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const locationPath = useLocation().pathname;
    return (
        <div className="sidebar">
            {locationPath==='/' ? (
                <Link className="sidebar__link__selected" to='/'><Home/> Home</Link>
            ): (
                <Link className="sidebar__link" to='/'><Home/> Home</Link>
            )}
            {locationPath==='/people' ? (
                <Link className="sidebar__link__selected" to='/people'><People/> People</Link>
            ): (
                <Link className="sidebar__link" to='/people'><People/> People</Link>
            )}
            {locationPath==='/trending' ? (
                <Link className="sidebar__link__selected" to='/trending'><Whatshot/> Trending</Link>
            ): (
                <Link className="sidebar__link" to='/trending'><Whatshot/> Trending</Link>
            )}
            {locationPath==='/friendRequests' ? (
                <Link  className="sidebar__link__selected" to='/friendRequests'><GroupAddRounded/> Requests</Link>
            ): (
                <Link  className="sidebar__link" to='/friendRequests'><GroupAddRounded/> Requests</Link>
            )}
            {locationPath==='/inbox' ? (
                <Link  className="sidebar__link__selected" to='/inbox'><Chat/> Inbox</Link> 
            ): (
                <Link  className="sidebar__link" to='/inbox'><Chat/> Inbox</Link> 
            )}
            {locationPath==='/profile' ? (
                <Link  className="sidebar__link__selected" to='/profile'><AccountCircle/> Profile</Link> 
            ): (
                <Link  className="sidebar__link" to='/profile'><AccountCircle/> Profile</Link>
            )}
            
            
            
        </div>
    )
}

export default Sidebar
