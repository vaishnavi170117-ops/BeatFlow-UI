import React from "react";

const SavedList = ({ title, songs }) => {
  return (
    <div className="bg-white/10 rounded-2xl p-5 text-white backdrop-blur-lg shadow-md">
      <h2 className="text-lg font-bold mb-4 border-b border-white/40 pb-2">{title}</h2>
      <div className="flex flex-col gap-3">
        {songs.length === 0 ? (
          <p className="text-sm opacity-70">No songs yet</p>
        ) : (
          songs.map((s, i) => (
            <div key={i} className="flex items-center gap-3 hover:bg-white/20 rounded-xl p-2 transition-all">
              <img src={s.image} alt={s.title} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs opacity-75">{s.artist}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedList;
