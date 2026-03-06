"use client";

import { motion } from "framer-motion";
import { Course } from "../../types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { GraduationCap, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface CourseCardProps {
    course: Course;
    index?: number;
    featured?: boolean;
}

export function CourseCard({ course, index = 0, featured = false }: CourseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Card className={cn(
                "overflow-hidden transition-all duration-300 bg-[#111827] border-[#1E293B] hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]",
                featured ? "border-[#2563EB]/40 shadow-[0_0_15px_rgba(37,99,235,0.1)]" : ""
            )}>
                <div className="flex flex-col sm:flex-row h-full sm:h-44">
                    {/* Image Section - Compact Rectangle */}
                    <div className="relative w-full sm:w-1/4 h-48 sm:h-full bg-[#0A1550]/20 overflow-hidden shrink-0">
                        {course.imageUrl ? (
                            <img
                                src={course.imageUrl}
                                alt={course.name}
                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1550]/40 to-[#070F38]/40 flex items-center justify-center">
                                <GraduationCap className="size-10 text-white/5" />
                            </div>
                        )}
                        <div className="absolute top-2 left-2">
                            <Badge className="bg-[#2563EB] text-[10px] h-5 px-2 text-white hover:bg-[#1D4ED8] shadow-sm font-bold">
                                {course.level}
                            </Badge>
                        </div>
                    </div>

                    <CardContent className="flex-1 p-4 lg:px-8 lg:py-4 flex flex-col justify-center">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="font-black text-xl lg:text-2xl text-[#F1F5F9] transition-colors group-hover:text-[#60A5FA] line-clamp-1">
                                {course.name}
                            </h3>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] bg-[#2563EB]/10 px-2.5 py-1 rounded-lg border border-[#2563EB]/20">
                                    <Clock className="size-3.5" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="text-sm font-black text-white">
                                    {course.feeRange || "Enquire"}
                                </div>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed max-w-3xl">
                            {course.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-2 py-1">Target:</span>
                                {course.careerOpportunities?.slice(0, 3).map((career, i) => (
                                    <span key={i} className="text-[10px] font-bold bg-[#1E293B] text-slate-300 px-2 py-0.5 rounded border border-white/5">
                                        {career}
                                    </span>
                                ))}
                            </div>

                            <Link href={`/courses/${course.id}`} className="shrink-0 ml-4">
                                <Button variant="ghost" size="sm" className="h-9 px-4 text-[#60A5FA] hover:text-white hover:bg-[#2563EB] rounded-xl font-black transition-all group/btn">
                                    View Program
                                    <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </motion.div>
    );
}
