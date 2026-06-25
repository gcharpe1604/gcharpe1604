import React, { useRef, useState, useEffect, Children } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useSound } from '../../hooks/useSound';

export function Magnetic({ children, intensity = 0.5 }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const playSound = useSound();

  const springConfig = { stiffness: 600, damping: 20, mass: 0.1 };
  
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (isHovered) {
      const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        
        // Calculate distance from center of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Apply intensity to the movement
        const moveX = (e.clientX - centerX) * intensity;
        const moveY = (e.clientY - centerY) * intensity;

        x.set(moveX);
        y.set(moveY);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    } else {
      // Reset position when not hovered
      x.set(0);
      y.set(0);
    }
  }, [isHovered, intensity, x, y]);

  // Ensure children is a single element
  const child = Children.only(children);

  return React.cloneElement(child, {
    ref,
    onMouseEnter: (e) => {
      setIsHovered(true);
      playSound('hover');
      if (child.props.onMouseEnter) child.props.onMouseEnter(e);
    },
    onMouseLeave: (e) => {
      setIsHovered(false);
      if (child.props.onMouseLeave) child.props.onMouseLeave(e);
    },
    onClick: (e) => {
      playSound('click');
      if (child.props.onClick) child.props.onClick(e);
    },
    style: {
      ...child.props.style,
      x,
      y,
    }
  });
}
