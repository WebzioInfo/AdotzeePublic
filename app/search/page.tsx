"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2, BookOpen, Building2, Award } from "lucide-react";
import { CourseCard } from "@/components/cards/CourseCard";
import { CollegeCard } from "@/components/cards/CollegeCard";
import { AddonCard } from "@/components/cards/AddonCard";
import { Course, College, AddonCourse } from "@/types";

import { useGlobalSearch } from "@/hooks/useData";

function SearchInterface() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [activeQuery, setActiveQuery] = useState(initialQuery);

    const { data, isLoading, error } = useGlobalSearch(activeQuery);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() !== activeQuery) {
            setActiveQuery(query.trim());
            // Update URL params
            const newUrl = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "/search";
            window.history.replaceState(null, '', newUrl);
        }
    };

    const hasResults = data && (data.courses.length > 0 || data.colleges.length > 0 || data.addons.length > 0);

    if (error) {
        return (
            <div className="container py-20 px-4 text-center">
                <div className="bg-red-50 text-red-800 p-8 rounded-3xl border border-red-100 max-w-2xl mx-auto shadow-sm">
                    <h2 className="text-2xl font-bold mb-3">Search Service Unavailable</h2>
                    <p className="mb-6 opacity-80">We're experiencing issues with our search engine. Please try again in a few moments.</p>
                    <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 rounded-xl px-8 h-12">
                        Retry Search
                    </Button>
                </div>
            </div>
        );
    }



    return (
        <div className="bg-background min-h-screen">
            <div className="container py-16 md:py-24 px-4 md:px-6 mx-auto">
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8">
                        Global <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2563EB] to-[#60A5FA]">Search</span>
                    </h1>
                    <form onSubmit={handleSearch} className="relative flex items-center bg-card rounded-2xl p-2.5 shadow-2xl border border-border group focus-within:ring-4 focus-within:ring-[#2563EB]/20 transition-all">
                        <div className="flex-1 flex items-center px-4">
                            <SearchIcon className="size-6 text-slate-500 mr-3 shrink-0 group-focus-within:text-[#2563EB] transition-colors" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search courses, colleges, or addons..."
                                className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-xl px-0 h-14 text-white placeholder:text-slate-500"
                                autoFocus
                            />
                        </div>
                        <Button type="submit" size="lg" className="h-14 px-10 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-lg font-bold ml-2 transition-all">
                            Discovery
                        </Button>
                    </form>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 className="size-16 text-[#60A5FA] animate-spin mb-6" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Consulting the Knowledge Graph...</p>
                    </div>
                ) : activeQuery && !hasResults ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-card/30 rounded-3xl border border-border border-dashed">
                        <div className="p-6 bg-white/5 rounded-2xl mb-6">
                            <SearchIcon className="size-10 text-slate-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">No matches found</h2>
                        <p className="text-slate-400 max-w-md leading-relaxed">No entities matching <span className="text-white font-bold italic">"{activeQuery}"</span> were identified in our database. Try alternative keywords.</p>
                    </div>
                ) : activeQuery && hasResults ? (
                    <div className="space-y-24 animate-in fade-in duration-700">
                        <h2 className="text-xl font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-border pb-6 flex items-center justify-between">
                            <span>Intelligence Report for <span className="text-white italic">"{activeQuery}"</span></span>
                        </h2>

                        {data.courses.length > 0 && (
                            <section className="space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-[#2563EB]/20 text-[#60A5FA] rounded-xl border border-white/5"><BookOpen className="size-6" /></div>
                                    <h2 className="text-3xl font-black text-white">Programs Identified</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {data.courses.map(course => <CourseCard key={course.id} course={course} />)}
                                </div>
                            </section>
                        )}

                        {data.colleges.length > 0 && (
                            <section className="space-y-10">
                                <div className="flex items-center gap-4 pt-16 border-t border-border">
                                    <div className="p-3 bg-[#2563EB]/20 text-[#60A5FA] rounded-xl border border-white/5"><Building2 className="size-6" /></div>
                                    <h2 className="text-3xl font-black text-white">Partner Institutions</h2>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {data.colleges.map(college => <CollegeCard key={college.id} college={college} />)}
                                </div>
                            </section>
                        )}

                        {data.addons.length > 0 && (
                            <section className="space-y-10">
                                <div className="flex items-center gap-4 pt-16 border-t border-border">
                                    <div className="p-3 bg-[#2563EB]/20 text-[#60A5FA] rounded-xl border border-white/5"><Award className="size-6" /></div>
                                    <h2 className="text-3xl font-black text-white">Addon Specializations</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl">
                                    {data.addons.map(addon => <AddonCard key={addon.id} addon={addon} />)}
                                </div>
                            </section>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 opacity-30 text-center">
                        <SearchIcon className="size-24 text-slate-400 mb-6" />
                        <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Awaiting Input Query</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#60A5FA] size-8" /></div>}>
            <SearchInterface />
        </Suspense>
    )
}
