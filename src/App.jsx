// src/App.jsx - COMPLETE & MODIFIED
import React, { useState } from 'react';
import AuthForm from './components/AuthForm'; 
import './styles/App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [username, setUsername] = useState(''); 

  const handleLoginSuccess = (userIdentifier) => {
    setIsLoggedIn(true);
    setUsername(userIdentifier); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  }

  // --- Studio Header Component ---
  const Header = () => (
    <header className="studio-header">
      <div className="header-content">
        <span className="welcome-text">Welcome, {username}!</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );

  return (
    <div className="app-container">
      {/* Show header only when logged in (on the Studio page) */}
      {isLoggedIn && <Header />} 
      
      {!isLoggedIn ? (
        // Show the login/signup form
        <AuthForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        // Show the Studio Placeholder content
        <div className="studio-placeholder">
          <h1>Welcome to the BeatFlow Studio! 🎉</h1>
          <p>Start creating your dances for {username}.</p>
        </div>
      )}
    </div>
  )
}

export default App