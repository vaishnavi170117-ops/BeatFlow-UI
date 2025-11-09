import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useFBX, useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { useEffect, useRef } from "react";

function Dancer() {

  const { scene, animations } = useGLTF("/character.fbx");
  const anim2 = useFBX("/anim2.fbx");

  const mixer = new THREE.AnimationMixer(scene);

  const a1 = mixer.clipAction(animations[0]);
  const a2 = mixer.clipAction(anim2.animations[0]);

  const audioRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    a1.play(); // start main animation

    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("/song1.mp3", function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(1);
      sound.play();
    });

    audioRef.current = sound;

    const analyser = new THREE.AudioAnalyser(sound, 32);
    analyserRef.current = analyser;
  }, []);

  useFrame((_, delta) => {
    mixer.update(delta);

    if (analyserRef.current) {
      const level = analyserRef.current.getAverageFrequency();
      if (level > 150) { 
        a1.stop();
        a2.reset().play();
      } else {
        a2.stop();
        a1.reset().play();
      }
    }
  });

  return <primitive object={scene} scale={0.02} position={[0,-1,0]} />;
}

export default function DancePlayer() {
  return (
    <Canvas>
      <ambientLight />
      <PerspectiveCamera makeDefault position={[3,2,5]} />
      <OrbitControls />
      <Dancer />
    </Canvas>
  );
}
