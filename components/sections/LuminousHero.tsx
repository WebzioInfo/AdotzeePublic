"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Button } from "@/components/ui/button";

export function LuminousHero() {
    const [init, setInit] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Stretchy Scroll effect matching 'Liquid Scroll' aesthetic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    // Initialize tsParticles for Silver Dust
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">

            {/* High-Exposure Vaporwave Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#71c1f6] z-500 rounded-full filter blur-[150px] opacity-40 animate-blob mix-blend-multiply" />
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#F1F5F9] rounded-full filter blur-[150px] opacity-60 animate-[blob_7s_infinite_2s] mix-blend-multiply" />
            <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-[#E0F2FE] rounded-full filter blur-[150px] opacity-40 animate-[blob_7s_infinite_4s] mix-blend-multiply" />

            {/* tsParticles Silver Dust */}
            {init && (
                <Particles
                    id="tsparticles"
                    className="absolute inset-0 z-0 pointer-events-none"
                    options={{
                        background: { color: { value: "transparent" } },
                        fpsLimit: 120,
                        interactivity: {
                            events: { onHover: { enable: true, mode: "bubble" } },
                            modes: { bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8 } },
                        },
                        particles: {
                            color: { value: "#CBD5E1" },
                            move: {
                                direction: "top",
                                enable: true,
                                random: true,
                                speed: 0.5,
                                straight: false,
                            },
                            number: { density: { enable: true, width: 800, height: 800 }, value: 60 },
                            opacity: {
                                value: { min: 0.1, max: 0.5 },
                                animation: { enable: true, speed: 1 }
                            },
                            shape: { type: "circle" },
                            size: { value: { min: 1, max: 3 } },
                        },
                        detectRetina: true,
                    }}
                />
            )}

            {/* Stretchy Scroll Content Container */}
            <motion.div
                style={{ scale, y, opacity }}
                className="relative z-10 container mx-auto px-6 flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl text-center z-1000 shadow-2xl bg-white rounded-3xl p-10"
                >

                    <h1 className="text-5xl md:text-6xl lg:text-[6rem] font-black text-[#0F172A] tracking-tighter leading-[0.95] mb-8">
                        Elevate your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#60A5FA]">
                            academic trajectory.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-[#0F172A] font-medium leading-loose mb-12 opacity-80">
                        Experience the next generation of institutional discovery. We synchronize
                        your potential with premier global learning hubs through pristine, verifiable data.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button className="h-14 px-10 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-lg transition-all shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.7)] hover:-translate-y-1">
                            Start Discovery
                        </Button>
                        <Button variant="outline" className="h-14 px-10 rounded-full border-white/60 bg-white/30 backdrop-blur-2xl text-[#0F172A] font-bold text-lg transition-all hover:bg-white/80 hover:border-[#E2E8F0] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:-translate-y-1">
                            Explore Campuses
                        </Button>
                    </div>
                </motion.div>
            </motion.div>

        </section>
    );
}
