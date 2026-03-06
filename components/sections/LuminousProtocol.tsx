"use client";

import { motion } from "framer-motion";

export function LuminousProtocol() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter mb-4">
                        The Liquid Protocol
                    </h2>
                    <p className="text-xl text-[#0F172A] font-medium opacity-70 leading-loose">
                        A seamless, fluid transition from profile analysis to finalized enrollment.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Liquid Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E0F2FE] via-[#2563EB] to-transparent rounded-full transform md:-translate-x-1/2 opacity-30" />

                    {[
                        { step: "01", title: "Cognitive Ingestion", desc: "Our engine maps your constraints and targets against our global syllabus matrix." },
                        { step: "02", title: "Algorithmic Matching", desc: "Fluidly filtering through thousands of data points to present only hyper-relevant pathways." },
                        { step: "03", title: "Strategic Execution", desc: "One-click application synchronization directly into verified institutional portals." }
                    ].map((item, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.2 }}
                            key={i}
                            className={`relative flex flex-col md:flex-row items-center mb-16 last:mb-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Liquid Node */}
                            <div className="absolute left-8 md:left-1/2 w-14 h-14 bg-white/60 backdrop-blur-xl rounded-full border border-white shadow-white-glow flex items-center justify-center transform -translate-x-1/2 z-10">
                                <span className="font-black text-[#2563EB] text-lg tracking-tighter">{item.step}</span>
                            </div>

                            <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${i % 2 === 0 ? "md:pr-24 text-left md:text-right" : "md:pl-24 text-left"}`}>
                                <div className="bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-3xl p-10 hover:-translate-y-3 transition-transform duration-700 ease-out group">
                                    <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tighter group-hover:text-[#2563EB] transition-colors">{item.title}</h3>
                                    <p className="text-[#0F172A] opacity-70 leading-loose font-medium text-lg">{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#E0F2FE] rounded-full blur-[150px] mix-blend-multiply opacity-50 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        </section>
    );
}
