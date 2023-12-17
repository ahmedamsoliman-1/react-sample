import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './Navbar';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      const authToken = response.data.token;
      setToken(authToken);
      localStorage.setItem('authToken', authToken); // Store token in localStorage
      fetchUserData(authToken);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const fetchUserData = async (authToken) => {
    try {
      const response = await axios.get('http://localhost:5000/data', {
        headers: {
          Authorization: authToken,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Fetch data error:', error);
    }
  };

  const handleLogout = () => {
    setToken('');
    setUserData(null);
    localStorage.removeItem('authToken'); // Remove token from localStorage on logout
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} loggedIn={!!token} />
      {!token ? (
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div className="user-profile-container">
          <div className="user-profile">
            <h2>Welcome, {userData && userData.username}</h2>
            <img src={userData && userData.image} alt="User" />
            <p>Sensitive Data: {userData && userData.sensitiveData}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
