// src/components/WelcomeScreen.jsx

import React from 'react';
import '../styles/AuthForm.css'; // Reusing AuthForm styles for branding

function WelcomeScreen({ onStart }) {
    return (
        <div className="welcome-container auth-page-container">
            
            {/* Logo and Primary Tagline (Reusing logo-section styles) */}
            <div className="logo-section">
                <h1>💃 BeatFlow</h1> 
                <p className="tagline-primary">Select a song and let BeatFlow groove in Kuchipudi, Western, or Freestyle.</p>
            </div>
            
            {/* Start Now Button */}
            <button 
                onClick={onStart}
                className="start-now-button"
            >
                Start Now
            </button>

            {/* Optional: Placeholder for the feature cards, styled separately for the welcome screen */}
            {/* If you want to show the 3 feature cards here, you can add them back in a separate section */}
            
        </div>
    );
}

export default WelcomeScreen;