import React from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-white/30 dark:bg-black/40 p-2 rounded-full text-white hover:scale-105 transition"
      title="Toggle Theme"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
