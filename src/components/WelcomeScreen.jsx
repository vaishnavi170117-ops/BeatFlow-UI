// src/components/WelcomeScreen.jsx
import React from 'react';
import '../styles/AuthForm.css'; // Reusing AuthForm styles for branding

function WelcomeScreen({ onStart }) {
    return (
        <div className="welcome-container auth-page-container">
            
            {/* Logo, WELCOME, and Caption */}
            <div className="logo-section">
                
                {/* 1. Logo (BeatFlow) */}
                <h1>💃 BeatFlow</h1> 
                
                {/* 2. WELCOME (Styled text immediately after logo) */}
                <p className="welcome-text-intro below-logo">WELCOME</p>

                {/* 3. Primary Tagline for Welcome Screen (Caption) */}
                <p className="tagline-primary">Select a song and let BeatFlow groove in Kuchipudi, Western, or Freestyle.</p>
            </div>
            
            {/* Start Now Button */}
            <button 
                onClick={onStart}
                className="start-now-button"
            >
                Start Now
            </button>
            
        </div>
    );
}

export default WelcomeScreen;