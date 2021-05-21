import React, {useState, useEffect} from 'react'
import Login from './Components/Login/Login'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import UserContext from './context/UserContext';
import Profile from './Components/Profile/Profile';
import EditProfile from './Components/Profile/EditProfile/EditProfile';
import OtherProfile from './Components/Profile/OtherProfile/OtherProfile';
import Sidebar from './Components/Sidebar/Sidebar';
import PeopleComp from './Components/People/People';
import { CookiesProvider } from 'react-cookie';
import Cookies from 'js-cookie';
import { People } from '@material-ui/icons';
import Requests from './Components/Requests/Requests';
//import config from 'dotenv';
import config from './config';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    if(!user._id){  
      const token = Cookies.get('token');
      fetch(config.APIURL+"/user/me", {
          method: "GET",
          headers: {'token': token},
      })
      .then(response => response.json())
      .then(data => {
          setUser(data);
      })
      .catch(err => console.log(err))
    }
  }, []);
  return (
    <CookiesProvider>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Navbar/>
          <div className="main">
            <Sidebar/>
            <div className="main__content">
              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}

                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register/>
                </Route>
                <Route path="/profile">
                  <Profile/>
                </Route>
                <Route exact path="/people">
                  <PeopleComp/>
                </Route>
                <Route path="/editProfile">
                  <EditProfile/>
                </Route>
                <Route path="/people/:userId">
                  <OtherProfile/>
                </Route>
                <Route path="/friendRequests">
                  <Requests/>
                </Route>
            </div>
          </div>
          

          <Footer/>
        </Router>
      </UserContext.Provider>
    </CookiesProvider>
    
  )
}

export default App
