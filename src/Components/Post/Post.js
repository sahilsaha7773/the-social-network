import { Comment, Share, ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react'
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import './Post.css';
import config from '../../config';

function Post({userId, caption, imgUrl}) {
    const [profile, setProfile] = useState({});
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
        })
    }, []);
    return (
        <div className="post__container">
            <div className="post__content">
                <div className="post__header">
                    <img src={profile.img} className="post__dp"/>
                    <Link to={`/people/${userId}`}>
                        <p className="post__para">{profile.username}</p>
                    </Link>
                </div>
                <div className="post__body">
                    <p className="post__caption post__para">{caption}</p>
                    <div className="post__imageContainer">
                        <img src={imgUrl} style={{maxWidth:"100%"}} className="post__image"/>
                    </div>
                </div>
                <div className="post__actions">
                    <div className="post__actionContainer">
                        <ThumbUpAltOutlined className="post__actionbtn"/>Like
                    </div>
                    <div className="post__actionContainer">
                        <Comment className="post__actionbtn"/>Comment
                    </div>
                    <div className="post__actionContainer">
                        <Share className="post__actionbtn"/>Share
                    </div>
                </div>  
            </div>
             
        </div>
    )
}

export default Post
