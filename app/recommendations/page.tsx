"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Target, MapPin, GraduationCap, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CourseCard } from "@/components/cards/CourseCard";
import { Course, College } from "@/types";
import { CollegeCard } from "@/components/cards/CollegeCard";

import { useRecommendations } from "@/hooks/useData";
import { AddonCard } from "@/components/cards/AddonCard";
import { AddonCourse } from "@/types";

export default function RecommendationsPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        interests: "",
        stream: "Science",
        location: "",
    });

    const mutation = useRecommendations();
    const results = mutation.data;
    const isLoading = mutation.isPending;

    const handleNext = () => setStep((s) => Math.min(s + 1, 3));
    const handleBack = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) {
            handleNext();
            return;
        }

        mutation.mutate({
            interests: formData.interests,
            budget: 0, // Default for now
            location: formData.location,
            preferredStream: formData.stream,
        });
    };

    const currentStepVariant = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    if (results) {
        return (
            <div className="bg-background min-h-screen py-16 px-4 md:px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        <div className="inline-flex justify-center items-center size-20 rounded-2xl bg-[#2563EB]/10 text-[#60A5FA] mb-10 relative border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-[#2563EB]/30 rounded-2xl animate-pulse blur-xl"></div>
                            <Sparkles className="size-10 relative z-10 drop-shadow-[0_0_10px_rgba(96,165,250,1)]" />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6">
                            Architected <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2563EB] to-[#60A5FA]">Solutions</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                            Our proprietary engine has synthesized your parameters to identify these high-value academic pathways.
                        </p>
                    </div>

                    <div className="max-w-7xl mx-auto space-y-24">
                        {results.courses && results.courses.length > 0 && (
                            <div className="space-y-10 group">
                                <h2 className="text-2xl font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 pb-6 flex items-center">
                                    <GraduationCap className="mr-3 size-7 text-[#2563EB]" /> Core Programs
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {results.courses.map((course) => (
                                        <CourseCard key={course.id} course={course} featured />
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.colleges && results.colleges.length > 0 && (
                            <div className="space-y-10">
                                <h2 className="text-2xl font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 pb-6 flex items-center">
                                    <MapPin className="mr-3 size-7 text-[#2563EB]" /> Institution Matches
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {results.colleges.map((college) => (
                                        <CollegeCard key={college.id} college={college} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.addons && results.addons.length > 0 && (
                            <div className="space-y-10">
                                <h2 className="text-2xl font-bold text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 pb-6 flex items-center">
                                    <Sparkles className="mr-3 size-7 text-[#2563EB]" /> Professional Boosters
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {results.addons.map((addon) => (
                                        <AddonCard key={addon.id} addon={addon} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {(!results.courses?.length && !results.colleges?.length && !results.addons?.length) && (
                            <div className="text-center py-32 bg-card/30 rounded-3xl border border-dashed border-border backdrop-blur-sm">
                                <p className="text-slate-400 text-lg">No definitive matches identified. Please broaden your specific interest parameters.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-24 text-center">
                        <Button onClick={() => { mutation.reset(); setStep(1); }} variant="outline" className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5 px-10 h-14 rounded-xl">
                            Restart Intelligence Scan
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-[#020617] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#2563EB]/10 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#0A1550]/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse animation-delay-2000"></div>

            <div className="w-full max-w-2xl relative z-10">
                <div className="text-center mb-12 hidden sm:block">
                    <div className="inline-flex p-4 bg-[#2563EB]/10 rounded-2xl border border-white/5 mb-6 shadow-inner">
                        <Bot className="size-16 text-[#60A5FA] drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Adotzee Intelligence</h1>
                    <p className="text-xl text-slate-400 font-light">Synthesizing global education data for your unique profile.</p>
                </div>

                <div className="bg-card/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/5 p-8 md:p-12 overflow-hidden relative">

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                        <motion.div
                            className="h-full bg-linear-to-r from-[#2563EB] to-[#60A5FA] shadow-[0_0_10px_#2563EB]"
                            initial={{ width: `${((step - 1) / 3) * 100}%` }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
                            <Loader2 className="size-20 text-[#60A5FA] animate-spin mb-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                            <h3 className="text-3xl font-black text-white mb-4">Processing Engine</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">Extracting relevant vectors and calculating compatibility scores...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col min-h-[350px]">
                            <AnimatePresence mode="wait">

                                {/* STEP 1 */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        variants={currentStepVariant}
                                        initial="hidden" animate="visible" exit="exit"
                                        className="flex-1"
                                    >
                                        <div className="mb-8 flex items-center text-[#60A5FA] bg-[#2563EB]/10 w-fit px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/5">
                                            <Target className="size-4 mr-2" /> Vector Input Phase
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-4 leading-tight">What are you passionate about?</h2>
                                        <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">Detail your academic interests, professional ambitions, or core passions.</p>

                                        <div className="space-y-4">
                                            <Label htmlFor="interests" className="text-slate-300 font-bold uppercase tracking-widest text-xs">Primary Interest Field</Label>
                                            <Input
                                                id="interests"
                                                autoFocus
                                                placeholder="e.g., Quantum Computing, Neurobiology, International Law..."
                                                className="h-16 text-xl bg-background/50 border-border focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-white transition-all rounded-xl placeholder:text-slate-600"
                                                value={formData.interests}
                                                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="mt-8 flex flex-wrap gap-3">
                                            {["Technology", "Finance", "Healthcare", "Design", "Legal", "Research"].map(tag => (
                                                <Badge key={tag} onClick={() => setFormData({ ...formData, interests: `${formData.interests} ${tag}`.trim() })} className="bg-white/5 hover:bg-[#2563EB]/20 text-slate-400 hover:text-[#60A5FA] cursor-pointer border border-white/5 hover:border-[#2563EB]/50 transition-all py-1.5 px-4 rounded-xl">
                                                    + {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2 */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        variants={currentStepVariant}
                                        initial="hidden" animate="visible" exit="exit"
                                        className="flex-1"
                                    >
                                        <div className="mb-8 flex items-center text-[#60A5FA] bg-[#2563EB]/10 w-fit px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/5">
                                            <GraduationCap className="size-4 mr-2" /> Vertical Selection
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-4 leading-tight">Domain Selection?</h2>
                                        <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">Select the core academic vertical for your future path.</p>

                                        <RadioGroup
                                            value={formData.stream}
                                            onValueChange={(v) => setFormData({ ...formData, stream: v })}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                                        >
                                            {[
                                                { id: "Science", desc: "STEM, Innovation, Medicine" },
                                                { id: "Commerce", desc: "Corporate, Analytics, Trade" },
                                                { id: "Arts", desc: "Culture, Media, Psychology" },
                                                { id: "Any", desc: "Interdisciplinary Exploration" }
                                            ].map((item) => (
                                                <Label
                                                    key={item.id}
                                                    htmlFor={item.id}
                                                    className={`flex flex-col items-start p-6 border rounded-2xl cursor-pointer transition-all duration-300 ${formData.stream === item.id
                                                        ? "border-[#2563EB] bg-[#2563EB]/10 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                                                        : "border-border bg-background/50 hover:bg-white/5 hover:border-slate-700"
                                                        }`}
                                                >
                                                    <div className="flex items-center w-full justify-between mb-2">
                                                        <span className="font-black text-white text-lg">{item.id}</span>
                                                        <RadioGroupItem value={item.id} id={item.id} className="text-[#2563EB] border-slate-700" />
                                                    </div>
                                                    <span className="text-sm text-slate-400 font-medium">{item.desc}</span>
                                                </Label>
                                            ))}
                                        </RadioGroup>
                                    </motion.div>
                                )}

                                {/* STEP 3 */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        variants={currentStepVariant}
                                        initial="hidden" animate="visible" exit="exit"
                                        className="flex-1"
                                    >
                                        <div className="mb-8 flex items-center text-[#60A5FA] bg-[#2563EB]/10 w-fit px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/5">
                                            <MapPin className="size-4 mr-2" /> Geo-Context Mapping
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-4 leading-tight">Operational Region?</h2>
                                        <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed">Identify your target cities or states for institution matching.</p>

                                        <div className="space-y-4">
                                            <Label htmlFor="location" className="text-slate-300 font-bold uppercase tracking-widest text-xs">Geo-Specific Location (Optional)</Label>
                                            <Input
                                                id="location"
                                                autoFocus
                                                placeholder="e.g., Bangalore Metro, Global, Kerala Hub..."
                                                className="h-16 text-xl bg-background/50 border-border focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-white transition-all rounded-xl placeholder:text-slate-600"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Form Navigation Controls */}
                            <div className="flex items-center justify-between mt-auto pt-10 border-t border-white/5">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handleBack}
                                    className={step === 1 ? "invisible" : "text-slate-500 hover:text-white hover:bg-white/5 font-bold"}
                                >
                                    Back
                                </Button>

                                <Button
                                    type="submit"
                                    className="bg-[#2563EB] hover:bg-[#1D4ED8] min-w-[160px] h-14 rounded-xl text-white font-black shadow-lg shadow-[#2563EB]/20 transition-all border border-white/10"
                                    disabled={step === 1 && formData.interests.length < 3}
                                >
                                    {step === 3 ? (
                                        <>Finalize Synthesis <Sparkles className="ml-2 size-5" /></>
                                    ) : (
                                        <>Forward <ArrowRight className="ml-2 size-5" /></>
                                    )}
                                </Button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}

function Badge({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    return (
        <span onClick={onClick} className={`inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold transition-all ${className}`}>
            {children}
        </span>
    );
}
