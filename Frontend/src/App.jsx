import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/Register';
import axios from 'axios';
import Notfound from './Components/Notfound';

axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState("")

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/me", {
        withCredentials: true
      });

      setUser(res.data);

    } catch (err) {
      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <NavBar user={user}setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} />
        <Route path="/login" element={user?<Navigate to="/"/>:<Login setUser={setUser} />} />
        <Route path="/register" element={user?<Navigate to="/"/>:<Register setUser={setUser} />} />
        <Route path='*' element={<Notfound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;