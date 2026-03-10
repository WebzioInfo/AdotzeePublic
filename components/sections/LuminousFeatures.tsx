"use client";

import { motion } from "framer-motion";
import { Brain, Search, CheckCircle } from "lucide-react";

export function LuminousFeatures() {
    return (
        <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-6 relative inline-block">
                        Powered by <br className="md:hidden" /> Luminous Intelligence
                        <div className="absolute -bottom-4 left-1/2 w-24 h-1 bg-brand-accent rounded-full transform -translate-x-1/2" />
                    </h2>
                </div>

                {/* 12-Column Floating Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Large Main Feature (Span 8 Cols) */}
                    <div className="md:col-span-8 bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-[2.5rem] p-12 flex flex-col justify-between group hover:-translate-y-3 transition-transform duration-700 ease-out hover:rotate-1">
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <Brain className="w-8 h-8 text-[#2563EB]" />
                            </div>
                            <h3 className="text-3xl font-black text-[#0F172A] mb-4 tracking-tight">Expert Admission Guidance</h3>
                            <p className="text-[#0F172A] font-medium opacity-70 leading-loose max-w-lg text-lg">
                                Our counselors help you choose the right course and college based on your interests and career goals after 12th grade.
                            </p>
                        </div>

                        {/* Vaporwave accent */}
                        <div className="mt-12 h-40 w-full rounded-3xl bg-gradient-to-tr from-[#E0F2FE] to-[#F1F5F9] border border-white/50 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute w-80 h-80 bg-white/60 rounded-full blur-3xl -top-10 -right-10 animate-blob" />
                            <span className="text-sm font-bold tracking-widest uppercase text-[#2563EB] mix-blend-multiply">Expert Counsel Ready</span>
                        </div>
                    </div>

                    {/* Small Vertical Feature Stack (Span 4 Cols) */}
                    <div className="md:col-span-4 flex flex-col gap-8">
                        <div className="flex-1 bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-[2.5rem] p-10 group hover:-translate-y-2 transition-transform duration-500 ease-out hover:-rotate-1">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <Search className="w-6 h-6 text-[#60A5FA]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight">Top Colleges in South India</h3>
                            <p className="text-[#0F172A] opacity-70 font-medium leading-relaxed">
                                Access verified admission paths to premier campuses in Bangalore, Mangalore, and beyond.
                            </p>
                        </div>

                        <div className="flex-1 bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-[2.5rem] p-10 group hover:-translate-y-2 transition-transform duration-500 ease-out hover:rotate-1">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                                <CheckCircle className="w-6 h-6 text-[#2563EB]" />
                            </div>
                            <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight">Career Path Selection</h3>
                            <p className="text-[#0F172A] opacity-70 font-medium leading-relaxed">
                                Get personalized recommendations for UG and PG courses that match your future ambitions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ambient Background Mesh Drops */}
            <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#E0F2FE] rounded-full blur-[150px] mix-blend-multiply opacity-50 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        </section>
    );
}
