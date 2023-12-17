import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/data', {
        headers: {
          Authorization: token,
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
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  return (
    <div className="App">
      {!token ? (
        <div>
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
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <p>Logged in as: {userData && userData.username}</p>
          <p>Sensitive Data: {userData && userData.sensitiveData}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
