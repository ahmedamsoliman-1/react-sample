// ActiveSessions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ActiveSessions() {
  const [activeSessions, setActiveSessions] = useState([]);

  useEffect(() => {
    const fetchActiveSessions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/active-sessions');
        setActiveSessions(response.data.activeSessions);
      } catch (error) {
        console.error('Fetch active sessions error:', error);
      }
    };

    fetchActiveSessions();
  }, []);

  return (
    <div className="active-sessions-container">
      <h2>Active Sessions</h2>
      <div>
        <p>Total: {activeSessions.length}</p>
        {activeSessions.map((session) => (
          <p key={session.id}>
            Session ID: {session.id} - Username: {session.userId}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ActiveSessions;
