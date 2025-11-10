import React, { useState } from "react";

// Mock user data (Replace with actual state/context/Redux)
const mockUser = {
  username: "vaishu",
  email: "vaishu.user@beatflow.com",
};

const Settings = ({ user = mockUser }) => {
  // State to manage the active sub-view (My Profile or Change Password)
  const [isEditing, setIsEditing] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(user.username);
  const [currentEmail, setCurrentEmail] = useState(user.email);

  // NOTE: The main view switching (My Profile vs Change Password) is now managed by the parent (HomePage/Dashboard). 
  // This component will only render the relevant content based on the prop passed from the parent.

  const handleSave = () => {
    // 💡 Add API/Context update logic here for username/email
    console.log(`Updating user: ${currentUsername}, ${currentEmail}`);
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-10 bg-white/10 rounded-xl shadow-2xl backdrop-blur-md">
      <h1 className="text-3xl font-bold mb-6 text-white">My Profile</h1>

      <div className="max-w-md mx-auto space-y-4">
        {/* Username Field */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-purple-200">Username</label>
          {isEditing ? (
            <input
              type="text"
              value={currentUsername}
              onChange={(e) => setCurrentUsername(e.target.value)}
              className="p-3 rounded-lg bg-white/20 border border-purple-400 text-white focus:outline-none"
            />
          ) : (
            <p className="p-3 text-lg bg-white/10 rounded-lg border border-transparent">{currentUsername}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 text-purple-200">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              className="p-3 rounded-lg bg-white/20 border border-purple-400 text-white focus:outline-none"
            />
          ) : (
            <p className="p-3 text-lg bg-white/10 rounded-lg border border-transparent">{currentEmail}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4">
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-green-500 font-semibold rounded-xl shadow-lg hover:bg-green-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  // Reset fields to original if canceled
                  setCurrentUsername(user.username);
                  setCurrentEmail(user.email);
                }}
                className="flex-1 px-6 py-3 bg-red-500/80 font-semibold rounded-xl shadow-lg hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-6 py-3 bg-purple-500 font-semibold rounded-xl shadow-lg hover:bg-purple-600 transition duration-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;