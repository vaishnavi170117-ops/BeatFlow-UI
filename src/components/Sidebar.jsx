import React, { useState } from "react";
// Lucide Icons for the new structure
import { Home, Settings, Heart, Save, LogOut, User, Lock } from "lucide-react"; 

// Navigation item configuration
const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'favourites', icon: Heart, label: 'Favourites' },
  { id: 'saved', icon: Save, label: 'Saved' },
];

const Sidebar = ({ currentPage, onNavigate, onLogout, username }) => { 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleNavigation = (id) => {
    onNavigate(id);
    if (id === 'settings') {
      setIsSettingsOpen(!isSettingsOpen);
    } else if (id !== 'my-profile' && id !== 'change-password') {
      setIsSettingsOpen(false);
    }
  };

  return (
    <div 
      className={`bg-white/10 text-white w-60 min-h-screen p-6 flex flex-col gap-6 backdrop-blur-lg fixed z-30`}
    >
      {/* 1. Logo Section (BeatFlow & Welcome Message) */}
      <div className="flex flex-col items-center p-1 mb-4 overflow-hidden">
        <div className="flex items-center w-full justify-start mb-2"> {/* Align logo/text left */}
            {/* 🌟 Logo Icon: Force to white 🌟 */}
            <div className="text-3xl text-white mr-2 min-w-[30px] flex items-center justify-center">
                {'💃'} 
            </div>
            {/* 🌟 BeatFlow Name: Force to white 🌟 */}
            <h2 className={`text-2xl font-bold whitespace-nowrap text-white`}>
              BeatFlow 
            </h2>
        </div>

        {/* 🌟 MODIFIED: Now shows only "Welcome!" 🌟 */}
        {username && (
            <p className="text-white text-sm mt-1 w-full text-left pl-1">
                **Welcome!**
            </p>
        )}
      </div>

      {/* 2. Navigation Links */}
      <ul className="flex flex-col gap-2 text-lg flex-1">
        {navItems.map((item) => (
          <React.Fragment key={item.id}>
            <li 
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer whitespace-nowrap
                          ${currentPage === item.id || (item.id === 'settings' && (currentPage === 'my-profile' || currentPage === 'change-password')) ? 'bg-white/30 text-white shadow-lg font-semibold' : 'hover:bg-white/20'}`}
              onClick={() => handleNavigation(item.id)}
            >
              {React.createElement(item.icon, { size: 20 })} 
              <span>{item.label}</span>
            </li>
            
            {/* Settings Submenu (Only visible when open) */}
            {item.id === 'settings' && isSettingsOpen && (
                <ul className="pl-6 text-sm flex flex-col gap-1 overflow-hidden">
                    <li 
                        className={`flex items-center gap-3 p-1 rounded-lg cursor-pointer ${currentPage === 'my-profile' ? 'font-bold' : 'hover:bg-white/10'}`}
                        onClick={(e) => { e.stopPropagation(); onNavigate('my-profile'); }}
                    >
                        <User size={16} /> My Profile
                    </li>
                    <li 
                        className={`flex items-center gap-3 p-1 rounded-lg cursor-pointer ${currentPage === 'change-password' ? 'font-bold' : 'hover:bg-white/10'}`}
                        onClick={(e) => { e.stopPropagation(); onNavigate('change-password'); }}
                    >
                        <Lock size={16} /> Change Password
                    </li>
                </ul>
            )}
          </React.Fragment>
        ))}
      </ul>

      {/* 3. Logout Button (Pinned to Bottom) */}
      <div className="mt-auto">
        <li 
          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer bg-red-600/70 hover:bg-red-500 transition-all duration-200 font-semibold"
          onClick={onLogout}
        >
          <LogOut size={20} /> 
          <span>Logout</span>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;