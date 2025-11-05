// src/components/styleRules.js

export const styleRules = {
  classical: (model, beat, t) => {
    // Graceful and fluid
    model.rotation.y = Math.sin(t * 2) * 0.3 * beat.intensity;
    model.position.y = Math.abs(Math.sin(t * 3)) * 0.15 * beat.intensity;
    model.rotation.x = Math.sin(t) * 0.1;
  },

  western: (model, beat, t) => {
    // Energetic and bouncy
    model.rotation.x = Math.sin(t * 4) * 0.5 * beat.intensity;
    model.rotation.z = Math.cos(t * 2) * 0.3 * beat.intensity;
    model.position.y = Math.abs(Math.sin(t * 8)) * 0.2 * beat.intensity;
  },

  free: (model, beat, t) => {
    // Wild and random
    model.rotation.x += Math.sin(t * 3) * 0.01 * beat.intensity;
    model.rotation.y += Math.cos(t * 2) * 0.02 * beat.intensity;
    model.position.x = Math.sin(t * 5) * 0.15 * beat.intensity;
    model.position.y = Math.cos(t * 6) * 0.1 * beat.intensity;
  },
};
export function getClosestBeat(beats, currentTime) {
  if (!beats || beats.length === 0) return null;
  return beats.reduce((prev, curr) =>
    Math.abs(curr.time - currentTime) < Math.abs(prev.time - currentTime)
      ? curr
      : prev
  );
}