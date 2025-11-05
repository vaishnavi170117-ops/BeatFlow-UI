import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SongCard from "../components/SongCard";
import SavedList from "../components/SavedList";
import SongModal from "../components/SongModal";
import MobileMenu from "../components/MobileMenu";
import { Menu } from "lucide-react";

import song1 from "../assets/images/song1.jpeg";
import song2 from "../assets/images/song2.jpeg";
import song3 from "../assets/images/song3.jpeg";
import song4 from "../assets/images/song4.jpeg";
import song5 from "../assets/images/song1.jpeg";
import song6 from "../assets/images/song2.jpeg";
import song7 from "../assets/images/song3.jpeg";

const HomePage = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const songs = [
    { image: song1, title: "Electric Pulse", artist: "DJ Sonic", video: "/src/assets/audio/song1.mp3"  },
    { image: song2, title: "Dream Waves", artist: "Ava Sky", video: "/src/assets/audio/song1.mp3" },
    { image: song3, title: "Neon Nights", artist: "Rave Boy", video: "/src/assets/audio/song1.mp3" },
    { image: song4, title: "Moon Dance", artist: "Clara V", video: "/src/assets/audio/song1.mp3" },
    { image: song5, title: "Beat Rush", artist: "DJ Flex", video: "/src/assets/audio/song1.mp3" },
    { image: song6, title: "Calm Lights", artist: "Soft Tune", video: "/src/assets/audio/song1.mp3" },
    { image: song7, title: "Future Flow", artist: "Lunar Synth" , video: "/src/assets/audio/song1.mp3"},
  ];

  const toggleSave = (song, type) => {
    if (type === "save") {
      setSavedSongs((prev) =>
        prev.find((s) => s.title === song.title)
          ? prev.filter((s) => s.title !== song.title)
          : [...prev, song]
      );
    } else if (type === "fav") {
      setFavouriteSongs((prev) =>
        prev.find((s) => s.title === song.title)
          ? prev.filter((s) => s.title !== song.title)
          : [...prev, song]
      );
    }
  };

  return (
    <div className="relative flex h-screen w-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-5 left-5 z-40 bg-white/20 p-2 rounded-lg backdrop-blur-md"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Slide Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6">Explore Songs</h1>

        {/* Song Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {songs.map((song, i) => (
            <SongCard
              key={i}
              {...song}
              onClick={() => setSelectedSong(song)}
              onSave={() => toggleSave(song, "save")}
              onFav={() => toggleSave(song, "fav")}
              isSaved={savedSongs.some((s) => s.title === song.title)}
              isFav={favouriteSongs.some((s) => s.title === song.title)}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:flex w-80 p-6 flex-col gap-6 backdrop-blur-xl bg-white/10 border-l border-white/20 overflow-y-auto">
        {favouriteSongs.length > 0 && (
          <SavedList title="❤️ Favourite Songs" songs={favouriteSongs} />
        )}
        {savedSongs.length > 0 && (
          <SavedList title="💾 Saved Songs" songs={savedSongs} />
        )}
        {favouriteSongs.length === 0 && savedSongs.length === 0 && (
          <p className="text-sm opacity-80 text-center mt-15">
            No songs saved yet 🎶
          </p>
        )}
      </div>

      {/* Modal */}
      <SongModal song={selectedSong} onClose={() => setSelectedSong(null)} />
    </div>
  );
};

export default HomePage;
