import React from "react";
import { Home, Music, User, Heart, Save } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-white/10 text-white w-60 min-h-screen p-6 flex flex-col gap-6 backdrop-blur-lg">
      <h2 className="text-2xl font-bold mb-4">🎵 MyMusic</h2>
      <ul className="flex flex-col gap-4 text-lg">
        <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer">
          <Home size={20} /> Home
        </li>
        <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer">
          <Music size={20} /> Albums
        </li>
        <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer">
          <User size={20} /> Artists
        </li>
        <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer">
          <Heart size={20} /> Favourites
        </li>
        <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer">
          <Save size={20} /> Saved
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
