import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const trailX = useSpring(x, { stiffness: 260, damping: 25, mass: 0.65 });
  const trailY = useSpring(y, { stiffness: 260, damping: 25, mass: 0.65 });

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
      document.documentElement.classList.remove("custom-cursor-active");
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") { hide(); return; }
      x.set(event.clientX);
      y.set(event.clientY);
      if (!initialized) {
        trailX.jump(event.clientX);
        trailY.jump(event.clientY);
        initialized = true;
      }
      const editable = event.target instanceof Element && event.target.closest("input, textarea, [contenteditable='true']");
      if (editable) { hide(); return; }
      setVisible(true);
      document.documentElement.classList.add("custom-cursor-active");
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled, x, y, trailX, trailY]);

  if (!enabled) return null;

  return createPortal(
    <div className="custom-cursor" aria-hidden="true" data-visible={visible}>
      <motion.div className="custom-cursor-point" style={{ x, y }} />
      <motion.div className="custom-cursor-position" style={{ x: reducedMotion ? x : trailX, y: reducedMotion ? y : trailY }}>
        <motion.div
          className="custom-cursor-crosshair"
          animate={{ scale: pressed ? 0.75 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.15 }}
        >
          <span className="cursor-arm cursor-arm-top" />
          <span className="cursor-arm cursor-arm-right" />
          <span className="cursor-arm cursor-arm-bottom" />
          <span className="cursor-arm cursor-arm-left" />
        </motion.div>
      </motion.div>
    </div>,
    document.body,
  );
}