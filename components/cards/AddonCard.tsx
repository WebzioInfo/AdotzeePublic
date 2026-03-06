"use client";

import { motion } from "framer-motion";
import { AddonCourse } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Award, Clock, IndianRupee } from "lucide-react";
import { Button } from "../ui/button";
import { useUiStore } from "../../store/useUiStore";

interface AddonCardProps {
    addon: AddonCourse;
    index?: number;
}

export function AddonCard({ addon, index = 0 }: AddonCardProps) {
    const openLeadModal = useUiStore((state) => state.openLeadModal);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="h-full"
        >
            <Card className="overflow-hidden transition-all duration-300 bg-[#111827] border-[#1E293B] hover:border-[#2563EB]/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] group">
                <div className="flex flex-col sm:flex-row h-full sm:h-36">
                    {/* Left Icon/Body Section */}
                    <div className="w-full sm:w-32 whitespace-nowrap bg-[#0A1550]/20 flex items-center justify-center p-4 sm:p-0 shrink-0 border-r border-white/5">
                        <div className="p-3.5 rounded-2xl bg-[#2563EB]/10 text-[#60A5FA] border border-[#2563EB]/20 group-hover:scale-110 transition-transform">
                            <Award className="size-8" />
                        </div>
                    </div>

                    <div className="flex-1 p-4 lg:px-8 lg:py-4 flex flex-col justify-center">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                            <h3 className="font-black text-xl lg:text-2xl text-white group-hover:text-[#60A5FA] transition-colors line-clamp-1">
                                {addon.name}
                            </h3>
                            <Badge className="bg-white/5 border-white/10 text-[#60A5FA] font-black h-6 text-[10px] uppercase">
                                {addon.certifyingBody}
                            </Badge>
                        </div>

                        <p className="text-slate-400 text-sm line-clamp-1 mb-3 max-w-2xl">
                            {addon.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-white/5 pt-3">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                                    <Clock className="size-3.5 text-[#2563EB]" />
                                    <span>{addon.duration}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] bg-[#2563EB]/10 px-2 py-0.5 rounded">
                                    <IndianRupee className="size-3" />
                                    <span>{addon.price.toLocaleString()}</span>
                                </div>
                            </div>

                            <Button
                                size="sm"
                                className="h-9 px-6 bg-[#0A1550] border border-[#2563EB]/30 text-white hover:bg-[#2563EB] transition-all font-black text-[10px] uppercase tracking-widest rounded-xl"
                                onClick={() => openLeadModal(`Interested in Addon: ${addon.name}`)}
                            >
                                Enquire Now
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
