// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import DancePlayer from "./components/DancePlayer"; // ✅ new import

function App() {
  return (
    <Router>
      <Routes>
        {/* Your existing pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />

        {/* ✅ New route for the 3D Dance Visualizer */}
        <Route
          path="/visualizer"
          element={
            <DancePlayer
              modelUrl="/src/assets/models/dancer.fbx"
              audioUrl="/src/assets/audio/cheapthrills.mp3"
              style="classical" // you can make this dynamic later
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
