import React from 'react'
import Post from '../Post/Post'
import Sidebar from '../Sidebar/Sidebar'
import Stories from '../Stories/Stories';
import './Home.css';

function Home() {
    return (
        <div className="home__container">
            <Sidebar/>
            <div className="posts">
                <Post author={{username: "theUnknownGuy", profilePhoto: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-512.png"}} 
                    caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor sem turpis, vel facilisis odio rhoncus et. Ut sed tempus tortor, eget mollis ex. Sed iaculis vestibulum ex, eu tristique neque tincidunt nec. Vestibulum lorem urna, vehicula ac nisi quis,"
                    imgUrl="https://image.freepik.com/free-vector/cute-astronaut-hand-shake-with-alien-cartoon-icon-illustration-space-icon-concept-isolated-premium-flat-cartoon-style_138676-1562.jpg"/>
                
                <Post author={{username: "theUnknownGuy", profilePhoto: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-512.png"}} 
                    caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porttitor sem turpis, vel facilisis odio rhoncus et. Ut sed tempus tortor, eget mollis ex. Sed iaculis vestibulum ex, eu tristique neque tincidunt nec. Vestibulum lorem urna, vehicula ac nisi quis,"
                    imgUrl="https://image.freepik.com/free-vector/cute-astronaut-hand-shake-with-alien-cartoon-icon-illustration-space-icon-concept-isolated-premium-flat-cartoon-style_138676-1562.jpg"/>
            </div>
            
            <Stories/>
        </div>
    )
}

export default Home
