"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LuminousNavbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Show pill background when scrolled past 50px
        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }

        // Hide navbar completely when scrolling down, show when scrolling up
        if (latest > 150 && latest > previous) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "-100%", opacity: 0 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4`}
        >
            <div className={`
                flex items-center justify-between px-6 py-3 transition-all duration-500
                ${scrolled
                    ? "w-full max-w-3xl bg-gray-400/60 backdrop-blur-2xl  shadow-floating rounded-full"
                    : "w-full max-w-6xl rounded-2xl shadow-xl bg-black/20 backdrop-blur-2xl p-10"
                }
            `}>
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/Logos/AdotzeeLogoNoBG2.png"
                        alt="Adotzee Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                        priority
                    />

                    <Image
                        src="/Logos/AdotzeeLogoTextNoBG2.png"
                        alt="Adotzee Text"
                        width={120}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-[#64748B]">
                    <Link href="/courses" className="relative group px-2 py-1">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#2563EB]">Courses</span>
                        <motion.span className="absolute inset-0 bg-blue-50 rounded-md scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-0" />
                    </Link>
                    <Link href="/colleges" className="relative group px-2 py-1">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#2563EB]">Colleges</span>
                        <motion.span className="absolute inset-0 bg-blue-50 rounded-md scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-0" />
                    </Link>
                    <Link href="/recommendations" className="relative group px-2 py-1">
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-[#2563EB]">Recommendations</span>
                        <motion.span className="absolute inset-0 bg-blue-50 rounded-md scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 -z-0" />
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/recommendations">
                        <Button className="bg-[#2563EB] hover:bg-[#60A5FA] text-white px-6 h-10 rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_-5px_rgba(96,165,250,0.6)]">
                            Begin
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
