import React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

export function MagicCard({
  children,
  className,
  gradientSize = 250,
  gradientColor = "rgba(37,99,235,0.15)", // Premium blue glow matching the theme
  gradientOpacity = 1,
  ...props
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  // 3D Tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    // Gradient follow
    mouseX.set(mX);
    mouseY.set(mY);

    // 3D Tilt
    const width = rect.width;
    const height = rect.height;
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative flex h-full w-full overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]",
        className
      )}
      {...props}
    >
      <div className="relative z-10 w-full" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
      
      {/* Interactive hover glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
          `,
          opacity: gradientOpacity,
        }}
      />
      {/* Subtle border glow that follows mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ring-1 ring-inset ring-blue-500/20"
        style={{
          maskImage: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, black, transparent 100%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, black, transparent 100%)`,
        }}
      />
    </motion.div>
  );
}
