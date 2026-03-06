"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Clock, ArrowLeft, CheckCircle2, TrendingUp, Sparkles, Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUiStore } from "@/store/useUiStore";
import { Badge } from "@/components/ui/badge";
import { AddonCard } from "@/components/cards/AddonCard";
import { useCourse, useAddons } from "@/hooks/useData";

export default function CourseDetailsPage() {
    const { id } = useParams();
    const { data: course, isLoading, error } = useCourse(id as string);
    const { data: relatedAddons } = useAddons(); // Simplified "related" for now
    const openLeadModal = useUiStore((state) => state.openLeadModal);

    if (isLoading) {
        return (
            <div className="bg-background min-h-screen flex flex-col items-center justify-center">
                <Loader2 className="size-16 animate-spin text-[#60A5FA] mb-6" />
                <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Initializing Course Data...</p>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center p-4">
                <div className="bg-card text-white p-10 rounded-3xl border border-border max-w-2xl w-full text-center shadow-2xl">
                    <h2 className="text-3xl font-black mb-4">Course Not Found</h2>
                    <p className="text-slate-400 mb-8">The requested academic program could not be identified in our system. It may have been deprecated.</p>
                    <Link href="/courses">
                        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] h-14 px-10 rounded-xl text-lg font-bold transition-all">
                            Return to Programs
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Hero Section */}
            <section className="bg-linear-to-b from-[#0A1550] to-[#020617] text-white pt-20 pb-28 relative overflow-hidden border-b border-border shadow-2xl">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <Link href="/courses" className="inline-flex items-center text-[#60A5FA] hover:text-white mb-10 transition-colors font-bold group">
                        <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Programs
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex gap-3">
                                <Badge className="bg-[#2563EB] text-white border-none py-1.5 px-4 rounded-lg font-black uppercase text-[10px] tracking-widest">{course.level}</Badge>
                                <Badge variant="outline" className="border-white/10 text-slate-300 py-1.5 px-4 rounded-lg font-bold">{course.stream}</Badge>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight drop-shadow-2xl">
                                {course.name}
                            </h1>
                            <p className="text-slate-400 text-xl leading-relaxed max-w-xl font-light">
                                {course.description}
                            </p>
                            <div className="flex flex-wrap gap-8 pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-[#60A5FA] shadow-inner">
                                        <Clock className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Duration</p>
                                        <p className="text-lg font-bold text-white">{course.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="size-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-[#60A5FA] shadow-inner">
                                        <TrendingUp className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Prospects</p>
                                        <p className="text-lg font-bold text-white">Very High</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="bg-card/50 backdrop-blur-2xl rounded-[2.5rem] p-12 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 size-40 bg-[#2563EB]/20 rounded-full blur-3xl group-hover:bg-[#2563EB]/30 transition-all duration-700"></div>
                                <div className="flex items-center justify-between mb-10 relative z-10">
                                    <h3 className="text-2xl font-black text-white">Quick Guidance</h3>
                                    <div className="p-3 bg-[#2563EB]/20 rounded-xl text-[#60A5FA]">
                                        <Sparkles className="size-6 animate-pulse" />
                                    </div>
                                </div>
                                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light relative z-10">Want to know more about this course and the best institutions offering it?</p>
                                <Button
                                    onClick={() => openLeadModal(course.name)}
                                    className="w-full h-16 rounded-2xl bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-xl font-black shadow-2xl shadow-[#2563EB]/30 transition-all relative z-10 border border-white/10"
                                >
                                    Get Free Guidance
                                </Button>
                                <div className="text-center flex items-center justify-center gap-2 text-slate-500 text-xs mt-6 font-bold uppercase tracking-widest relative z-10">
                                    <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Immediate Counselor Access
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container px-4 md:px-6 mx-auto -mt-16 relative z-20 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <div className="bg-card rounded-[2rem] p-10 shadow-2xl border border-border">
                            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
                                <GraduationCap className="text-[#60A5FA] size-8" /> Program Thesis
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none text-slate-400 leading-relaxed font-light">
                                <p>
                                    The {course.name} program is architected to provide students with a robust intellectual framework and competitive advantage in the global market. In an increasingly interconnected economy, the demand for specialized professionals continues to accelerate.
                                </p>
                                <p className="mt-6">
                                    Our curriculum emphasizes both theoretical mastery and high-impact practical applications, ensuring graduates are equipped for immediate institutional leadership roles.
                                </p>
                            </div>
                        </div>

                        {/* Career Opportunities */}
                        <div className="bg-card rounded-[2rem] p-10 shadow-2xl border border-border">
                            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
                                <TrendingUp className="text-[#60A5FA] size-8" /> Strategic Career Paths
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {course.careerOpportunities?.map((job, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-[#2563EB]/40 hover:bg-[#2563EB]/10 transition-all duration-300">
                                        <div className="size-10 flex items-center justify-center bg-[#2563EB]/20 text-[#60A5FA] rounded-xl group-hover:scale-110 transition-transform">
                                            <CheckCircle2 className="size-5 shrink-0" />
                                        </div>
                                        <span className="font-bold text-slate-300 group-hover:text-white transition-colors uppercase text-sm tracking-wider">{job}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Addon Courses */}
                        <div className="space-y-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-black text-white flex items-center gap-4">
                                    <Sparkles className="text-[#60A5FA] size-8" /> Intelligence Boosters
                                </h2>
                                <Link href="/addons" className="text-[#60A5FA] font-black text-sm uppercase tracking-widest hover:text-white transition-colors">View Directory</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedAddons?.slice(0, 2)?.map((addon) => (
                                    <AddonCard key={addon.id} addon={addon} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-10">
                        <div className="bg-[#0A1550] rounded-[2rem] p-10 text-white shadow-2xl lg:sticky lg:top-24 border border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 size-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-2xl font-black mb-8 relative z-10">Institutional Intake</h3>
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Investment Scope</p>
                                    <p className="text-2xl font-black text-[#60A5FA]">{course.feeRange}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Qualifications</p>
                                    <p className="text-lg font-bold">Standard XII Matrix (Science)</p>
                                </div>
                                <div className="pt-6">
                                    <Button
                                        onClick={() => openLeadModal(course.name)}
                                        className="w-full h-16 bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-xl font-black text-lg transition-all shadow-xl shadow-[#2563EB]/20"
                                    >
                                        Check Eligibility
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Colleges */}
                        <div className="bg-card rounded-[2rem] p-10 border border-border shadow-2xl">
                            <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                <Building2 className="text-[#60A5FA] size-6" /> Partner Hubs
                            </h3>
                            <div className="space-y-8">
                                {[1, 2].map((i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <p className="font-bold text-slate-200 group-hover:text-[#60A5FA] transition-colors leading-snug">Autonomous Research Institution of Excellence</p>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2 px-2 py-0.5 bg-white/5 rounded w-fit">Kochi • NAAC A++</p>
                                        <div className="mt-6 h-px w-full bg-white/5 group-hover:bg-[#2563EB]/40 transition-colors" />
                                    </div>
                                ))}
                                <Link href="/colleges" className="inline-block mt-4">
                                    <Button variant="link" className="px-0 text-[#60A5FA] font-black uppercase text-xs tracking-widest hover:text-white transition-colors">Directory Scan</Button>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40">
                <Button
                    onClick={() => openLeadModal(course.name)}
                    className="w-full h-16 bg-[#2563EB] text-white rounded-2xl shadow-2xl shadow-[#2563EB]/30 font-black text-lg border border-white/10"
                >
                    Extract Personalized Path
                </Button>
            </div>
        </div>
    );
}
