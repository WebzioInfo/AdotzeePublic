"use client";

import { motion } from "framer-motion";
import { College } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { MapPin, Building, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface CollegeCardProps {
    college: College;
    index?: number;
}

export function CollegeCard({ college, index = 0 }: CollegeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Link href={`/colleges/${college.id}`} className="block h-full">
                <Card className="overflow-hidden transition-all duration-300 bg-[#111827] border-[#1E293B] hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] group">
                    <div className="flex flex-col sm:flex-row h-full sm:h-44">
                        {/* Image Section - Slimmer */}
                        <div className="relative w-full sm:w-1/4 h-48 sm:h-full bg-[#0A1550]/20 overflow-hidden shrink-0">
                            {college.imageUrl ? (
                                <img
                                    src={college.imageUrl}
                                    alt={college.name}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[#0A1550]/40 to-[#070F38]/40">
                                    <Building className="size-10 text-white/5" />
                                </div>
                            )}
                            {college.rating && (
                                <div className="absolute top-2 left-2 bg-[#2563EB] px-2 py-0.5 rounded flex items-center gap-1 font-black text-[10px] text-white shadow-lg">
                                    <Star className="size-3 fill-white text-white" />
                                    <span>{college.rating}</span>
                                </div>
                            )}
                        </div>

                        {/* Content Section - Compact */}
                        <div className="flex flex-col flex-1 p-4 lg:px-8 lg:py-4 justify-center">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <h3 className="font-black text-xl lg:text-2xl text-[#F1F5F9] group-hover:text-[#60A5FA] transition-colors line-clamp-1">
                                    {college.name}
                                </h3>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                                    <MapPin className="size-3.5 text-[#2563EB]" />
                                    <span>{college.city}, {college.state}</span>
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm line-clamp-1 mb-4 leading-relaxed hidden sm:block">
                                {college.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                                <div className="flex gap-2">
                                    {college.accreditation?.slice(0, 2).map((acc, i) => (
                                        <Badge key={i} className="text-[9px] h-5 bg-[#0A1550]/50 border-white/10 text-[#60A5FA] font-black uppercase tracking-tighter">
                                            {acc}
                                        </Badge>
                                    ))}
                                    <span className="text-[10px] font-bold text-slate-500 py-1 px-1">Est. {college.establishedYear}</span>
                                </div>
                                <Button size="sm" className="h-9 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all font-black rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-[#2563EB]/20">
                                    Institution Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}
