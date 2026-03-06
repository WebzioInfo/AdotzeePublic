"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Building2, MapPin, Star, GraduationCap, CheckCircle, Phone, Mail, Globe, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUiStore } from "@/store/useUiStore";
import { Badge } from "@/components/ui/badge";
import { College, Course } from "@/types";

import { useCollege, useCourses } from "@/hooks/useData";
import { Loader2 } from "lucide-react";

export default function CollegeDetailsPage() {
    const { id } = useParams();
    const { data: college, isLoading, error } = useCollege(id as string);
    const { data: collegeCourses } = useCourses(); // Simplified "courses offered" for now
    const openLeadModal = useUiStore((state) => state.openLeadModal);

    if (isLoading) {
        return (
            <div className="bg-background min-h-screen flex flex-col items-center justify-center">
                <Loader2 className="size-16 animate-spin text-[#60A5FA] mb-6" />
                <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Establishing Connection to Database...</p>
            </div>
        );
    }

    if (error || !college) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center p-4">
                <div className="bg-card text-white p-12 rounded-[2.5rem] border border-border max-w-2xl w-full text-center shadow-2xl">
                    <h2 className="text-3xl font-black mb-4">Entity Not Identified</h2>
                    <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">The institution ID provided does not match any authenticated record in our knowledge graph.</p>
                    <Link href="/colleges">
                        <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] h-14 px-10 rounded-xl text-lg font-black transition-all">
                            Back to Registry
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-32">
            {/* Visual Header */}
            <section className="h-[50vh] md:h-[65vh] relative overflow-hidden">
                <img
                    src={college.imageUrl}
                    alt={college.name}
                    className="w-full h-full object-cover scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-[#020617]/50 to-transparent"></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 text-white animate-in slide-in-from-bottom-10 fade-in duration-1000">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap gap-3 mb-6">
                            {college.accreditation?.map((acc, i) => (
                                <Badge key={i} className="bg-white/10 backdrop-blur-xl text-[#60A5FA] border border-white/10 py-1.5 px-4 font-black text-[10px] tracking-widest uppercase">{acc}</Badge>
                            ))}
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter drop-shadow-2xl">{college.name}</h1>
                        <div className="flex flex-wrap items-center gap-8 text-slate-300 font-bold uppercase tracking-widest text-sm">
                            <span className="flex items-center gap-2"><MapPin className="size-5 text-[#2563EB]" /> {college.city}, {college.state}</span>
                            <span className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-8"><Star className="size-5 fill-amber-400 text-amber-400" /> {college.rating} / 5.0 Rating</span>
                            <span className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-8">Established {college.establishedYear}</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container px-4 md:px-6 mx-auto py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-20">

                        {/* Description */}
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-white tracking-tight">Institutional Profile</h2>
                            <div className="text-slate-400 text-xl leading-relaxed font-light">
                                {college.description}
                            </div>
                        </div>

                        {/* Courses Offered */}
                        <div className="space-y-10">
                            <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
                                <GraduationCap className="text-[#60A5FA] size-10" /> Academic Portfolio
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {collegeCourses?.slice(0, 4)?.map((course) => (
                                    <Link key={course.id} href={`/courses/${course.id}`}>
                                        <div className="p-8 bg-card rounded-[2rem] border border-border hover:border-[#2563EB]/50 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-all group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 size-24 bg-[#2563EB]/5 rounded-bl-[4rem] group-hover:bg-[#2563EB]/10 transition-colors"></div>
                                            <h4 className="font-black text-xl text-white group-hover:text-[#60A5FA] transition-colors leading-tight mb-3">{course.name}</h4>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{course.level} • {course.duration}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Facilities */}
                        <div className="space-y-10">
                            <h2 className="text-4xl font-black text-white tracking-tight">Ecosystem Highlights</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {college.facilities?.map((facility, i) => (
                                    <div key={i} className="flex flex-col items-center p-8 bg-card rounded-[2.5rem] border border-border text-center group hover:bg-white/5 transition-colors">
                                        <div className="size-16 rounded-2xl bg-[#2563EB]/10 text-[#60A5FA] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                            <CheckCircle className="size-8" />
                                        </div>
                                        <span className="font-bold text-slate-300 group-hover:text-white transition-colors uppercase text-xs tracking-widest">{facility}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-10">
                            <h2 className="text-4xl font-black text-white tracking-tight">Geo-Precision</h2>
                            <div className="w-full h-[400px] bg-card rounded-[2.5rem] border border-border flex items-center justify-center text-slate-400 overflow-hidden relative shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-20 invert" alt="Map background" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-md">
                                    <MapPin className="size-16 text-[#2563EB] mb-4 drop-shadow-[0_0_10px_#2563EB]" />
                                    <p className="text-3xl font-black text-white mb-2">{college.city}, {college.state}</p>
                                    <p className="text-slate-400 text-lg font-light tracking-wide">{college.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <aside className="space-y-10">
                        <div className="sticky top-24 space-y-10">
                            <div className="bg-card rounded-[2.5rem] p-10 border border-border shadow-2xl space-y-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 size-32 bg-[#2563EB]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                                <div className="space-y-6 relative z-10">
                                    <h3 className="text-3xl font-black text-white tracking-tight">Incentivized Admission</h3>
                                    <p className="text-slate-400 text-lg font-light leading-relaxed">Secure your terminal with exclusive Adotzee institutional support and merit-based financial aid.</p>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <div className="size-12 flex items-center justify-center bg-white/5 rounded-xl text-[#60A5FA]"><Phone className="size-5" /></div>
                                        <span className="font-bold uppercase tracking-widest text-sm">+91 79078 05626</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <div className="size-12 flex items-center justify-center bg-white/5 rounded-xl text-[#60A5FA]"><Mail className="size-5" /></div>
                                        <span className="font-bold uppercase tracking-widest text-sm">admissions@adotzee.com</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <div className="size-12 flex items-center justify-center bg-white/5 rounded-xl text-[#60A5FA]"><Globe className="size-5" /></div>
                                        <span className="font-bold uppercase tracking-widest text-sm">institution.edu.in</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => openLeadModal(college.name)}
                                    className="w-full h-16 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl text-xl font-black shadow-2xl shadow-[#2563EB]/20 transition-all border border-white/10 relative z-10"
                                >
                                    Initiate Process
                                </Button>
                            </div>

                            <div className="bg-[#0A1550] rounded-[2.5rem] p-10 text-white relative overflow-hidden border border-white/10 shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <ShieldCheck className="size-24" />
                                </div>
                                <h3 className="text-2xl font-black mb-6 relative z-10 uppercase tracking-tighter">Verified Excellence</h3>
                                <ul className="space-y-6 relative z-10">
                                    <li className="flex items-start gap-4">
                                        <div className="size-2 bg-[#60A5FA] rounded-full mt-2.5"></div>
                                        <p className="text-slate-300 text-base font-medium italic leading-relaxed">"Top placement trajectory in the regional matrix with 100+ institutional recruiter access."</p>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="size-2 bg-[#60A5FA] rounded-full mt-2.5"></div>
                                        <p className="text-slate-300 text-base font-medium italic leading-relaxed">"Dynamic institutional ecosystem featuring high-throughput student hubs and annual fests."</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
