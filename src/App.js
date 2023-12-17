import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



// const Backend_URL = 'http://192.168.0.175:5000';
// const Backend_URL = 'http://localhost:5000';


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
      const authToken = response.data.token;
      setToken(authToken);
      localStorage.setItem('authToken', authToken); // Store token in localStorage
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
