"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useColleges } from "@/hooks/useData";
import { CollegeCard } from "@/components/cards/CollegeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function CollegesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [locationFilter, setLocationFilter] = useState(searchParams.get("city") || "");

    const { data: colleges, isLoading, error } = useColleges();

    // Sync state with URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("q", searchTerm);
        if (locationFilter) params.set("city", locationFilter);
        console.log(filteredColleges)
        const query = params.toString();
        router.replace(query ? `?${query}` : "/colleges", { scroll: false });
    }, [searchTerm, locationFilter, router]);

    const filteredColleges = (colleges || []).filter((college) => {
        const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = locationFilter === "" ||
            college.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
            college.state.toLowerCase().includes(locationFilter.toLowerCase());

        return matchesSearch && matchesLocation;
    });

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
        <div className="bg-blue-100 min-h-screen py-16 lg:py-24">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col text-center items-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-blue-400 leading-tight">
                        Best Colleges in <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2563EB] to-[#60A5FA]">South India</span> After Plus Two
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Discover top-ranked institutions in Bangalore, Mangalore, Mysore, and Coimbatore.
                        Find the right campus for your UG or PG degree with expert admission assistance.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="bg-card p-4 md:p-8 rounded-3xl border border-border shadow-2xl max-w-5xl mx-auto mb-16 backdrop-blur-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-[#2563EB] transition-colors" />
                            <Input
                                placeholder="Search institutions by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 h-14 text-lg bg-background/50 border-border focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-white placeholder:text-slate-500 rounded-xl"
                            />
                        </div>
                        <div className="relative flex items-center group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-[#2563EB] transition-colors" />
                            <Input
                                type="text"
                                placeholder="Filter by City or State (e.g., Kochi)"
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="pl-12 h-14 text-lg bg-background/50 border-border focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all text-white placeholder:text-slate-500 rounded-xl"
                            />
                            {(searchTerm || locationFilter) && (
                                <Button
                                    variant="ghost"
                                    onClick={() => { setSearchTerm(""); setLocationFilter(""); }}
                                    className="absolute right-2 text-slate-500 hover:text-white hover:bg-white/5 h-10 px-3"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Results Grid - using single column for wider cards */}
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 text-sm text-slate-500 font-bold uppercase tracking-widest h-6">
                        {!isLoading && (
                            <>{filteredColleges.length} institution{filteredColleges.length !== 1 ? 's' : ''} available</>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 gap-8">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-40 w-full rounded-3xl bg-card border border-border" />
                            ))}
                        </div>
                    ) : filteredColleges.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8">
                            {filteredColleges.map((college, index) => (
                                <CollegeCard key={college.id} college={college} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 bg-card/30 rounded-3xl border border-border border-dashed">
                            <div className="p-6 bg-white/5 rounded-2xl mb-6">
                                <Search className="size-10 text-slate-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">No institutions found</h3>
                            <p className="text-slate-400 mb-8 max-w-sm text-center leading-relaxed">
                                We couldn&apos;t find any institutions matching your search criteria. Try a different city or name.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CollegesPage() {
    return (
        <Suspense fallback={
            <div className="bg-background min-h-screen flex flex-col items-center justify-center">
                <Loader2 className="size-16 text-[#60A5FA] animate-spin mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                <p className="text-slate-400 font-bold uppercase tracking-widest animate-pulse">Loading Colleges...</p>
            </div>
        }>
            <CollegesContent />
        </Suspense>
    );
}
