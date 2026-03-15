"use client";

import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiClient } from "@/services/apiClient";
import { Loader2, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

function CoursesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const stream = searchParams.get("stream") || "";
    const streamName = searchParams.get("streamName") || "";

    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!stream) {
            router.push("/");
            return;
        }

        const fetchCourses = async () => {
            setLoading(true);
            try {
                console.log(stream);
                const data = await apiClient.get(`/Courses/filter?stream=${stream}`);
                setCourses(Array.isArray(data) ? data : []);
            } catch (err: any) {
                console.log(err)
                setError(err.message || "Failed to load courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [stream, router]);

    const handleCourseSelect = (courseId: string, courseName: string) => {
        router.push(`/addons?courseId=${courseId}&courseName=${encodeURIComponent(courseName)}&streamName=${encodeURIComponent(streamName)}&stream=${stream}`);
    };

    return (
        <main className="min-h-screen bg-white py-24 px-6 relative overflow-hidden">
            {/* Aesthetic backgrounds to match Hero */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-50 rounded-full blur-[120px] opacity-40" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Navigation */}
                <Link href="/" className="inline-flex items-center text-slate-400 font-bold hover:text-blue-600 transition-colors group mb-12">
                    <div className="p-2 rounded-full bg-slate-50 group-hover:bg-blue-50 mr-4 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    Back to Streams
                </Link>

                {/* Header */}
                <div className="mb-16">
                    <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-blue-600 font-black uppercase tracking-widest text-sm"
                    >
                        Step 02
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 mt-4 tracking-tighter"
                    >
                        Available Courses in <br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">{streamName}</span>
                    </motion.h1>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
                        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Fetching Admissions...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 p-12 rounded-[3rem] border border-red-100 text-center">
                        <p className="text-red-600 font-bold mb-8 text-xl">{error}</p>
                        <button onClick={() => window.location.reload()} className="bg-slate-900 text-white px-12 py-4 rounded-full font-black hover:bg-slate-800 transition-all">Retry</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courses.length > 0 ? courses.map((course, idx) => (
                            <motion.button
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => handleCourseSelect(course.id, course.name || course.title)}
                                className="group p-8 text-left bg-white border-2 border-slate-50 rounded-[2.5rem] hover:border-blue-500 hover:shadow-2xl transition-all flex justify-between items-center"
                            >
                                <div className="flex flex-col">
                                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">Course Module</span>
                                    <span className="text-2xl font-black text-slate-800 leading-tight">{course.name || course.title}</span>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-sm">
                                    <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
                                </div>
                            </motion.button>
                        )) : (
                            <div className="col-span-full py-24 text-center">
                                <p className="text-slate-400 font-bold text-xl mb-6 italic">No courses found matching this header.</p>
                                <Link href="/" className="text-blue-600 font-black underline decoration-2 underline-offset-8">Try another stream</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function CoursesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Loading Courses</span>
            </div>
        }>
            <CoursesContent />
        </Suspense>
    );
}
