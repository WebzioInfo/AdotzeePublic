"use client";

import { AddonCard } from "@/components/cards/AddonCard";
import { AddonCourse } from "@/types";

const mockAddons: AddonCourse[] = [
    {
        id: "1",
        name: "Full Stack Web Development",
        description: "Learn React, Node.js, and MongoDB to become a complete web developer. Includes hands-on projects and industry mentorship.",
        duration: "6 Months",
        certifyingBody: "IBM",
        price: 45000,
        isActive: true,
    },
    {
        id: "2",
        name: "Digital Marketing Mastery",
        description: "Master SEO, SEM, Social Media, and Analytics. Prepare for Google and HubSpot certifications.",
        duration: "3 Months",
        certifyingBody: "Google",
        price: 20000,
        isActive: true,
    },
    {
        id: "3",
        name: "Data Science with Python",
        description: "Comprehensive introduction to data visualization, machine learning algorithms, and statistical modeling.",
        duration: "4 Months",
        certifyingBody: "Microsoft",
        price: 35000,
        isActive: true,
    },
    {
        id: "4",
        name: "Financial Modeling & Valuation",
        description: "Learn to build financial models from scratch for investment banking and corporate finance roles.",
        duration: "2 Months",
        certifyingBody: "NSE",
        price: 15000,
        isActive: true,
    }
];

export default function AddonsPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Header section */}
            <div className="bg-linear-to-b from-[#0A1550] to-[#020617] py-24 text-white relative overflow-hidden border-b border-border shadow-2xl">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2563EB]/5 rounded-full blur-[150px] -mr-96 -mt-96"></div>
                <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
                            Skill <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2563EB] to-[#60A5FA]">Certifications</span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed font-light mx-auto max-w-2xl">
                            Improve your career opportunities with specialized certificates and industry-verified training programs.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container px-4 md:px-6 py-24 mx-auto mb-20">
                <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
                    {mockAddons.map((addon, index) => (
                        <AddonCard key={addon.id} addon={addon} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
