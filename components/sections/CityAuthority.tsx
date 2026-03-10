"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, GraduationCap, Map } from "lucide-react";

const locations = [
    {
        city: "Bengaluru",
        description: "The Silicon Valley of India, offering premier engineering and management institutes with great placement opportunities.",
        icon: Building2
    },
    {
        city: "Mangalore",
        description: "A hub for medical and allied health sciences, known for its high-quality education and coastal campus life.",
        icon: GraduationCap
    },
    {
        city: "Mysore",
        description: "The cultural capital of Karnataka, home to historic universities and specialized research institutions.",
        icon: Map
    },
    {
        city: "Coimbatore",
        description: "An industrial and educational powerhouse in Tamil Nadu, famous for its textile and engineering excellence.",
        icon: MapPin
    }
];

export function CityAuthority() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-6">
                        Study in India's Best Cities
                    </h2>
                    <p className="text-xl text-foreground font-medium opacity-70 max-w-2xl leading-loose">
                        We provide specialized admission support for colleges in the most sought-after educational hubs in South India.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {locations.map((loc, i) => (
                        <motion.div
                            key={loc.city}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-[2.5rem] p-8 group hover:-translate-y-3 transition-transform duration-500"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                                <loc.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight">{loc.city}</h3>
                            <p className="text-foreground/70 font-medium leading-relaxed">
                                {loc.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
