// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import your components
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import DancePlayer from "./components/DancePlayer";
import AuthForm from "./components/AuthForm"; // ✅ CORRECTED IMPORT PATH

function App() {
  return (
    <Router>
      <Routes>

        {/* 1. WELCOME / GET STARTED PAGE (Root Path) */}
        {/* Links to /login upon clicking 'Get Started' */}
        <Route path="/" element={<LandingPage />} />
        
        {/* 2. LOGIN ROUTE */}
        <Route path="/login" element={<AuthForm isLogin={true} />} />

        {/* 3. SIGN UP ROUTE */}
        <Route path="/signup" element={<AuthForm isLogin={false} />} />

        {/* 4. INSIDE PAGE (Post-Login Destination) */}
        {/* AuthForm navigates to this page upon successful login/signup */}
        <Route path="/home" element={<HomePage />} />
        
        {/* 5. Dance Visualizer Page (Existing Feature) */}
        <Route
          path="/visualizer"
          element={
            <DancePlayer
              modelUrl="/src/assets/models/character.fbx"
              anim2Url="/src/assets/models/anim2.fbx"
              audioUrl="/src/assets/audio/song1.mp3"
              style="western"
            />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;