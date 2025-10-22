// src/components/Studio.jsx - MODIFIED for Music Select & Dance Forms

import React, { useState } from 'react';
import '../styles/Studio.css'; 

function Studio({ username, onLogout }) {
    // State for managing character selection, music status, etc.
    const [selectedCharacter, setSelectedCharacter] = useState('girl');
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    
    // Data for new controls
    const danceForms = ['Kuchipudi', 'Western', 'Freestyle'];
    const [selectedForm, setSelectedForm] = useState(danceForms[0]);

    // Simulated list of 10 songs
    const songList = [
        "Song 1: Bollywood Beat", "Song 2: Classical Raga", "Song 3: Pop Anthem",
        "Song 4: Hip Hop Groove", "Song 5: EDM Power", "Song 6: Jazz Fusion",
        "Song 7: Folk Melody", "Song 8: Retro 80s", "Song 9: Acoustic Ballad",
        "Song 10: Urban Mix"
    ];
    const [selectedSong, setSelectedSong] = useState(songList[0]);

    // This is the core structure matching your Studio design:
    return (
        <div className="studio-main-container">
            
            {/* Studio Header is handled in App.jsx (Welcome, User, Logout) */}
            
            <div className="studio-content-grid">
                
                {/* 1. Video Player Area (Main Window) */}
                <div className="video-player-area">
                    <div className="video-screen-placeholder">
                        {/* Placeholder for 3D/2D animation */}
                        <div className="character-avatar-display">
                            {/* Simple visualization of the character */}
                            <div className={`character-model ${selectedCharacter}`}></div>
                            <p className="status">{selectedCharacter.toUpperCase()} | {selectedForm} | {isPlaying ? 'Playing' : 'Paused'}</p>
                        </div>
                    </div>
                    
                    {/* Controls below the player */}
                    <div className="player-status-controls">
                         <button onClick={() => setIsPlaying(!isPlaying)} className="play-pause-btn">
                            {isPlaying ? '⏸ Pause' : '▶ Play'}
                        </button>
                        <span className="speed-display">Playback Speed: {playbackSpeed.toFixed(1)}x</span>
                        <input 
                            type="range"
                            min="0.5"
                            max="2.0"
                            step="0.1"
                            value={playbackSpeed}
                            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                        />
                        <span className="speed-label">Normal</span>
                        <button className="download-btn">⬇ Download</button>
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


            {/* 3. Global Control Panel (Music/Dance Select, Character Select) */}
            <div className="control-panel">
                
                {/* Music Selection Controls (Replaces Upload Music) */}
                <div className="control-group music-group">
                    <label className="control-label">Select Music:</label>
                    <select 
                        value={selectedSong} 
                        onChange={(e) => setSelectedSong(e.target.value)} 
                        className="select-song-dropdown"
                    >
                        {songList.map(song => (
                            <option key={song} value={song}>{song}</option>
                        ))}
                    </select>
                </div>
                
                {/* Dance Form Selection Controls (Replaces Use Microphone) */}
                <div className="control-group dance-group">
                    <label className="control-label">Select Dance Form:</label>
                    {danceForms.map(form => (
                        <button 
                            key={form}
                            className={`btn-toggle btn-style ${selectedForm === form ? 'active' : ''}`}
                            onClick={() => setSelectedForm(form)}
                        >
                            {form}
                        </button>
                    ))}
                </div>

                {/* Character Selection */}
                <div className="control-group character-group">
                    <label className="control-label">Character Type:</label>
                    <button 
                        className={`btn-toggle ${selectedCharacter === 'girl' ? 'active-girl' : ''}`}
                        onClick={() => setSelectedCharacter('girl')}
                    >
                        Girl
                    </button>
                    <button 
                        className={`btn-toggle ${selectedCharacter === 'boy' ? 'active-boy' : ''}`}
                        onClick={() => setSelectedCharacter('boy')}
                    >
                        Boy
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Studio;