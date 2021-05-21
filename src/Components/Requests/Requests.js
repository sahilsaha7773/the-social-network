import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import './Requests.css';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import config from '../../config';

function Requests() {
    const [user, setUser] = useContext(UserContext);
    const [friendRequests, setFriendRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(config.APIURL+"/user/me", {
                method: "GET",
                headers: {'token': Cookies.get('token')},
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUser(data);
        })
    }, [])
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'token': Cookies.get('token')}
        }
        fetch(config.APIURL+"/user/getReqDetails", requestOptions)
        .then(response => response.json())
        .then(data => {
            setFriendRequests(data.reqsInfo);
            setIsLoading(false);
        })
    }, [user]);
    return (
        <UserContext.Consumer>
            {user => {
                console.log(isLoading);
                return isLoading ? (
                    <div className="req__container">
                        <p>Loading . . .</p>
                    </div>
                ) : 
                friendRequests.length===0 ?(
                    <div className="req__container">
                        <p>You don't have any pending requests!</p>
                    </div>
                ):(
                    <div className="req__container">
                        {friendRequests?.map(req => {
                            return (
                                <div>
                                <Link to={`/people/${req._id}`}>
                                    <div className="req__row">
                                        <img src={req.img} className="profile__photo req__photo"/>
                                        <div className="req__info">
                                            <p>{req.firstName} {req.lastName}</p>
                                            <p>{req.username}</p>
                                        </div>
                                        
                                    </div>
                                        
                                </Link>
                                </div>
                                
                            )
                        })}
                    </div>    
                )}
            }
        </UserContext.Consumer>
    )
}

export default Requests
