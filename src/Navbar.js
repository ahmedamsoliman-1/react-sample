import React from 'react';

function Navbar({ handleLogout, loggedIn }) {
  return (
    <nav className="navbar">
      <div className="brand">Your App Name</div>
      {loggedIn ? (
        <button className="log-btn" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="log-btn">Login</button>
      )}
    </nav>
  );
}

export default Navbar;
