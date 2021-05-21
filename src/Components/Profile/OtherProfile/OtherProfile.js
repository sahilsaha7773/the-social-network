import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../../context/UserContext';
import Cookies from 'js-cookie';
import { Flight, HomeOutlined } from '@material-ui/icons';
import './OtherProfile.css';
import Post from '../../Post/Post';
import config from '../../../config';
function OtherProfile() {
    const {userId} = useParams();
    const [profile, setProfile] = useState({});
    const [user, setUser] = useContext(UserContext);
    const [requestSent, setRequestSent] = useState(false);
    const [incomingRequest, setIncomingRequest] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'token': Cookies.get('token')}
        }
        fetch(`http://localhost:4000/api/people/${userId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProfile(data.user);
            setRequestSent(data.requestSent);
            setIncomingRequest(data.incomingRequest);
            setIsFriend(data.isFriend);
        })
        fetch(`http://localhost:4000/post/postByUser/${userId}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPosts(data);
        })
    }, []);
    function handleSendRequest(e) {
        const requestOptions = {
            method: 'POST',
            headers: {'token': Cookies.get('token'), 'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: profile
            })
        };
        fetch(config.APIURL+"/api/people/sendRequest", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const requestOptions = {
                method: 'GET',
                headers: {'token': Cookies.get('token')}
            }
            fetch(`http://localhost:4000/api/people/${userId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProfile(data.user);
                setRequestSent(data.requestSent);
                setIsFriend(data.isFriend);
            })
        })
    }

    function handleCancelRequest(e){
        const requestOptions = {
            method: 'POST',
            headers: {'token': Cookies.get('token'), 'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: profile
            })
        };
        fetch(config.APIURL+"/api/people/cancelRequest", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const requestOptions = {
                method: 'GET',
                headers: {'token': Cookies.get('token')}
            }
            fetch(`http://localhost:4000/api/people/${userId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProfile(data.user);
                setRequestSent(data.requestSent);
                setIncomingRequest(data.incomingRequest);
                setIsFriend(data.isFriend);
            })
        })
    }
    function handleRemoveRequest(e){
        const requestOptions = {
            method: 'POST',
            headers: {'token': Cookies.get('token'), 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: profile._id
            })
        };
        fetch(config.APIURL+"/api/people/removeRequest", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const requestOptions = {
                method: 'GET',
                headers: {'token': Cookies.get('token')}
            }
            fetch(`http://localhost:4000/api/people/${userId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("sdja",data);
                setProfile(data.user);
                setRequestSent(data.requestSent);
                setIncomingRequest(data.incomingRequest);
                setIsFriend(data.isFriend);
            })
        })
    }
    function handleAcceptRequest(e){
        const requestOptions = {
            method: 'POST',
            headers: {'token': Cookies.get('token'), 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: profile._id
            })
        };
        fetch(config.APIURL+"/api/people/acceptRequest", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const requestOptions = {
                method: 'GET',
                headers: {'token': Cookies.get('token')}
            }
            fetch(`http://localhost:4000/api/people/${userId}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("sdja",data);
                setProfile(data.user);
                setRequestSent(data.requestSent);
                setIncomingRequest(data.incomingRequest);
                setIsFriend(data.isFriend);
            })
        })
    }
    return (
        <UserContext.Consumer>
            {user => {
                return (
                    <div className="profile__container">
                        <img src={`${profile.img}`} className="profile__photo"/>           
                        <h2>{profile.firstName} {profile.lastName}</h2>
                        <p>{profile.username}</p>
                        <p className="bio">{profile.bio && profile.bio}</p>
                        <div className="profile__about">
                            <p>{profile.livesIn && (<div className="about__info"><HomeOutlined/> <p className="about__p">Lives in {profile.livesIn}</p></div>)}</p>
                            <p>{profile.from && (<div className="about__info"><Flight/> <p className="about__p">From {profile.from}</p></div>)}</p>
                        </div>
                        {isFriend ? (
                                <p>You guys are friends!</p>
                            ) :
                        incomingRequest ? (
                            <div className="req">
                                <button className="req__btn" onClick={handleAcceptRequest}>Accept</button>
                                <button className="req__btn" onClick={handleRemoveRequest}>Remove</button>
                            </div>
                        ):(
                            requestSent ? (
                                <div>
                                    <p>Request pending . . .</p>
                                    <button className="request__btn" onClick={handleCancelRequest}>Cancel Request</button>
                                </div>
                                
                            ):(
                                <button className="request__btn" onClick={handleSendRequest}>Send Request</button>
                            )
                        )}
                        {
                            posts.map(post => {
                                return (
                                    <Post userId={post.userId} caption={post.body} imgUrl={post.image}/>
                                )
                            })
                        }
                        {/* <p>Studies in {profile.education[0] && profile.education[0]}</p> */}
                    </div>
                )
            }}
        </UserContext.Consumer>
        
    )
}

export default OtherProfile
