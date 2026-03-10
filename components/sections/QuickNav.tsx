"use client";

import { motion } from "framer-motion";
import { Building2, BookOpen, GraduationCap, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

const navItems = [
    {
        title: "Colleges",
        description: "Explore top institutes",
        href: "/colleges",
        icon: Building2,
        color: "bg-blue-500",
    },
    {
        title: "Courses",
        description: "Find your degree",
        href: "/courses",
        icon: BookOpen,
        color: "bg-indigo-500",
    },
    {
        title: "Add-ons",
        description: "Skill certifications",
        href: "/addons",
        icon: GraduationCap,
        color: "bg-sky-500",
    },
    {
        title: "Discovery",
        description: "AI guidance",
        href: "/recommendations",
        icon: Sparkles,
        color: "bg-blue-600",
    },
];

export function QuickNav() {
    return (
        <section className="py-12 md:py-20 bg-transparent relative z-20 -mt-10 md:-mt-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <Link
                                href={item.href}
                                className="group block h-full p-6 md:p-8 bg-white/70 backdrop-blur-2xl rounded-[2rem] border border-white shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className={`w-12 h-12 md:w-16 md:h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight mb-1">{item.title}</h3>
                                        <p className="text-sm md:text-base font-medium text-foreground/60 leading-tight">{item.description}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                        <ChevronRight className="w-5 h-5 text-brand-accent" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
