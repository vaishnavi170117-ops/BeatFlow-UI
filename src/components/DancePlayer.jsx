import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { ArrowLeft } from "lucide-react";
import { getNextMove } from "../utils/danceMapper"; // ✅ added

// ✅ Subcomponent for the 3D dancer
function DancerFBX({ url, mixerRef, isPlaying, currentTime, selectedStyle }) {
  const group = useRef();
  const currentAction = useRef(null);

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load(
      url,
      (fbx) => {
        fbx.scale.set(0.015, 0.015, 0.015);

        const box = new THREE.Box3().setFromObject(fbx);
        const center = new THREE.Vector3();
        box.getCenter(center);
        fbx.position.sub(center);
        fbx.position.y -= box.min.y * 0.5;

        group.current.add(fbx);

        mixerRef.current = new THREE.AnimationMixer(fbx);
         
        if (fbx.animations && fbx.animations.length > 0) {
          const action = mixerRef.current.clipAction(fbx.animations[0]);
          action.play();
          currentAction.current = action;
        }
      },
      undefined,
      (err) => console.error("FBX load error:", err)
    );
  }, [url]);

  // ✅ Main animation loop
  useFrame((state, delta) => {
    if (!mixerRef.current) return;

    if (isPlaying) {
      mixerRef.current.update(delta);

      // ✅ Check if there's a move to trigger
      const move = getNextMove(selectedStyle, state.clock.elapsedTime);
      if (move && currentAction.current?.name !== move) {
        const newAction = mixerRef.current.clipAction(move);
        if (newAction) {
          currentAction.current?.fadeOut(0.2);
          newAction.reset().fadeIn(0.2).play();
          currentAction.current = newAction;
        }
      }
    } else {
      mixerRef.current.setTime(currentTime);
    }
  });

  return <group ref={group} />;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function DancePlayer({ modelUrl, audioUrl, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState("classical"); // ✅ added

  const mixerRef = useRef();
  const audioRef = useRef();

  // ✅ Initialize audio
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.currentTime = 0;
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

    audio.play();
    setIsPlaying(true);

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [audioUrl]);

  // ✅ Sync play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play();
    else audio.pause();
  }, [isPlaying]);

  // ✅ Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying)
        setCurrentTime(audioRef.current.currentTime);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying((p) => !p);

  const forward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration,
        audioRef.current.currentTime + 10
      );
      setCurrentTime(audioRef.current.currentTime);
      mixerRef.current?.setTime(audioRef.current.currentTime);
    }
  };

  const backward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10
      );
      setCurrentTime(audioRef.current.currentTime);
      mixerRef.current?.setTime(audioRef.current.currentTime);
    }
  };

  const handleScrub = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) audioRef.current.currentTime = time;
    mixerRef.current?.setTime(time);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
      {/* ✅ Back button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => {
            audioRef.current.pause();
            onClose();
          }}
          className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* ✅ Style selector */}
      <div className="absolute top-4 right-4 flex gap-2 z-50">
        {["classical", "western", "freestyle"].map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`px-3 py-1 rounded-md text-white text-sm ${
              selectedStyle === style
                ? "bg-blue-500"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="flex-1">
        <Canvas camera={{ position: [0, 1.5, 5], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <DancerFBX
            url={modelUrl}
            mixerRef={mixerRef}
            isPlaying={isPlaying}
            currentTime={currentTime}
            selectedStyle={selectedStyle} // ✅ pass to dancer
          />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* ✅ Controls */}
      <div className="flex flex-col gap-2 p-4 bg-white/10 border-t border-white/20 pointer-events-auto">
        <div className="flex justify-between text-white text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={currentTime}
          onChange={handleScrub}
          className="w-full pointer-events-auto"
        />

        <div className="flex justify-center items-center gap-6 pointer-events-auto">
          <button onClick={backward} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30">
            ⏪ Backward
          </button>
          <button onClick={togglePlay} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30">
            {isPlaying ? "⏸ Pause" : "▶️ Play"}
          </button>
          <button onClick={forward} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30">
            ⏩ Forward
          </button>
        </div>
      </div>
    </div>
  );
}
