// src/components/Studio.jsx - FINAL UX REFINEMENT (Single Play/Pause Button)

import React, { useState } from 'react';
import '../styles/Studio.css'; 

function Studio({ username, onLogout }) {
    // --- State Management: User Selections (Temporary vs. Applied) ---
    const [tempCharacter, setTempCharacter] = useState('girl');
    const [tempForm, setTempForm] = useState('Kuchipudi');
    const [tempSong, setTempSong] = useState('Select Song');

    const [selectedCharacter, setSelectedCharacter] = useState('girl');
    const [selectedForm, setSelectedForm] = useState('Kuchipudi');
    const [selectedSong, setSelectedSong] = useState('Select Song');
    
    // --- Playback State ---
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    
    // --- Data ---
    const danceForms = ['Kuchipudi', 'Western', 'Freestyle'];
    const songList = [
        "Select Song", "Bollywood Beat", "Classical Raga", "Pop Anthem",
        "Hip Hop Groove", "EDM Power", "Jazz Fusion", "Folk Melody", 
        "Retro 80s", "Acoustic Ballad", "Urban Mix"
    ];

    // --- Handlers ---
    const togglePlayPause = () => {
        setIsPlaying(prev => !prev); // Toggles state between true/false
    };

    const applySettings = () => {
        if (tempSong === "Select Song") {
            alert("Please select a song before applying settings.");
            return;
        }
        setSelectedCharacter(tempCharacter);
        setSelectedForm(tempForm);
        setSelectedSong(tempSong);
        setIsPlaying(false); // Reset/Pause playback when applying new settings
    };

    // --- Component Structure ---
    return (
        <div className="studio-main-container">
            
            <div className="studio-content-grid">
                
                {/* 1. Animation Viewport & Controls Area */}
                <div className="video-player-area">
                    
                    {/* The Animation Viewport (Main Screen) */}
                    <div className="animation-viewport">
                        <div className="character-avatar-display">
                            {/* Renders the specific character model */}
                            <div className={`character-model ${selectedCharacter}`}>
                                {selectedCharacter === 'girl' ? '💃 Girl Model' : '🕺 Boy Model'}
                            </div>
                            <div className="viewport-status">
                                <span className="status-item">
                                    {selectedCharacter === 'girl' ? '♀ GIRL' : '♂ BOY'}
                                </span>
                                <span className="status-item">|</span>
                                <span className="status-item">
                                    {isPlaying ? '▶ Playing' : '⏸ Paused'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Control Panel: Grouped Sequential Controls */}
                    <div className="sequential-control-panel">
                        
                        {/* 1. Music Selection */}
                        <div className="control-group-row">
                            <label className="control-label-title">1. Select Music</label>
                            <select 
                                value={tempSong} 
                                onChange={(e) => setTempSong(e.target.value)} 
                                className="selector-item select-music"
                            >
                                {songList.map((song, index) => (
                                    <option key={index} value={song} disabled={index === 0}>
                                        {song}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* 2. Dance Form Selection */}
                        <div className="control-group-row">
                            <label className="control-label-title">2. Select Dance Form</label>
                            <div className="dance-form-buttons">
                                {danceForms.map((form) => (
                                    <button 
                                        key={form}
                                        className={`btn-toggle ${tempForm === form ? 'active-form' : ''}`}
                                        onClick={() => setTempForm(form)}
                                    >
                                        {form}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Character Selection */}
                        <div className="control-group-row">
                            <label className="control-label-title">3. Select Character</label>
                            <div className="character-buttons">
                                <button 
                                    className={`btn-toggle ${tempCharacter === 'girl' ? 'active-girl' : ''}`}
                                    onClick={() => setTempCharacter('girl')}
                                >
                                    ♀ Girl
                                </button>
                                <button 
                                    className={`btn-toggle ${tempCharacter === 'boy' ? 'active-boy' : ''}`}
                                    onClick={() => setTempCharacter('boy')}
                                >
                                    ♂ Boy
                                </button>
                            </div>
                        </div>

                        {/* 4. Apply Button (To commit all changes) */}
                        <button onClick={applySettings} className="btn-apply-settings">
                            APPLY SETTINGS
                        </button>
                    </div>


                    {/* Final Playback and Save Controls */}
                    <div className="playback-control-panel">
                        
                        {/* Play / Pause Toggle Button */}
                        <button 
                            onClick={togglePlayPause} 
                            className="play-pause-toggle-icon"
                            title={isPlaying ? "Pause" : "Play"} /* Tooltip */
                        >
                            {isPlaying ? '⏸' : '▶'}
                        </button>
                        
                        {/* Playback Speed Slider */}
                        <div className="speed-group">
                            <label className="speed-label">Play Speed ({playbackSpeed.toFixed(1)}x)</label>
                            <input 
                                type="range"
                                min="0.5"
                                max="2.0"
                                step="0.1"
                                value={playbackSpeed}
                                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                                className="playback-slider"
                            />
                        </div>
                        
                        {/* Save Dance Button */}
                        <button className="save-dance-btn">
                            💾 Save Dance
                        </button>
                    </div>

                </div>

                
                {/* 2. Sidebar (Saved Dances) */}
                <div className="saved-dances-sidebar">
                    <h3>Saved Dances</h3>
                    <div className="saved-list">
                        <p>No saved dances yet</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Studio;