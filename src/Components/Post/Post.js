import { Comment, Share, ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons';
import React from 'react'
import './Post.css';

function Post({author, caption, imgUrl}) {
    return (
        <div className="post__container">
            <div className="post__content">
                <div className="post__header">
                    <img src={author.profilePhoto} className="post__dp"/>
                    <p className="post__para">{author.username}</p>
                </div>
                <div className="post__body">
                    <p className="post__caption post__para">{caption}</p>
                    <div className="post__imageContainer">
                        <img src={imgUrl} className="post__image"/>
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
