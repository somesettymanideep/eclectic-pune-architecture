// Orthographic projection of a square-based pyramid, with directional lighting.
export function projectPyramid(turn: number, tilt: number) {
  const vertices = [[0, -15, 0], [-11, 8, -11], [11, 8, -11], [11, 8, 11], [-11, 8, 11]];
  const transformed = vertices.map(([x, y, z]) => {
    const rx = x * Math.cos(turn) + z * Math.sin(turn);
    const rz = -x * Math.sin(turn) + z * Math.cos(turn);
    return [rx, y * Math.cos(tilt) - rz * Math.sin(tilt), y * Math.sin(tilt) + rz * Math.cos(tilt)];
  });
  return [[0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], [4, 3, 2, 1]].map((indices) => {
    const [a, b, c] = indices.map((i) => transformed[i]);
    const u = b.map((v, i) => v - a[i]);
    const v = c.map((n, i) => n - a[i]);
    const normal = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    const length = Math.hypot(...normal);
    const light = (-normal[0] * 0.4 - normal[1] * 0.65 + normal[2] * 0.64) / length;
    return {
      points: indices.map((i) => `${20 + transformed[i][0]},${20 + transformed[i][1]}`).join(" "),
      depth: indices.reduce((sum, i) => sum + transformed[i][2], 0) / indices.length,
      brightness: 0.65 + Math.max(0, light) * 0.85,
    };
  }).sort((a, b) => a.depth - b.depth);
}