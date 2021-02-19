import React, { useContext, useState } from 'react'
//import { useCookies, withCookies, Cookies } from 'react-cookie';
import UserContext from '../../context/UserContext'
import Sidebar from '../Sidebar/Sidebar'
import './Profile.css';
import Cookies from 'js-cookie';

function Profile() {
    const [user, setUser] = useContext(UserContext);
    //const [cookies, getCookie, setCookie, removeCookie] = useCookies(['token']);
    const [img, setImg] = useState("");
    const [imgData, setImgData] = useState("");
    function readFileDataAsBase64(e) {
        const file = e.target.files[0];
    
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                resolve(event.target.result);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
    
            reader.readAsDataURL(file);
        });
    }
    async function handleChange(e){
        setImg(e.target.value);
        const data = await readFileDataAsBase64(e);
        setImgData(data);
        console.log(imgData);
    }
    function handleUpload(e){
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'token': Cookies.get('token'), 'Content-Type': 'application/json'},
            body: JSON.stringify({
                img: imgData
            })
        }
        fetch("http://localhost:4000/user/upload/profilePic", requestOptions)
        .then(response => response.json())
        .then(data => {
            fetch("http://localhost:4000/user/me", {
                method: "GET",
                headers: {'token': Cookies.get('token')},
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data);
            })
        })
    }
    return (
        <UserContext.Consumer>
            {user => {
                return (
                    <div className="profile__container">
                        <img src={`${user[0].img}`} className="profile__photo"/>
                        <input type="file" value={img} onChange={async (e) => await handleChange(e)} className="upload__area" required/>
                        <button className="upload__btn" onClick={handleUpload}>Upload</button>    
                        <p>{user[0].username}</p>
                        <p>Studies in {user[0].education[0] && user[0].education[0]}</p>
                    </div>
                )
            }}
        </UserContext.Consumer>
        
    )
}

export default Profile
