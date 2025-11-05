import beats from "../assets/data/beats/global_beats.json";
import classical from "../assets/data/dance_maps/classical_map.json";
import western from "../assets/data/dance_maps/western_map.json";
import freestyle from "../assets/data/dance_maps/freestyle_map.json";

const danceFiles = { classical, western, freestyle };

// Get the next dance move based on current time
export function getNextMove(style, currentTime) {
  const styleData = danceFiles[style];
  if (!styleData || !styleData.mappings) return null;

  const move = styleData.mappings.find(
    b => Math.abs(b.time - currentTime) < 0.25 // within ±0.25s
  );

  return move ? move.move : null;
}
// src/utils/beatUtils.js
export function getClosestBeat(beats, currentTime) {
  if (!beats || beats.length === 0) return null;
  return beats.reduce((prev, curr) =>
    Math.abs(curr.time - currentTime) < Math.abs(prev.time - currentTime)
      ? curr
      : prev
  );
}


export { beats };
