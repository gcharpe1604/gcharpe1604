import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.15],
      markerColor: [0.1, 0.8, 1], // Cyan-blue markers
      glowColor: [0.05, 0.1, 0.2],
      markers: [
        // Coordinates for SF, London, Tokyo, etc (mock contributor locations)
        { location: [37.7595, -122.4367], size: 0.08 },
        { location: [40.7128, -74.006], size: 0.05 },
        { location: [51.5072, -0.1276], size: 0.07 },
        { location: [35.6762, 139.6503], size: 0.09 },
        { location: [19.076, 72.8777], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 600, aspectRatio: 1, margin: "auto", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", contain: "layout paint size", opacity: 0 }}
        className="transition-opacity duration-1000 ease-in-out"
        onAnimationEnd={(e) => (e.target.style.opacity = 1)}
        onLoad={(e) => (e.target.style.opacity = 1)}
      />
      {/* Quick fade-in effect to avoid flash of blank canvas */}
      <div className="absolute inset-0 pointer-events-none rounded-full" 
           style={{ background: 'radial-gradient(circle at center, transparent 40%, var(--bg-base) 70%)'}} />
    </div>
  );
}
