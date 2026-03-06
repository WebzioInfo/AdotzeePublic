"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCourses } from "@/hooks/useData";
import { CourseCard } from "@/components/cards/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, FilterX, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function CoursesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [levelFilter, setLevelFilter] = useState(searchParams.get("level") || "all");
    const [streamFilter, setStreamFilter] = useState(searchParams.get("stream") || "all");

    const { data: courses, isLoading, error } = useCourses();

    // Sync state with URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("q", searchTerm);
        if (levelFilter !== "all") params.set("level", levelFilter);
        if (streamFilter !== "all") params.set("stream", streamFilter);

        const query = params.toString();
        router.replace(query ? `?${query}` : "/courses", { scroll: false });
    }, [searchTerm, levelFilter, streamFilter, router]);

    const filteredCourses = (courses || []).filter((course) => {
        const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = levelFilter === "all" || course.level === levelFilter;
        const matchesStream = streamFilter === "all" || course.stream === streamFilter;

        return matchesSearch && matchesLevel && matchesStream;
    });

    const clearFilters = () => {
        setSearchTerm("");
        setLevelFilter("all");
        setStreamFilter("all");
    };

    if (error) {
        return (
            <div className="container px-4 py-20 mx-auto text-center">
                <div className="bg-red-50 text-red-800 p-6 rounded-2xl border border-red-100 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-2">Service Temporarily Unavailable</h2>
                    <p>We're having trouble connecting to the Adotzee backend. Please try again later.</p>
                    <Button onClick={() => window.location.reload()} className="mt-4 bg-red-600 hover:bg-red-700">
                        Retry Connection
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen">
            <div className="container px-4 md:px-6 py-16 lg:py-24 mx-auto">
                <div className="flex flex-col mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                        Discover <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2563EB] to-[#60A5FA]">Courses</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
                        Unlock your future with our curated list of premier academic programs. Use precision filters to find your ideal career path.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-6 lg:sticky lg:top-28">
                        <div className="bg-card p-6 rounded-2xl border border-border shadow-xl space-y-8 backdrop-blur-sm">
                            <div className="flex items-center justify-between border-b border-border pb-4">
                                <h3 className="font-bold text-xl text-white">Filters</h3>
                                {(searchTerm || levelFilter !== "all" || streamFilter !== "all") && (
                                    <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-slate-400 hover:text-white hover:bg-white/5">
                                        <FilterX className="size-4 mr-1.5" /> Clear
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Search</label>
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-[#2563EB] transition-colors" />
                                    <Input
                                        placeholder="E.g., Computer Science"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-background/50 border-border focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Level</label>
                                <Select value={levelFilter} onValueChange={setLevelFilter}>
                                    <SelectTrigger className="bg-background/50 border-border h-11">
                                        <SelectValue placeholder="All Levels" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-border">
                                        <SelectItem value="all">All Levels</SelectItem>
                                        <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                                        <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Stream</label>
                                <Select value={streamFilter} onValueChange={setStreamFilter}>
                                    <SelectTrigger className="bg-background/50 border-border h-11">
                                        <SelectValue placeholder="All Streams" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-border">
                                        <SelectItem value="all">All Streams</SelectItem>
                                        <SelectItem value="Science">Science</SelectItem>
                                        <SelectItem value="Commerce">Commerce</SelectItem>
                                        <SelectItem value="Arts">Arts</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-1 min-w-0 w-full">
                        <div className="mb-8 flex items-center justify-between h-6">
                            <div className="text-sm text-slate-500 font-semibold tracking-wide uppercase">
                                {!isLoading && (
                                    <>{filteredCourses.length} results found</>
                                )}
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} className="h-44 w-full rounded-2xl bg-card border border-border" />
                                ))}
                            </div>
                        ) : filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {filteredCourses.map((course, index) => (
                                    <CourseCard key={course.id} course={course} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 bg-card/30 rounded-3xl border border-border border-dashed">
                                <div className="p-6 bg-white/5 rounded-2xl mb-6">
                                    <Search className="size-10 text-slate-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">No programs found</h3>
                                <p className="text-slate-400 mb-8 max-w-sm text-center leading-relaxed">
                                    We couldn&apos;t find any programs matching your current filters. Try broadening your criteria.
                                </p>
                                <Button onClick={clearFilters} variant="secondary" className="font-bold border border-white/5">
                                    Reset Discovery
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CoursesPage() {
    return (
        <Suspense fallback={
            <div className="container px-4 py-20 mx-auto flex flex-col items-center justify-center">
                <Loader2 className="size-10 text-[#60A5FA] animate-spin mb-4" />
                <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Scanning Course Registry</p>
            </div>
        }>
            <CoursesContent />
        </Suspense>
    );
}
