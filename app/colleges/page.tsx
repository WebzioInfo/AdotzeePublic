"use client";

import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "@/services/apiClient";
import { Loader2, ArrowLeft, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";

function CollegesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // All data from previous steps
    const streamName = searchParams.get("streamName") || "";
    const courseName = searchParams.get("courseName") || "";
    const addonId = searchParams.get("addonId") || "";
    const addonName = searchParams.get("addonName") || "None";

    const [colleges, setColleges] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchColleges = async () => {
            setLoading(true);
            try {
                // If addonId is missing, we use default colleges or handle via API
                const data = await apiClient.get(`/Addons/${addonId}/colleges`);
                setColleges(Array.isArray(data) ? data : []);
            } catch (err: any) {
                setError(err.message || "Failed to load colleges for this specialization.");
            } finally {
                setLoading(false);
            }
        };

        fetchColleges();
    }, [addonId]);

    const handleCollegeSelect = async (collegeName: string) => {
        setSubmitting(true);
        setError(null);
        try {
            // 1. Execute POST /api/Leads
            const leadPayload = {
                fullName: "Student from Web",
                courseInterested: `${courseName}${addonName !== 'None' ? ` with ${addonName}` : ''}`,
                collegeInterested: collegeName,
                source: 1 // 1 = Website
            };
            
            await apiClient.post("/Leads", leadPayload).catch(e => {
                console.warn("Lead tracking failed but continuing redirect:", e);
                return null;
            });

            // 2. Redirect to WhatsApp
            const message = `Hi, I'm interested in admission.\n\nMy Selection Summary:\nStream: ${streamName}\nCourse: ${courseName}\nSpecialization: ${addonName}\nPreferred College: ${collegeName}`;
            const whatsappUrl = `https://wa.me/918281060462?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, "_blank");
            
            // Optionally redirect to a thank you page or back home
            router.push("/");
        } catch (err: any) {
            setError("Failed to process your request. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-white py-24 px-6 relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-40" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Navigation */}
                <button 
                    onClick={() => router.back()} 
                    className="inline-flex items-center text-slate-400 font-bold hover:text-blue-600 transition-colors group mb-12"
                >
                    <div className="p-2 rounded-full bg-slate-50 group-hover:bg-blue-50 mr-4 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    Back to Specializations
                </button>

                {/* Header */}
                <div className="mb-16">
                    <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-blue-600 font-black uppercase tracking-widest text-sm"
                    >
                        Final Step
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-slate-900 mt-4 tracking-tighter leading-tight"
                    >
                        Success! These Colleges offer <br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">{courseName}</span>
                    </motion.h1>
                    <p className="text-slate-500 font-medium text-xl mt-6">Select a college to confirm your interest and connect with our experts on WhatsApp.</p>
                </div>

                {/* Content */}
                {loading || submitting ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="w-20 h-20 text-blue-500 animate-spin mb-8" />
                        <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs">
                            {submitting ? "Finalizing your Lead..." : "Finding your Future..."}
                        </p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-12 rounded-[3rem] border border-red-100 text-center max-w-2xl mx-auto">
                        <p className="text-red-600 font-bold mb-8 text-xl">{error}</p>
                        <button onClick={() => window.location.reload()} className="bg-slate-900 text-white px-12 py-4 rounded-full font-black hover:bg-slate-800 transition-all">Retry</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {colleges.length > 0 ? colleges.map((college, idx) => (
                            <motion.button
                                key={college.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => handleCollegeSelect(college.name || college.title)}
                                className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(37,99,235,0.15)] hover:border-blue-500 transition-all text-left group relative overflow-hidden"
                            >
                                <div className="mb-10">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                                        <GraduationCap className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 leading-tight mb-4">{college.name || college.title}</h3>
                                    <div className="flex items-center text-green-600 font-black text-[10px] uppercase tracking-widest border border-green-100 bg-green-50 px-3 py-1 rounded-full w-fit">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                                        Direct Admission
                                    </div>
                                </div>
                                
                                <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-8 italic">
                                    <span className="text-slate-400 font-bold text-sm group-hover:text-blue-600 transition-colors">Connect with expert</span>
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200 group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.183-.573c.978.58 1.711.927 2.898.927 3.181 0 5.768-2.585 5.769-5.766 0-3.181-2.587-5.769-5.769-5.769zM15.42 14.155c-.173.486-.879.914-1.336.969-.383.045-.823.136-2.583-.591-2.133-.879-3.482-3.129-3.585-3.268-.103-.139-.854-1.139-.854-2.172s.541-1.536.726-1.748c.184-.213.401-.266.533-.266.132 0 .264.001.381.006.126.006.294-.049.46.349.173.414.595 1.45.646 1.554.052.103.085.228.019.359-.066.132-.101.213-.198.328-.096.115-.205.253-.292.351-.096.107-.197.227-.083.424.113.197.502.833 1.08 1.353.748.673 1.369.882 1.567.986.197.103.313.086.429-.047.115-.132.497-.581.63-.781.132-.197.264-.165.446-.096.182.069 1.15.542 1.348.641.197.098.329.148.376.228.048.081.048.468-.125.954z"/></svg>
                                    </div>
                                </div>
                            </motion.button>
                        )) : (
                            <div className="col-span-full py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold text-2xl mb-8">No specific colleges found for this module.</p>
                                <Link href="https://wa.me/918281060462" target="_blank">
                                    <button className="bg-blue-600 text-white px-16 py-6 rounded-full font-black shadow-2xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95">Consult Admissions Expert</button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function CollegesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Loading Colleges</span>
            </div>
        }>
            <CollegesContent />
        </Suspense>
    );
}
