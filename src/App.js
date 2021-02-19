import React, {useState} from 'react'
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
import Sidebar from './Components/Sidebar/Sidebar';
import { CookiesProvider } from 'react-cookie';

function App() {
  const [user, setUser] = useState({});
  return (
    <CookiesProvider>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Navbar/>
          <Sidebar/>
          <div>
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
          </div>

          <Footer/>
        </Router>
      </UserContext.Provider>
    </CookiesProvider>
    
  )
}

export default App
