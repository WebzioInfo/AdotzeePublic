"use client";

import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "@/services/apiClient";
import { Loader2, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

function AddonsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    // Params from previous steps
    const stream = searchParams.get("stream") || "";
    const streamName = searchParams.get("streamName") || "";
    const courseId = searchParams.get("courseId") || "";
    const courseName = searchParams.get("courseName") || "";

    const [addons, setAddons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseId) {
            router.push("/courses");
            return;
        }

        const fetchAddons = async () => {
            setLoading(true);
            try {
                const data = await apiClient.get(`/Addons/by-course/${courseId}`);
                const addonList = Array.isArray(data) ? data : [];
                setAddons(addonList);
                
                // If no addons exist, we can optionally auto-redirect to colleges
                // But let's show a "General" option first to stay consistent
            } catch (err: any) {
                // If the endpoint fails or 404s, we assume no specializations
                setAddons([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAddons();
    }, [courseId, router]);

    const handleAddonSelect = (addonId: string, addonName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("addonId", addonId);
        params.set("addonName", addonName);
        router.push(`/colleges?${params.toString()}`);
    };

    return (
        <main className="min-h-screen bg-white py-24 px-6 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-40" />
            
            <div className="max-w-5xl mx-auto relative z-10">
                {/* Navigation */}
                <button 
                    onClick={() => router.back()} 
                    className="inline-flex items-center text-slate-400 font-bold hover:text-blue-600 transition-colors group mb-12"
                >
                    <div className="p-2 rounded-full bg-slate-50 group-hover:bg-blue-50 mr-4 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    Back to Courses
                </button>

                {/* Header */}
                <div className="mb-16">
                    <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-blue-600 font-black uppercase tracking-widest text-sm"
                    >
                        Step 03
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-slate-900 mt-4 tracking-tighter leading-tight"
                    >
                        Pick a Specialization for<br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">{courseName}</span>
                    </motion.h1>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
                        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Loading Modules...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Always show a "No Specialization" or "General" option */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => handleAddonSelect("", "None")}
                            className="bg-white p-10 rounded-[3rem] border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 transition-all text-left group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-slate-50 group-hover:bg-blue-100 transition-colors">
                                    <Sparkles className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">Option A</div>
                            </div>
                            <span className="text-2xl font-black text-slate-800 block mb-2">General Admission</span>
                            <p className="text-slate-500 font-medium">Proceed with the standard {courseName} curriculum without additional modules.</p>
                        </motion.button>

                        {addons.map((addon, idx) => (
                            <motion.button
                                key={addon.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx + 1) * 0.1 }}
                                onClick={() => handleAddonSelect(addon.id, addon.name || addon.title)}
                                className="bg-white p-10 rounded-[3rem] border-2 border-slate-50 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all text-left group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 rounded-2xl bg-blue-50 group-hover:bg-blue-600 transition-colors">
                                        <Sparkles className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-300">Specialization</div>
                                </div>
                                <span className="text-2xl font-black text-slate-800 block mb-2">{addon.name || addon.title}</span>
                                <p className="text-slate-500 font-medium italic">Enhance your {courseName} degree with specialized industry-led training.</p>
                                <div className="mt-8 flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                                    Explore this path <ChevronRight className="ml-2 w-5 h-5" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function AddonsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Loading Modules</span>
            </div>
        }>
            <AddonsContent />
        </Suspense>
    );
}
