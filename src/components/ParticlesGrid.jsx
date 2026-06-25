import { useEffect, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesGrid() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile or touch
    const checkMobile = () => window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(checkMobile());
  }, []);

  if (isMobile) return null;

  return (
    <ParticlesProvider init={async (engine) => {
      await loadSlim(engine);
    }}>
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#3b82f6", // tailwind blue-500
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.05,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.8,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.15,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
      />
    </ParticlesProvider>
  );
}
