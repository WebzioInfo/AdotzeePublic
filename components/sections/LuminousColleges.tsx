"use client";

import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Stars } from "lucide-react";

export function LuminousColleges() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter mb-6 relative inline-block">
                        Premier Authorized Hubs
                        <div className="absolute -bottom-4 left-1/2 w-24 h-1 bg-[#2563EB] rounded-full transform -translate-x-1/2" />
                    </h2>
                    <p className="text-xl text-[#0F172A] font-medium opacity-70 leading-loose">
                        Institutions rigorously vetted and fully synchronized with the Adotzee discovery network.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {[
                        {
                            name: "Stanford Analytical Hub",
                            location: "California Node",
                            tier: "Platinum Verified",
                            color: "from-[#E0F2FE] to-[#F1F5F9]",
                            span: "md:col-span-7"
                        },
                        {
                            name: "Northern Strategy Academy",
                            location: "Toronto Node",
                            tier: "Elite Network",
                            color: "from-[#F1F5F9] to-[#E2E8F0]",
                            span: "md:col-span-5"
                        }
                    ].map((hub, i) => (
                        <div
                            key={i}
                            className={`${hub.span} group flex flex-col xl:flex-row bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-[3rem] p-6 hover:-translate-y-3 hover:rotate-1 transition-all duration-700 ease-out`}
                        >
                            <div className={`relative w-full xl:w-64 h-64 xl:h-auto rounded-[2rem] bg-gradient-to-br ${hub.color} overflow-hidden border border-white/50 flex items-center justify-center shrink-0`}>
                                <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
                                <Stars className="w-16 h-16 text-white/50 relative z-10 mix-blend-overlay" />
                                <div className="absolute w-48 h-48 bg-white/60 rounded-full blur-3xl animate-blob mix-blend-overlay" />
                            </div>

                            <div className="p-8 flex-1 flex flex-col justify-center">
                                <div className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-[#2563EB] bg-blue-50/50 px-3 py-1.5 rounded-full w-fit mb-4">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>{hub.tier}</span>
                                </div>
                                <h3 className="text-3xl font-black text-[#0F172A] tracking-tight mb-3">
                                    {hub.name}
                                </h3>
                                <div className="flex items-center text-[#0F172A] opacity-60 font-medium">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {hub.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-[#E0F2FE]/50 to-transparent pointer-events-none" />
        </section>
    );
}
