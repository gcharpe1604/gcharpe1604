import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

  // Exact position for the core logic
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth position for the magnetic box
  const springConfig = { damping: 25, stiffness: 600, mass: 0.1 }; // Snappier spring for instant magnetic locking
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const width = useSpring(12, springConfig);
  const height = useSpring(12, springConfig);
  const borderRadius = useSpring(12, springConfig);

  const targetRef = useRef(null);

  // Polyline physics state
  const svgRef = useRef(null);
  const polylineRef = useRef(null);
  const points = useRef(Array(12).fill({ x: -100, y: -100 }));
  const exactMouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (isTouch) return;

    // Force hide default cursor globally
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const updateIdleCursor = () => {
      width.set(12);
      height.set(12);
      borderRadius.set(12);
      mouseX.set(exactMouse.current.x - 6);
      mouseY.set(exactMouse.current.y - 6);
    };

    const handleMouseMove = (e) => {
      exactMouse.current = { x: e.clientX, y: e.clientY };
      const target = e.target.closest("[data-cursor='true']");
      targetRef.current = target;
      setIsHovering(!!target);
      
      if (!target) {
        updateIdleCursor();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const render = () => {
      // 1. Update polyline physics
      let px = exactMouse.current.x;
      let py = exactMouse.current.y;

      points.current = points.current.map((p, index) => {
        if (index === 0) return { x: px, y: py };
        const prev = points.current[index - 1];
        const dx = prev.x - p.x;
        const dy = prev.y - p.y;
        const ease = 0.45 - (index * 0.03); 
        return { x: p.x + dx * ease, y: p.y + dy * ease };
      });

      if (polylineRef.current) {
        const pointString = points.current.map(p => `${p.x},${p.y}`).join(" ");
        polylineRef.current.setAttribute("points", pointString);
      }

      // 2. Continuously update magnetic box if hovering (catches spring animations perfectly)
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        width.set(rect.width);
        height.set(rect.height);
        
        const computedStyle = window.getComputedStyle(targetRef.current);
        const targetRadius = computedStyle.borderRadius;
        borderRadius.set(parseFloat(targetRadius) || 0);
        
        mouseX.set(rect.left);
        mouseY.set(rect.top);
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.head.removeChild(style);
    };
  }, [width, height, borderRadius, mouseX, mouseY, isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* 1. Fluid Trailing SVG Ribbon */}
      <svg
        ref={svgRef}
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-[9997]"
        style={{ opacity: isHovering ? 0 : 1, transition: "opacity 0.2s ease" }}
      >
        <polyline
          ref={polylineRef}
          fill="none"
          stroke="rgba(59, 130, 246, 0.4)" // Blue tail
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* 2. Magnetic Inverted Box */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width,
          height,
          borderRadius,
        }}
      />

      {/* 3. Reticle (Sniper targeting effect) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          width,
          height,
          opacity: isHovering ? 0 : 1,
        }}
      >
        <motion.div 
          className="relative w-8 h-8 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          <div className="absolute top-0 w-[1px] h-[5px] bg-blue-400" />
          <div className="absolute bottom-0 w-[1px] h-[5px] bg-blue-400" />
          <div className="absolute left-0 w-[5px] h-[1px] bg-blue-400" />
          <div className="absolute right-0 w-[5px] h-[1px] bg-blue-400" />
        </motion.div>
      </motion.div>

      {/* 4. Core tracking dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] bg-white rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          width: 4,
          height: 4,
          marginLeft: 4,
          marginTop: 4,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
