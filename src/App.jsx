// src/App.jsx - COMPLETE & FINAL

import React, { useState } from 'react';
import AuthForm from './components/AuthForm'; 
import WelcomeScreen from './components/WelcomeScreen'; 
import Studio from './components/Studio'; 
import './styles/App.css'; 

function App() {
  const [showWelcome, setShowWelcome] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [username, setUsername] = useState(''); 

  // Handlers for navigation
  const handleStart = () => {
      setShowWelcome(false); 
  }

  const handleLoginSuccess = (userIdentifier) => {
    setIsLoggedIn(true);
    setUsername(userIdentifier); 
    setShowWelcome(false); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setShowWelcome(true);
  }

  // --- Studio Header Component (Top Left Logo/Username, Top Right Logout) ---
  const Header = () => (
    <header className="studio-header">
      <div className="header-content">
          {/* LEFT SIDE: Consolidated Branding Block */}
          <div className="header-branding">
              <div className="logo-title-group">
                  {/* Logo and App Name on one line */}
                  <h1 className="header-logo">💃 BeatFlow</h1> 
              </div>
              {/* Username below App Name in small letters */}
              <span className="header-username">Welcome, {username}!</span>
          </div>

          {/* RIGHT SIDE: Logout Button */}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );

  // --- Conditional Rendering Logic ---
  let content;
  if (showWelcome) {
      content = <WelcomeScreen onStart={handleStart} />;
  } else if (isLoggedIn) {
      content = <Studio username={username} onLogout={handleLogout} />;
  } else {
      content = <AuthForm onLoginSuccess={handleLoginSuccess} />;
  }


  return (
    <div className="app-container">
      {/* Show header only when logged in (on the Studio page) */}
      {isLoggedIn && <Header />} 
      
      {content}
    </div>
  )
}

export default App