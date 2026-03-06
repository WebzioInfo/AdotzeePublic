"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LuminousCTA() {
    return (
        <section className="py-40 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[900px] relative z-10 text-center">
                <div className="bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-[3rem] p-16 md:p-24 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-700 ease-out">

                    <div className="inline-block mb-10 px-6 py-2 rounded-full border border-[#60A5FA]/40 bg-blue-50/50 backdrop-blur-sm shadow-sm relative z-10">
                        <span className="text-xs font-black tracking-widest uppercase text-[#2563EB]">
                            Initiate Sequence
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-[#0F172A] tracking-tighter mb-8 relative z-10">
                        Ready to ascend?
                    </h2>

                    <p className="text-xl text-[#0F172A] opacity-80 font-medium mb-12 max-w-2xl mx-auto leading-loose relative z-10">
                        Synchronize your academic profile today and let our Luminous engine map your optimal future.
                    </p>

                    <Link href="/recommendations" className="relative z-10">
                        <Button className="h-16 px-12 rounded-full bg-[#2563EB] hover:bg-[#60A5FA] text-white font-bold text-xl transition-all shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_15px_40px_-5px_rgba(96,165,250,0.8)] hover:-translate-y-1">
                            Start Your Journey
                        </Button>
                    </Link>

                    {/* Vaporwave Hover Mesh inside CTA */}
                    <div className="absolute bottom-0 left-1/2 w-full h-full bg-gradient-to-t from-[#E0F2FE]/80 to-transparent blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-1/2 pointer-events-none mix-blend-multiply" />
                </div>
            </div>

            <div className="absolute bottom-[-20%] left-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-t from-[#F1F5F9] to-transparent rounded-full blur-[150px] mix-blend-multiply opacity-80 -translate-x-1/2 pointer-events-none animate-[blob_10s_infinite]" />
        </section>
    );
}

export function LuminousFooter() {
    return (
        <footer className="py-20 bg-transparent relative z-10 border-t border-slate-200/50">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="relative h-6 w-28 block mb-8">
                            <Image
                                src="/Logos/AdotzeeLogoTextNoBG.png"
                                alt="Adotzee"
                                fill
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-[#0F172A] opacity-60 font-medium leading-loose text-sm pr-4">
                            The Luminous framework for academic synchronization and institutional discovery.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#0F172A] mb-8">Discovery</h4>
                        <ul className="space-y-4 text-[#0F172A] opacity-70 font-medium">
                            <li><Link href="/courses" className="hover:text-[#2563EB] transition-colors">Courses Matrix</Link></li>
                            <li><Link href="/colleges" className="hover:text-[#2563EB] transition-colors">Verified Hubs</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#0F172A] mb-8">System</h4>
                        <ul className="space-y-4 text-[#0F172A] opacity-70 font-medium">
                            <li><Link href="/about" className="hover:text-[#2563EB] transition-colors">Architecture</Link></li>
                            <li><Link href="/contact" className="hover:text-[#2563EB] transition-colors">Operations</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#0F172A] mb-8">Legal</h4>
                        <ul className="space-y-4 text-[#0F172A] opacity-70 font-medium">
                            <li><Link href="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy Protocol</Link></li>
                            <li><Link href="/terms" className="hover:text-[#2563EB] transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center text-sm text-[#0F172A] opacity-50 font-medium">
                    <span>© {new Date().getFullYear()} Adotzee Intelligence. All rights synchronized.</span>
                    <div className="flex space-x-6 mt-4 md:mt-0 items-center">
                        <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" /> Status: Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
