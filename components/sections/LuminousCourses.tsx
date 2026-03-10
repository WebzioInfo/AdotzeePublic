"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function LuminousCourses() {
    return (
        <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
                            Popular Courses.
                        </h2>
                        <p className="text-xl text-[#0F172A] font-medium opacity-70 max-w-xl">
                            Find the right degree program after Plus Two to kickstart your career.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {[
                        { title: "Computer Applications (BCA)", tags: ["Technology", "3 Years"], span: "md:col-span-6" },
                        { title: "Business Administration (BBA)", tags: ["Management", "3 Years"], span: "md:col-span-3" },
                        { title: "B.Tech Computer Science", tags: ["Engineering", "4 Years"], span: "md:col-span-3" },
                        { title: "Allied Health Sciences", tags: ["Medicine", "4 Years"], span: "md:col-span-4" },
                        { title: "Commerce (B.Com)", tags: ["Accounting", "3 Years"], span: "md:col-span-8" }
                    ].map((course, i) => (
                        <div
                            key={i}
                            className={`${course.span} group relative bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-3xl p-10 flex flex-col justify-between hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 overflow-hidden`}
                        >
                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="flex flex-wrap gap-2">
                                    {course.tags.map((tag, j) => (
                                        <span key={j} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-white rounded-full border border-white shadow-sm text-[#2563EB]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#2563EB] transition-colors duration-300">
                                    <ArrowUpRight className="w-5 h-5 text-[#0F172A] group-hover:text-white transition-colors" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-foreground tracking-tight relative z-10">
                                {course.title}
                            </h3>

                            {/* Hover Vaporwave Glow */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#E0F2FE] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#F1F5F9] rounded-full blur-[200px] mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </section>
    );
}
