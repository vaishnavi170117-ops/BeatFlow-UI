import React from "react";
import { Heart, Bookmark } from "lucide-react";

const SongCard = ({
  image,
  title,
  artist,
  onClick,
  onSave,
  onFav,
  isSaved,
  isFav,
}) => {
  const handleIconClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  // Define the vibrant fuchsia color for active icons
  const ACTIVE_ICON_COLOR_CLASS = "fill-fuchsia-700 text-fuchsia-700";
  // Define a light background color for active buttons
  const ACTIVE_BG_CLASS = "bg-fuchsia-200 hover:bg-fuchsia-300";


  return (
    <div
      className="bg-white/20 rounded-2xl p-4 w-56 cursor-pointer 
                 hover:scale-105 transition-all duration-300 
                 backdrop-blur-md shadow-lg hover:shadow-2xl"
      onClick={onClick}
    >
      {/* Song Image (Unchanged) */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="rounded-xl w-full h-40 object-cover"
        />
      </div>

      {/* Song Info (Unchanged) */}
      <div className="flex justify-between items-center mt-3">
        <div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-200">{artist}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => handleIconClick(e, onFav)}
            className={`p-1.5 rounded-full transition-all duration-300 ${
              isFav
                // 🌟 FIX: Use light background when active 🌟
                ? ACTIVE_BG_CLASS
                : "bg-white/70 hover:bg-white/90"
            }`}
          >
            <Heart
              size={16}
              // 🌟 FIX: Use fuchsia icon color when active 🌟
              className={`${isFav ? ACTIVE_ICON_COLOR_CLASS : "fill-transparent text-gray-800"}`}
            />
          </button>

          <button
            onClick={(e) => handleIconClick(e, onSave)}
            className={`p-1.5 rounded-full transition-all duration-300 ${
              isSaved
                // 🌟 FIX: Use light background when active 🌟
                ? ACTIVE_BG_CLASS 
                : "bg-white/70 hover:bg-white/90"
            }`}
          >
            <Bookmark
              size={16}
              // 🌟 FIX: Use fuchsia icon color when active 🌟
              className={`${isSaved ? ACTIVE_ICON_COLOR_CLASS : "fill-transparent text-gray-800"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;