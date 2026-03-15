"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import ParticlesBackground from "../filters/particles";

/**
 * LuminousHero - Entry point for the selection funnel.
 * Redirects users to /courses based on their chosen stream.
 */
export function LuminousHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    const handleStreamSelect = (streamId: string, streamName: string) => {
        router.push(`/courses?stream=${streamId}&streamName=${encodeURIComponent(streamName)}`);
    };

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            <ParticlesBackground />

            {/* Background aesthetic blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-50 rounded-full blur-[120px] opacity-60 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-50 rounded-full blur-[120px] opacity-60 animate-pulse" />

            <motion.div
                style={{ scale, y, opacity }}
                className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center"
            >
              

                <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none">
                    Find the Best College<br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">After Plus Two</span>
                </h1>

                <p className="text-xl text-slate-500 mb-16 max-w-2xl font-medium leading-relaxed">
                    Explore top-rated courses and premier colleges tailored for your academic path. Select a stream to begin your journey.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                    {[
                        { id: 'Science', name: 'Science', color: 'hover:border-blue-500' },
                        { id: 'Commerce', name: 'Commerce', color: 'hover:border-emerald-500' },
                        { id: 'Humanities', name: 'Humanities', color: 'hover:border-orange-500' }
                    ].map(s => (
                        <button
                            key={s.id}
                            onClick={() => handleStreamSelect(s.id, s.name)}
                            className={`bg-white p-12 rounded-[3.5rem] border-2 border-slate-50 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-center ${s.color}`}
                        >

                            <span className="text-3xl font-black text-slate-800">{s.name}</span>
                            <div className="mt-4 h-1 w-0 group-hover:w-16 bg-current transition-all duration-500 opacity-20" />
                        </button>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}