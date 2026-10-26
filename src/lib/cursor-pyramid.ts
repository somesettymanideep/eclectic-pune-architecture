// Orthographic projection of a square-based pyramid, with directional lighting.
export function projectPyramid(turn: number, tilt: number) {
  const vertices: [number, number, number][] = [[0, -15, 0], [-11, 8, -11], [11, 8, -11], [11, 8, 11], [-11, 8, 11]];
  const transformed = vertices.map(([x, y, z]) => {
    const rx = x * Math.cos(turn) + z * Math.sin(turn);
    const rz = -x * Math.sin(turn) + z * Math.cos(turn);
    return { x: rx, y: y * Math.cos(tilt) - rz * Math.sin(tilt), z: y * Math.sin(tilt) + rz * Math.cos(tilt) };
  });
  return [[0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], [4, 3, 2, 1]].map((indices) => {
    const [a, b, c] = indices.map((i) => transformed[i]);
    if (!a || !b || !c) throw new Error("Invalid pyramid face");
    const u = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const v = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const normal = { x: u.y * v.z - u.z * v.y, y: u.z * v.x - u.x * v.z, z: u.x * v.y - u.y * v.x };
    const length = Math.hypot(normal.x, normal.y, normal.z);
    const light = (-normal.x * 0.4 - normal.y * 0.65 + normal.z * 0.64) / length;
    const face = indices.map((i) => transformed[i]).filter((point) => point !== undefined);
    return {
      points: face.map((point) => `${20 + point.x},${20 + point.y}`).join(" "),
      depth: face.reduce((sum, point) => sum + point.z, 0) / face.length,
      brightness: 0.65 + Math.max(0, light) * 0.85,
    };
  }).sort((a, b) => a.depth - b.depth);
}