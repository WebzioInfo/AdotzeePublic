import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState, useMemo } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
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
                    },
                },
                particles: {
                    color: { value: "#1277ee" },
                    links: {
                        color: "#4A90E2",
                        distance: 120,
                        enable: true,
                        opacity: 0.3,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1.2,
                        outModes: "out",
                    },
                    number: {
                        value: 90,
                        density: { enable: true, area: 1000 },
                    },
                    opacity: { value: 0.6 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 3 } },
                },
                detectRetina: true,
            }) as const,
        []
    );

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0 w-full h-full"
            options={options}
        />
    );
};

export default ParticlesBackground;