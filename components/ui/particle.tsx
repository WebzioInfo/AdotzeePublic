import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useMemo } from "react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(
    () =>
      ({
        fullScreen: { enable: false, zIndex: -1 },
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 120, links: { opacity: 0.5 } },
            push: { quantity: 2 },
            repulse: { distance: 200 },
          },
        },
        particles: {
          color: { value: "#0A1550" },
          links: {
            color: "#2563EB",
            distance: 120,
            enable: true,
            opacity: 0.3,
            width: 1.1,
          },
          move: {
            enable: true,
            speed: 1.5,
            outModes: "out", // ✅ must be literal
          },
          number: { value: 150, density: { enable: true, area: 1000 } },
          opacity: { value: 0.7 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }) as const,
    []
  );


  return (
    <Particles
      id="tsparticles"
      className="h-full"
      key="particles-background"
      options={options}
    />
  );
};

export default ParticlesBackground;
