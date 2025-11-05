import React, { useState } from "react";
import { X } from "lucide-react";
import DancePlayer from "./DancePlayer";

const SongModal = ({ song, onClose }) => {
  const [selectedDance, setSelectedDance] = useState(null);
  const savedTime = parseFloat(localStorage.getItem("danceTime") || "0");

  if (!song) return null;

  const danceForms = [
    {
      name: "Classical",
      modelUrl: "/src/assets/models/dance1.fbx",
      audioUrl: "/src/assets/audio/song1.mp3",
    },
    {
      name: "Western",
      modelUrl: "/src/assets/models/dance1.fbx",
      audioUrl: "/src/assets/audio/song1.mp3",
    },
    {
      name: "Freestyle",
      modelUrl: "/src/assets/models/dance1.fbx",
      audioUrl: "/src/assets/audio/song1.mp3",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      {!selectedDance ? (
        <div
          className="relative bg-white/10 text-white w-3/4 max-w-3xl rounded-2xl p-8 shadow-2xl backdrop-blur-2xl border border-white/30 flex"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>

          {/* LEFT HALF: Profile */}
          <div className="w-1/2 flex flex-col items-center justify-center gap-4 border-r border-white/20 pr-6">
            <img
              src={song.image}
              alt={song.title}
              className="w-56 h-56 rounded-xl object-cover shadow-lg"
            />
            <div className="text-center">
              <h2 className="text-3xl font-bold">{song.title}</h2>
              <p className="text-xl opacity-80">{song.artist}</p>
            </div>
          </div>

          {/* RIGHT HALF: Buttons */}
          <div className="w-1/2 flex flex-col items-center justify-center gap-4 pl-6">
            <h3 className="text-xl font-semibold mb-2">Choose Dance Form 💃</h3>
            {danceForms.map((dance) => (
              <button
                key={dance.name}
                onClick={() => setSelectedDance(dance)}
                className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg text-lg w-3/4 text-center transition"
              >
                {dance.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <DancePlayer
          songName={song.title}
          danceForm={selectedDance.name.toLowerCase()}
          modelUrl={selectedDance.modelUrl}
          audioUrl={selectedDance.audioUrl}
          savedTime={savedTime}
          onClose={() => setSelectedDance(null)}
        />
      )}
    </div>
  );
};

export default SongModal;
