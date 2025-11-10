import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SongCard from "../components/SongCard";
import SavedList from "../components/SavedList";
import SongModal from "../components/SongModal";
import MobileMenu from "../components/MobileMenu";
import Settings from "../components/Settings";
import ChangePassword from "../components/ChangePassword"; // 🌟 Import the ChangePassword component 🌟
import { Menu } from "lucide-react";

// Import song assets... (Unchanged)
import song1 from "../assets/images/song1.jpeg";
import song2 from "../assets/images/song2.jpeg";
import song3 from "../assets/images/song3.jpeg";
import song4 from "../assets/images/song4.jpeg";
import song5 from "../assets/images/song1.jpeg";
import song6 from "../assets/images/song2.jpeg";
import song7 from "../assets/images/song3.jpeg";

const HomePage = () => {
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState('home'); 
  
  const [selectedSong, setSelectedSong] = useState(null);
  const [favouriteSongs, setFavouriteSongs] = useState([]);
  const [savedSongs, setSavedSongs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Define the username here
  const mockUsername = "vaishu";

  const songs = [
    { image: song1, title: "Electric Pulse", artist: "DJ Sonic", video: "/src/assets/audio/song1.mp3"  },
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

  const handleLogout = () => {
      // Add clean-up logic here (e.g., clear tokens, clear context/Redux)
      navigate("/login"); 
  };

  const renderMainContent = () => {
      switch (currentPage) {
          case 'home':
              return (
                  <div className="pt-10">
                      <h1 className="text-3xl font-bold mb-6 text-white">Explore Songs</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-8 justify-items-center">
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
              );
          case 'settings':
          case 'my-profile':
              return (
                <div className="pt-10">
                    {/* The Settings component renders the profile view by default */}
                    <Settings /> 
                </div>
              );
          case 'change-password': // 🌟 Renders the dedicated password form 🌟
              return (
                <div className="pt-10">
                    {/* Pass mock user data for validation checks */}
                    <ChangePassword user={{ username: mockUsername, password: 'password123' }} /> 
                </div>
              );
          case 'favourites':
              return (
                  <div className="pt-10">
                      <h1 className="text-3xl font-bold mb-6 text-white">Your Favourites ❤️</h1>
                      {favouriteSongs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center">
                          {/* Display favourite songs grid here... */}
                        </div>
                      ) : (
                        <p className="text-xl text-white/70 mt-10">No favourite songs saved yet.</p>
                      )}
                  </div>
              );
          case 'saved':
              return (
                  <div className="pt-10">
                      <h1 className="text-3xl font-bold mb-6 text-white">Your Saved Videos 💾</h1>
                      {savedSongs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 justify-items-center">
                          {/* Display saved songs grid here... */}
                        </div>
                      ) : (
                        <p className="text-xl text-white/70 mt-10">No videos saved yet.</p>
                      )}
                  </div>
              );
          default:
              return null;
      }
  };


  return (
    <div className="relative flex h-screen w-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
      
      {/* 1. Left Sidebar (Fixed width w-60) */}
      <Sidebar 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          username={mockUsername} // Passed username here
      />

      {/* 2. Mobile Menu Button */}
      <button
        className="md:hidden absolute top-5 left-5 z-40 bg-white/20 p-2 rounded-lg backdrop-blur-md"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Slide Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* 3. Main Content (Margin fixed to match w-60 sidebar) */}
      <div 
          className={`flex-1 overflow-y-auto p-6 md:p-10 transition-all duration-300 ease-in-out`}
          style={{ marginLeft: '15rem' }} // Fixed margin-left for w-60 sidebar (60 * 4 = 240px = 15rem)
      >
        {renderMainContent()}
      </div>

      {/* Modal */}
      <SongModal song={selectedSong} onClose={() => setSelectedSong(null)} />
    </div>
  );
};

export default HomePage;