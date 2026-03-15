"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ShieldCheck } from "lucide-react";

export function LuminousColleges() {
    const colleges = [
        {
            name: "Presidency University",
            location: "Bengaluru, Karnataka",
            tier: "Top Ranked",
            span: "md:col-span-7",
            image: "/colleges/presidency.jpg"
        },
        {
            name: "BGS Medical College",
            location: "Bengaluru, Karnataka",
            tier: "Verified Partner",
            span: "md:col-span-5",
            image: "/colleges/bgs.jpg"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1200px] relative z-10">

                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-6 relative inline-block">
                        Top Partner Colleges
                        <div className="absolute -bottom-4 left-1/2 w-24 h-1 bg-brand-accent rounded-full transform -translate-x-1/2" />
                    </h2>

                    <p className="text-xl text-[#0F172A] font-medium opacity-70 leading-loose">
                        Get admission in verified institutions across Bangalore, Mangalore, and Mysore.
                    </p>
                </div>

                {/* Colleges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {colleges.map((hub, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10, rotate: 1 }}
                            className={`${hub.span} group flex flex-col xl:flex-row bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-[3rem] p-6 transition-all duration-500`}
                        >

                            {/* Image Area */}
                            <div className="relative w-full xl:w-1/2 h-64 xl:h-auto rounded-[2rem] overflow-hidden border border-white/50 shrink-0">
                                <Image
                                    src={hub.image}
                                    alt={hub.name}
                                    fill
                                    className="object-cover"
                                />

                                {/* luminous overlay */}
                                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                            </div>

                            {/* Content */}
                            <div className="p-8 w-1/2 flex-1 flex flex-col justify-center">
                                <div className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50/50 px-3 py-1.5 rounded-full w-fit mb-4">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>{hub.tier}</span>
                                </div>

                                <h3 className="text-3xl font-black text-foreground tracking-tight mb-3">
                                    {hub.name}
                                </h3>

                                <div className="flex items-center text-foreground opacity-60 font-medium">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {hub.location}
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-[#E0F2FE]/50 to-transparent pointer-events-none" />
        </section>
    );
}