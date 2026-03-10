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
            className=""
        >
            <Link href={`/colleges/${college.id}`} className="block ">
                <Card className="overflow-hidden transition-all duration-300 bg-[#111827] border-[#1E293B] hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] group">
                    <div className="flex flex-col sm:flex-row ">


                        {/* Content Section - Compact */}
                        <div className="flex flex-col flex-1 p-4 lg:px-8 lg:py-1 justify-center">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0 mb-1">
                                <h3 className="font-black text-xl lg:text-2xl text-[#F1F5F9] group-hover:text-[#60A5FA] transition-colors line-clamp-1">
                                    {college.name}
                                </h3>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                                    <MapPin className="size-3.5 text-[#2563EB]" />
                                    <span>{college.address}</span>
                                </div>
                            </div>


                            <div className="flex items-center justify-end mt-auto pt-2 border-t border-white/5">

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
