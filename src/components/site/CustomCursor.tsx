import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { projectPyramid } from "@/lib/cursor-pyramid";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [view, setView] = useState(false);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const trailX = useSpring(x, { stiffness: 520, damping: 34, mass: 0.45 });
  const trailY = useSpring(y, { stiffness: 520, damping: 34, mass: 0.45 });
  const turn = useMotionValue(0.6);
  const tilt = useMotionValue(0.42);
  const smoothTurn = useSpring(turn, { stiffness: 180, damping: 24 });
  const smoothTilt = useSpring(tilt, { stiffness: 180, damping: 24 });
  const pyramid = useRef<SVGSVGElement>(null);
  const trail = useRef<SVGSVGElement>(null);
  const history = useRef<{ x: number; y: number; time: number }[]>([]);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  useAnimationFrame((time) => {
    if (!enabled || !visible) { history.current = []; return; }
    const faces = projectPyramid(reducedMotion ? 0.6 : smoothTurn.get(), reducedMotion ? 0.42 : smoothTilt.get());
    pyramid.current?.querySelectorAll("polygon").forEach((face, index) => {
      face.setAttribute("points", faces[index].points);
      face.style.filter = `brightness(${faces[index].brightness})`;
    });
    if (reducedMotion) return;
    const px = trailX.get() + 18;
    const py = trailY.get() + 22;
    const previous = history.current.at(-1);
    if (!previous || Math.hypot(px - previous.x, py - previous.y) > 1) {
      history.current.push({ x: px, y: py, time });
    }
    history.current = history.current.filter((point) => time - point.time < 150).slice(-12);
    const points = history.current;
    trail.current?.querySelectorAll("path").forEach((path, index) => {
      const a = points[index];
      const b = points[index + 1];
      path.setAttribute("d", a && b ? `M${a.x},${a.y} L${b.x},${b.y}` : "");
      path.style.opacity = a ? String(0.45 * Math.max(0, 1 - (time - a.time) / 150)) : "0";
    });
  });

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
    const hide = () => {
      setVisible(false);
      setPressed(false);
      lastPointer.current = null;
      history.current = [];
      document.documentElement.classList.remove("custom-cursor-active");
    };
    const inspectTarget = (target: Element | null) => {
      const editable = target?.closest("input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox']");
      if (editable || !target) { hide(); return; }
      setInteractive(Boolean(target.closest("a, button, [role='button']")));
      setView(Boolean(target.closest("[data-cursor-view]")));
      setVisible(true);
      document.documentElement.classList.add("custom-cursor-active");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") { hide(); return; }
      const previous = lastPointer.current;
      if (previous) {
        turn.set(0.6 + Math.max(-0.4, Math.min(0.4, (event.clientX - previous.x) * 0.018)));
        tilt.set(0.42 + Math.max(-0.2, Math.min(0.2, (event.clientY - previous.y) * 0.012)));
      }
      lastPointer.current = { x: event.clientX, y: event.clientY };
      x.set(event.clientX);
      y.set(event.clientY);
      if (!initialized) {
        trailX.jump(event.clientX);
        trailY.jump(event.clientY);
        initialized = true;
      }
      inspectTarget(document.elementFromPoint(event.clientX, event.clientY));
    };
    const scroll = () => {
      if (lastPointer.current) inspectTarget(document.elementFromPoint(x.get(), y.get()));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled, x, y, trailX, trailY, turn, tilt]);

  if (!enabled) return null;

  return createPortal(
    <div className="custom-cursor" aria-hidden="true" data-visible={visible} data-view={view} data-interactive={interactive}>
      {!reducedMotion && <svg ref={trail} className="custom-cursor-trail">{Array.from({ length: 11 }, (_, i) => <path key={i} />)}</svg>}
      <motion.div className="custom-cursor-arrow" style={{ x, y }}>
        <svg width="14" height="20" viewBox="0 0 14 20"><path d="M0.7 0.7 12 11.5 6.8 11.6 9.6 17.8 6.8 19 4.1 12.7 0.7 16Z" /></svg>
      </motion.div>
      <motion.div className="custom-cursor-position" style={{ x: reducedMotion ? x : trailX, y: reducedMotion ? y : trailY }}>
        <motion.div
          className="custom-cursor-pyramid"
          animate={{ scale: pressed ? 0.9 : interactive ? 1.14 : 1, rotate: interactive ? 12 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}
        >
          <svg ref={pyramid} width="40" height="40" viewBox="0 0 40 40">{projectPyramid(0.6, 0.42).map((face, i) => <polygon key={i} points={face.points} />)}</svg>
        </motion.div>
        <span className="custom-cursor-view">View</span>
      </motion.div>
    </div>,
    document.body,
  );
}