// src/components/WesternDancePage.jsx
import React, { useRef, useState } from "react";
import DancePlayer from "./DancePlayer";
import song1 from "../assets/audio/song1.mp3";

export default function WesternDancePage() {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  // called on user click to comply with autoplay policies
  function handleStart() {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    // begin playback (returns a Promise)
    audioEl.play()
      .then(() => {
        setStarted(true);
      })
      .catch((err) => {
        console.warn("Audio play blocked:", err);
      });
  }

  return (
    <div>
      {/* Hidden audio element - keep controls for debugging if you want */}
      <audio ref={audioRef} src={song1} crossOrigin="anonymous" />

      {/* Play button (required for AudioContext resume in some browsers) */}
      {!started && (
        <div style={{ position: "absolute", zIndex: 10, left: 20, top: 20 }}>
          <button onClick={handleStart} style={{ padding: "10px 20px", fontSize: 16 }}>
            Play Western Song & Start Dance
          </button>
        </div>
      )}

      {/* Pass audio element and startAudio callback */}
      <DancePlayer
        audioElement={audioRef.current}
        startAudio={() => {
          // Ensure AudioContext is created inside DancePlayer when user clicked
          // (we simply signal by having started flag)
          try {
            audioRef.current && audioRef.current.play();
          } catch (e) { /* ignore */ }
        }}
      />
    </div>
  );
}
