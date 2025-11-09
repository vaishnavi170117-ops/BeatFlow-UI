// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import DancePlayer from "./components/DancePlayer";

function App() {
  return (
    <Router>
      <Routes>

        {/* Existing pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />

        {/* ✅ Western Visualizer Page */}
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
