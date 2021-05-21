import React, { useContext, useEffect, useState } from 'react'
//import { useCookies, withCookies, Cookies } from 'react-cookie';
import UserContext from '../../../context/UserContext'
import './EditProfile.css';
import Cookies from 'js-cookie';
import { Flight, HomeOutlined } from '@material-ui/icons';
import config from '../../../config';

function Profile() {
    const [user, setUser] = useContext(UserContext);
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [bio, setBio] = useState(user.bio);
    const [livesIn, setLivesIn] = useState(user.livesIn);
    const [from, setFrom] = useState(user.from);
    // useEffect(() => {
    //     console.log(user);
    //     setUsername(user[0]?.username);
    //     setLastName(user[0]?.lastName);
    //     setFirstName(user[0]?.firstName);
    //     setBio(user[0]?.bio);
    // }, [user])
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
    function handleSave(e){
        e.preventDefault();
        //console.log(firstName, );
        const requestOptions = {
            method: 'POST',
            headers: {'token': Cookies.get('token'), 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                bio: bio,
                livesIn: livesIn,
                from: from,
            })
        }
        fetch(config.APIURL+"/user/update", requestOptions)
        .then(response => response.json())
        .then(data => {
            fetch(config.APIURL+"/user/me", {
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
        fetch(config.APIURL+"/user/upload/profilePic", requestOptions)
        .then(response => response.json())
        .then(data => {
            fetch(config.APIURL+"/user/me", {
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

                        
                        <h2>{user[0].firstName} {user[0].lastName}</h2>
                        <p>{user[0].username}</p>
                        <form className="profile__form">
                            <textarea rows={2} onChange={(e) => setBio(e.target.value)} value={bio} placeholder={user[0].bio ? user[0].bio : "Write something about yourself..."} className="bio__field"/>
                            <div className="about__info">
                                <HomeOutlined className="about__icon"/>
                                <input className="edit__field" type="text" value={livesIn} placeholder={user[0].livesIn ? user[0].livesIn : "You live in"} onChange={(e) => setLivesIn(e.target.value)}/>  
                            </div>
                            <div className="about__info">
                                <Flight className="about__icon"/>
                                <input className="edit__field" type="text" value={from} placeholder={user[0].from ? user[0].from : "You are from"} onChange={(e) => setFrom(e.target.value)}/>  
                            </div>
                            <button className="save__btn" onClick={handleSave}>Save</button>
                        </form>
                        <input type="file" value={img} onChange={async (e) => await handleChange(e)} className="upload__area" required/>
                        <button className="upload__btn" onClick={handleUpload}>Upload</button> 
                        {/* <p>Studies in {user[0].education[0] && user[0].education[0]}</p> */}
                    </div>
                )
            }}
        </UserContext.Consumer>
        
    )
}

export default Profile
