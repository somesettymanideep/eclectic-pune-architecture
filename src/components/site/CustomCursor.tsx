import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Mode = "default" | "link" | "view";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceRefs = useRef<(SVGPathElement | null)[]>([]);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const px = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const py = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });
  const spinRaw = useMotionValue(0);
  const tiltRaw = useMotionValue(0);
  const spin = useSpring(spinRaw, { stiffness: 120, damping: 18 });
  const tilt = useSpring(tiltRaw, { stiffness: 160, damping: 20 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      setEnabled(query.matches);
      setVisible(false);
      document.documentElement.classList.remove("custom-cursor-active");
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let initialized = false;
    let lastX = 0;
    let baseSpin = 0;
    const hide = () => {
      setVisible(false);
      document.documentElement.classList.remove("custom-cursor-active");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") { hide(); return; }
      const cx = event.clientX, cy = event.clientY;
      if (!initialized) { px.jump(cx); py.jump(cy); lastX = cx; initialized = true; }
      const dx = cx - lastX;
      lastX = cx;
      baseSpin += dx * 0.6;
      spinRaw.set(baseSpin);
      tiltRaw.set(Math.max(-25, Math.min(25, dx * 1.5)));
      x.set(cx); y.set(cy);
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) { hide(); return; }
      if (target?.closest("a, button, [role='button'], label")) setMode("link");
      else if (target?.closest("[data-cursor='view']")) setMode("view");
      else setMode("default");
      setVisible(true);
      document.documentElement.classList.add("custom-cursor-active");
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);

    // Fading teal trail
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const pts: { x: number; y: number; t: number }[] = [];
    let raf = 0;
    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const LIFE = 220;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      tiltRaw.set(tiltRaw.get() * 0.9);
      drawPyramid(faceRefs.current, (spin.get() * Math.PI) / 180);
      if (!ctx || !canvas) return;
      const now = performance.now();
      const p = { x: px.get(), y: py.get(), t: now };
      const last = pts[pts.length - 1];
      if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 0.5) pts.push(p);
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (reducedMotion) return;
      for (let i = 1; i < pts.length; i++) {
        const a = 1 - (now - pts[i].t) / LIFE;
        ctx.strokeStyle = `rgba(56, 178, 172, ${a * 0.6})`;
        ctx.lineWidth = 1.5 * a + 0.3;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled, x, y, px, py, spinRaw, tiltRaw, spin, reducedMotion]);

  if (!enabled) return null;

  return createPortal(
    <div className="custom-cursor" aria-hidden="true" data-visible={visible}>
      <canvas ref={canvasRef} className="cursor-trail" />
      <motion.div className="cursor-follow" style={{ x: reducedMotion ? x : px, y: reducedMotion ? y : py }}>
        <motion.div
          className="cursor-pyramid-wrap"
          animate={{ scale: mode === "link" ? 1.35 : 1, rotate: mode === "link" ? 45 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
        >
          <motion.svg className="cursor-pyramid" width="22" height="20" viewBox="0 0 22 20" style={{ rotate: tilt }}>
            {[0, 1, 2, 3].map((i) => (
              <path key={i} ref={(el) => { faceRefs.current[i] = el; }} strokeWidth="0.6" strokeLinejoin="round" />
            ))}
          </motion.svg>
        </motion.div>
        <motion.span
          className="cursor-view-label"
          animate={{ opacity: mode === "view" ? 1 : 0, x: mode === "view" ? 0 : -6 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>
      <motion.div className="cursor-arrow" style={{ x, y }}>
        <svg width="16" height="20" viewBox="0 0 16 20">
          <path d="M1 1 L1 16 L5 12.5 L8 19 L10.5 18 L7.5 11.5 L13 11.5 Z" fill="var(--cursor-ink)" stroke="var(--media-background)" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>,
    document.body,
  );
}

const LIGHT = -0.6; // light from upper-left
function drawPyramid(faces: (SVGPathElement | null)[], angle: number) {
  const cx = 11, cy = 15, rx = 9, ry = 3.6;
  const apex = `11,1.5`;
  const corners = [0, 1, 2, 3].map((k) => {
    const a = angle + (k * Math.PI) / 2 + Math.PI / 4;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)] as const;
  });
  const order = [0, 1, 2, 3]
    .map((k) => ({ k, mid: angle + (k * Math.PI) / 2 + Math.PI / 2 }))
    .sort((a, b) => Math.sin(a.mid) - Math.sin(b.mid));
  order.forEach(({ k, mid }, idx) => {
    const el = faces[idx];
    if (!el) return;
    const facing = Math.sin(mid) > -0.05;
    const a = corners[k]!, b = corners[(k + 1) % 4]!;
    el.setAttribute("d", `M${apex} L${a[0].toFixed(2)},${a[1].toFixed(2)} L${b[0].toFixed(2)},${b[1].toFixed(2)} Z`);
    const lit = 0.5 + 0.5 * Math.cos(mid - Math.PI / 2 + LIGHT);
    const l = (0.3 + lit * 0.5).toFixed(3);
    el.setAttribute("fill", `oklch(${l} 0.09 192)`);
    el.setAttribute("stroke", "oklch(0.75 0.08 60)");
    el.style.opacity = facing ? "1" : "0";
  });
}
