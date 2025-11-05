import React from "react";
import { X, Home, Music, User } from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-0 left-0 bg-white/15 text-white w-64 h-full p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">🎵 MyMusic</h2>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>
        <ul className="flex flex-col gap-5 text-lg">
          <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer">
            <Home size={20} /> Home
          </li>
          <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer">
            <Music size={20} /> Albums
          </li>
          <li className="flex items-center gap-3 hover:bg-white/20 p-2 rounded-lg cursor-pointer">
            <User size={20} /> Artists
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
