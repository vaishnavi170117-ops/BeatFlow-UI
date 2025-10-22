// src/App.jsx - COMPLETE & MODIFIED for Welcome Screen

import React, { useState } from 'react';
import AuthForm from './components/AuthForm'; 
import WelcomeScreen from './components/WelcomeScreen'; // New Import
import './styles/App.css'; 

function App() {
  const [showWelcome, setShowWelcome] = useState(true); // New state for Welcome screen
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [username, setUsername] = useState(''); 

  // Handlers for navigation
  const handleStart = () => {
      setShowWelcome(false); // Move to AuthForm
  }

  const handleLoginSuccess = (userIdentifier) => {
    setIsLoggedIn(true);
    setUsername(userIdentifier); 
    setShowWelcome(false); // Should already be false, but ensures transition
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setShowWelcome(true); // Optional: Send user back to the Welcome Screen on logout
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

  // --- Conditional Rendering Logic ---
  let content;
  if (showWelcome) {
      content = <WelcomeScreen onStart={handleStart} />;
  } else if (isLoggedIn) {
      content = (
        // Show the Studio Placeholder content
        <div className="studio-placeholder">
          <h1>Welcome to the BeatFlow Studio! 🎉</h1>
          <p>Start creating your dances for {username}.</p>
        </div>
      );
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