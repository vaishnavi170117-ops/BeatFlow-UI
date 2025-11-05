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
  // Prevent bubbling of button clicks (so modal doesn’t open)
  const handleIconClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <div
      className="bg-white/20 rounded-2xl p-4 w-56 cursor-pointer 
                 hover:scale-105 transition-all duration-300 
                 backdrop-blur-md shadow-lg hover:shadow-2xl"
      onClick={onClick}
    >
      {/* Song Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="rounded-xl w-full h-40 object-cover"
        />
      </div>

      {/* Song Info */}
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
                ? "bg-pink-600 hover:bg-pink-700"
                : "bg-white/40 hover:bg-white/70"
            }`}
          >
            <Heart
              size={16}
              className={`${isFav ? "fill-red-500 text-red-500" : "fill-transparent"}`}
            />
          </button>

          <button
            onClick={(e) => handleIconClick(e, onSave)}
            className={`p-1.5 rounded-full transition-all duration-300 ${
              isSaved
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-white/40 hover:bg-white/70"
            }`}
          >
            <Bookmark
              size={16}
              className={`${isSaved ? "fill-white" : "fill-transparent"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
