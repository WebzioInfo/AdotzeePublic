"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Home, BookOpen, Building2, Sparkles, Phone, MessageCircle, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore Colleges", href: "/colleges", icon: Building2 },
    { label: "Browse Courses", href: "/courses", icon: BookOpen },
    { label: "Add-on Skills", href: "/addons", icon: GraduationCap },
    { label: "Recommendations", href: "/recommendations", icon: Sparkles },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md z-100"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-101 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex justify-between items-center border-b border-gray-100">
                            <span className="text-xl font-black tracking-tighter text-foreground">Menu</span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                                        <item.icon className="w-5 h-5 text-gray-500 group-hover:text-brand-accent" />
                                    </div>
                                    <span className="text-lg font-bold text-foreground group-hover:text-brand-accent">{item.label}</span>
                                </Link>
                            ))}

                            <div className="pt-6">
                                <Link href="/recommendations" onClick={onClose}>
                                    <Button className="w-full h-14 rounded-2xl bg-brand-accent hover:bg-[#1D4ED8] text-white font-bold text-lg shadow-lg">
                                        Get Admission Guidance
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Footer Contact */}
                        <div className="p-8 bg-gray-50/50 space-y-4">
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Need Expert Help?</p>
                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href={`tel:${COMPANY_INFO.phone}`}
                                    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-brand-accent transition-colors gap-2"
                                >
                                    <Phone className="w-5 h-5 text-brand-accent" />
                                    <span className="text-xs font-bold text-gray-600">Call Now</span>
                                </a>
                                <a
                                    href={COMPANY_INFO.socials.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#22C55E] transition-colors gap-2"
                                >
                                    <MessageCircle className="w-5 h-5 text-[#22C55E]" />
                                    <span className="text-xs font-bold text-gray-600">WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
