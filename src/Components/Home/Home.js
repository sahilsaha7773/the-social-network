import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import UserContext from '../../context/UserContext';
import Post from '../Post/Post'
import Sidebar from '../Sidebar/Sidebar'
import Stories from '../Stories/Stories';
import './Home.css';
import Cookies from 'js-cookie';

function Home() {
    //const [user, setUser] = useContext(UserContext);
    const [feed, setFeed] = useState([]);
    const [img, setImg] = useState("");
    const [body, setBody] = useState("");
    const [imgdata, setImgdata] = useState("");
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
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {'token': Cookies.get('token')}
        }
        fetch("http://localhost:4000/post/getFeed", requestOptions)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setFeed(data);
        }); 
    }, []);
    async function handleChange(e, name) {
        if(name==='body'){
            setBody(e.target.value);
        }
        else if(name==='img'){
            setImg(e.target.value);
            const data = await readFileDataAsBase64(e);
            setImgdata(data);
        }
    } 
    function handlePost(e){
        e.preventDefault();
        console.log(body);
        const requestOptions = {
            method: 'POST',
            headers: {'token': Cookies.get('token'), 'Content-Type': 'application/json'},
            body: JSON.stringify({
                body: body,
                image: imgdata
            }) 
        }
        fetch("http://localhost:4000/post/createPost", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const requestOptions2 = {
                method: 'GET',
                headers: {'token': Cookies.get('token')}
            }
            fetch("http://localhost:4000/post/getFeed", requestOptions2)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                setFeed(data);
            }); 
        })
    }  
    return (
        <UserContext.Consumer>
            {
                user => {
                    console.log("User", user[0]);
                    return (
                        <div className="home__container">
                            <div style={{maxWidth:"700px", margin:"auto"}}>
                                <h2>Create a Post</h2>
                                <textarea value={body} onChange={(e) => handleChange(e, "body")} style={{backgroundColor: 'black', width:"100%", padding:"20px", margin:"20px 0", color:"rgb(21, 218, 21)"}} rows={7} type="text" placeholder="Write something"/>
                                <div style={{display:"flex", alignItems: 'center'}}>
                                    <input type="file" value={img} style={{margin: "0 20px 0 0"}} onChange={async (e) => await handleChange(e, "img")} className="upload__area" required/>
                                    <button style={{padding:"0 15px", height:"50px", width:"100px"}} onClick={handlePost}>Post</button>
                                </div>
                            </div>
                            <div className="posts">
                                {
                                    feed.map(post => {
                                        return (
                                            <Post userId={post.userId} caption={post.body} imgUrl={post.image}/>
                                        )
                                    })
                                }
                                {/* <Post author={{username: "theUnknownGuy", profilePhoto: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-512.png"}} 
                                    caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor sem turpis, vel facilisis odio rhoncus et. Ut sed tempus tortor, eget mollis ex. Sed iaculis vestibulum ex, eu tristique neque tincidunt nec. Vestibulum lorem urna, vehicula ac nisi quis,"
                                    imgUrl="https://image.freepik.com/free-vector/cute-astronaut-hand-shake-with-alien-cartoon-icon-illustration-space-icon-concept-isolated-premium-flat-cartoon-style_138676-1562.jpg"/>
                                
                                <Post author={{username: "theUnknownGuy", profilePhoto: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-512.png"}} 
                                    caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor sem turpis, vel facilisis odio rhoncus et. Ut sed tempus tortor, eget mollis ex. Sed iaculis vestibulum ex, eu tristique neque tincidunt nec. Vestibulum lorem urna, vehicula ac nisi quis,"
                                    imgUrl="https://image.freepik.com/free-vector/cute-astronaut-hand-shake-with-alien-cartoon-icon-illustration-space-icon-concept-isolated-premium-flat-cartoon-style_138676-1562.jpg"/> */}
                            </div>
                            
                            <Stories/>
                        </div>
                    )
                }
            }
        </UserContext.Consumer>
            
        
    )
}

export default Home
