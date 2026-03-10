"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ParticlesBackground from "../filters/particles";

export function LuminousHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Particles Background */}
            <ParticlesBackground />

            {/* Vaporwave gradient blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#71c1f6] rounded-full blur-[150px] opacity-40 animate-blob mix-blend-multiply z-[1]" />

            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#F1F5F9] rounded-full blur-[150px] opacity-60 animate-[blob_7s_infinite_2s] mix-blend-multiply z-[1]" />

            <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-[#E0F2FE] rounded-full blur-[150px] opacity-40 animate-[blob_7s_infinite_4s] mix-blend-multiply z-[1]" />

            {/* Hero Content */}
            <motion.div
                style={{ scale, y, opacity }}
                className="relative z-10 container mx-auto px-6 flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl text-center shadow-2xl bg-white rounded-[2rem] md:rounded-3xl p-6 md:p-10"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black text-foreground tracking-tighter leading-[0.95] mb-6">
                        Find the Best College
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                            After Plus Two
                        </span>
                    </h1>

                    <p className="max-w-xl mx-auto text-base text-foreground font-medium leading-relaxed mb-10 opacity-80">
                        Get expert admission guidance for top colleges in Bangalore,
                        Mangalore, Mysore, and Coimbatore. We help Plus Two students find
                        the right degree course and institutional match.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/recommendations" className="w-full sm:w-auto">
                            <Button className="w-full h-12 px-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-lg hover:-translate-y-1">
                                Start AI Discovery
                            </Button>
                        </Link>

                        <Link
                            href="https://wa.me/918281060462"
                            target="_blank"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                variant="outline"
                                className="w-full h-12 px-10 rounded-full border-gray-300 bg-white/40 backdrop-blur text-foreground font-bold text-lg transition-all hover:bg-white hover:-translate-y-1"
                            >
                                WhatsApp an Expert
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}