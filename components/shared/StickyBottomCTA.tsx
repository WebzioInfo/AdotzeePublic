"use client";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/useUiStore";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function StickyBottomCTA() {
    const openLeadModal = useUiStore((state) => state.openLeadModal);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="lg:hidden fixed bottom-6 left-6 right-6 z-40"
                >
                    <Button
                        onClick={() => openLeadModal(undefined, "sticky_bottom_cta")}
                        className="w-full h-16 bg-[#2563EB] text-white rounded-2xl shadow-[0_20px_50px_rgba(37,99,235,0.4)] font-black text-lg border border-white/10 flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <Sparkles className="size-5 animate-pulse text-[#60A5FA]" />
                        Get Admission Guidance
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
