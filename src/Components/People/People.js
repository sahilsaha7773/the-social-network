import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import Cookies from 'js-cookie';
import './People.css';
import { Link } from 'react-router-dom';
import config from '../../config';

function People() {
    const [user, setUser] = useContext(UserContext);
    const [people, setPeople] = useState([]);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'token': Cookies.get('token')}
        }
        fetch(process.env.APIURL+"/api/people", requestOptions)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setPeople(data);
        }); 
    }, []);
    return (
        <UserContext.Consumer>
            {user => {
                return (
                    <div className="people__container">
                            {
                                people?.map(one => {
                                    return (
                                        <Link to={`/people/${one._id}`}>
                                            <div className="people__box">
                                                <img src={one.img} className="people__img"/>
                                                <p>{one.firstName} {one.lastName}</p>
                                                <p>{one.username}</p> 
                                            </div>
                                        </Link>
                                        
                                    )
                                })
                            }
                    </div>
                )
            }}
        </UserContext.Consumer>
        
    )
}

export default People
