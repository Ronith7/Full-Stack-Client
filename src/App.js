import './App.css';
import {BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import Homee from './pages/House';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import {AuthContext} from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [authState, setAuthState] = useState({username:"", id:0, status:false,});

  useEffect(()=>{
    if (localStorage.getItem('accessToken')) {
      axios.get('http://localhost:3001/auth/auth/', {
        headers:{
        accessToken: localStorage.getItem('accessToken'),
      },
    }).then((response)=>{
        if (response.data.error) {
          setAuthState({...authState, status: false});
        }else{
          setAuthState({username: response.data.username, id:response.data.id, status:true,});
        }
      })
      setAuthState(true);
    }
  },[]);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({username:"", id:0, status:false,});
  }

  return (<div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
      <div className="navbar">
          {!authState.status ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/resistration">Regsitration</Link>
            </>
          ) : (
            <>
            <Link to="/"> Home Page</Link>
            <Link to="/createapost"> Create A Post</Link>
            </>
          )}
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
        </div>
        <Routes>
          <Route path="/" element={<Homee/>} />
          <Route path="/createapost" element={<CreatePost/>} />
          <Route path="/post/:id" element={<Post/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/resistration" element={<Registration/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route path="/changepassword" element={<ChangePassword/>} />
          <Route path="*" element={<PageNotFound/>} />

        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>);
  }
  
  export default App;
  