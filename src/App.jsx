<<<<<<< HEAD
// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your components
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import DancePlayer from "./components/DancePlayer";
import AuthForm from "./components/AuthForm"; // ✅ CORRECTED IMPORT PATH

function App() {
  return (
    <Router>
      <Routes>

        {/* 1. WELCOME / GET STARTED PAGE (Root Path) */}
        {/* Links to /login upon clicking 'Get Started' */}
        <Route path="/" element={<LandingPage />} />
        
        {/* 2. LOGIN ROUTE */}
        <Route path="/login" element={<AuthForm isLogin={true} />} />

        {/* 3. SIGN UP ROUTE */}
        <Route path="/signup" element={<AuthForm isLogin={false} />} />

        {/* 4. INSIDE PAGE (Post-Login Destination) */}
        {/* AuthForm navigates to this page upon successful login/signup */}
        <Route path="/home" element={<HomePage />} />
        
        {/* 5. Dance Visualizer Page (Existing Feature) */}
        <Route
          path="/visualizer"
          element={
            <DancePlayer
              modelUrl="/src/assets/models/character.fbx"
              anim2Url="/src/assets/models/anim2.fbx"
              audioUrl="/src/assets/audio/song1.mp3"
              style="western"
            />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
=======
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
>>>>>>> 0cb2dbfddffe6a42d4ff74cfa445b33e26614e73
