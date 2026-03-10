"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/constants";

export function LuminousCTA() {
    return (
        <section className="py-20 md:py-40 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[900px] relative z-10 text-center">
                <div className="bg-white/30 backdrop-blur-2xl border border-white/60 shadow-white-glow rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-24 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-700 ease-out">

                    <div className="inline-block mb-10 px-6 py-2 rounded-full border border-[#60A5FA]/40 bg-blue-50/50 backdrop-blur-sm shadow-sm relative z-10">
                        <span className="text-xs font-black tracking-widest uppercase text-[#2563EB]">
                            South India Admission Authority
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-[#0F172A] tracking-tighter mb-8 relative z-10">
                        Ready to find your college?
                    </h2>

                    <p className="text-xl text-[#0F172A] opacity-80 font-medium mb-12 max-w-2xl mx-auto leading-loose relative z-10">
                        Talk to an expert today for direct admission guidance to premier colleges in Bangalore, Mangalore, Mysore, and Coimbatore.
                    </p>

                    <Link href={COMPANY_INFO.socials.whatsapp} target="_blank" className="relative z-10">
                        <Button className="h-14 md:h-16 px-10 md:px-12 rounded-full bg-brand-accent hover:bg-brand-accent/80 text-white font-bold text-lg md:text-xl transition-all shadow-brand-glow hover:shadow-brand-glow-lg hover:-translate-y-1">
                            Talk to an Admission Expert
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
                        <Link href="/" className="flex items-center gap-2 mb-8">
                            <Image
                                src="/Logos/AdotzeeLogoNoBG2.png"
                                alt="Adotzee Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />

                            <Image
                                src="/Logos/AdotzeeLogoTextNoBG2.png"
                                alt="Adotzee"
                                width={110}
                                height={32}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-[#0F172A] opacity-60 font-medium leading-loose text-sm pr-4">
                            Your trusted admission consultancy for top colleges in Bangalore, Mangalore, and across South India.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-foreground mb-8">Consultancy</h4>
                        <ul className="space-y-4 text-foreground opacity-70 font-medium">
                            <li><Link href="/courses" className="hover:text-brand-accent transition-colors">Degrees After Plus Two</Link></li>
                            <li><Link href="/colleges" className="hover:text-brand-accent transition-colors">Top Colleges</Link></li>
                            <li><Link href="/addons" className="hover:text-brand-accent transition-colors">Skill Certifications</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-foreground mb-8">Lead Contact</h4>
                        <ul className="space-y-4 text-foreground opacity-70 font-medium">
                            <li><a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-brand-accent transition-colors">{COMPANY_INFO.email}</a></li>
                            <li><a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`} className="hover:text-brand-accent transition-colors">{COMPANY_INFO.phone}</a></li>
                            <li><a href={COMPANY_INFO.socials.whatsapp} target="_blank" className="hover:text-brand-accent transition-colors">WhatsApp Expert</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-foreground mb-8">Social</h4>
                        <ul className="space-y-4 text-foreground opacity-70 font-medium">
                            <li><a href={COMPANY_INFO.socials.instagram} target="_blank" className="hover:text-brand-accent transition-colors">Instagram</a></li>
                            <li><a href={COMPANY_INFO.socials.facebook} target="_blank" className="hover:text-brand-accent transition-colors">Facebook</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center text-sm text-[#0F172A] opacity-50 font-medium">

                    <span>
                        © {new Date().getFullYear()} Adotzee. All rights synchronized.
                    </span>

                    <div className="flex space-x-6 mt-4 md:mt-0 items-center">



                        {/* Webzio watermark */}
                        <a
                            href="https://www.webziointernational.in"
                            target="_blank"
                            className="text-xs text-slate-400 hover:text-blue-500 transition-colors font-medium"
                        >
                            Built by Webzio
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    );
}
