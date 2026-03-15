"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUiStore } from "../../store/useUiStore";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useEffect, useRef } from "react";
import { apiClient } from "../../lib/apiClient";
import { ENDPOINTS } from "../../lib/endpoints";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    ShieldCheck,
    Users,
    GraduationCap,
    Send
} from "lucide-react";

import { COMPANY_INFO } from "../../lib/constants";

const leadFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Valid phone number required").max(15),
    email: z.string().email("Invalid email address"),
    interestedCourse: z.string().min(1, "Please select or type a course"),
    preferredCity: z.string().min(1, "Preferred city is required"),
    message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

const STEPS = [
    { id: 1, title: "Basic Info", fields: ["name", "phone", "email"] },
    { id: 2, title: "Preferences", fields: ["interestedCourse", "preferredCity"] },
    { id: 3, title: "Personalize", fields: ["message"] },
];

export function LeadFormModal() {
    const { openLeadModal, isLeadModalOpen, closeLeadModal, selectedCourseForLead, leadSource } = useUiStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            interestedCourse: "",
            preferredCity: "",
            message: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        const hasSeenModal = sessionStorage.getItem("leadModalShown");
        if (hasSeenModal) return;

        const openModal = (source: string) => {
            const alreadyOpen = useUiStore.getState().isLeadModalOpen;
            if (alreadyOpen) return;
            openLeadModal(undefined, source);
            sessionStorage.setItem("leadModalShown", "true");
        };

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;
            const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
            if (scrollPercentage > 0.45) {
                openModal("scroll_trigger");
                window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll);

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0) {
                openModal("exit_intent");
                document.removeEventListener("mouseleave", handleMouseLeave);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);
        const timer = setTimeout(() => openModal("timed_fallback"), 25000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(timer);
        };
    }, [openLeadModal]);

    // Pre-fill the course name if provided from store
    useEffect(() => {
        if (selectedCourseForLead) {
            form.setValue("interestedCourse", selectedCourseForLead);
        }
    }, [selectedCourseForLead, form]);

    const onSubmit = async (data: LeadFormValues) => {
        setIsSubmitting(true);
        try {
            const leadPayload = {
                fullName: data.name,
                phoneNumber: data.phone,
                email: data.email,
                courseInterested: data.interestedCourse,
                preferredCity: data.preferredCity,
                source: 1,
                notes: JSON.stringify({
                    message: data.message,
                    page: window.location.pathname,
                    device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
                    triggerSource: leadSource || "direct_cta",
                    userAgent: navigator.userAgent
                })
            };

            await apiClient.post(ENDPOINTS.LEADS.CREATE, leadPayload);
            toast.success("Lead submitted successfully! Redirecting to WhatsApp...");

            const text = `Hi Adotzee, I need admission guidance.\n\nName: ${data.name}\nCourse: ${data.interestedCourse}\nPreferred City: ${data.preferredCity}\nPage: ${window.location.href}`;
            const whatsappUrl = `${COMPANY_INFO.socials.whatsapp}?text=${encodeURIComponent(text)}`;

            closeLeadModal();
            form.reset();
            setCurrentStep(0);

            setTimeout(() => {
                window.open(whatsappUrl, "_blank");
            }, 800);
        } catch (error) {
            console.error("Failed to submit lead", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = async () => {
        const fields = STEPS[currentStep].fields as Array<keyof LeadFormValues>;
        const isValid = await form.trigger(fields);
        if (isValid && currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const QUICK_COURSES = ["BBA", "BCA", "BCom", "Nursing", "Engineering"];

    return (
        <Dialog open={isLeadModalOpen} onOpenChange={(open) => {
            if (!open) {
                closeLeadModal();
                // Reset step after a delay to avoid jump during closing animation
                setTimeout(() => setCurrentStep(0), 300);
            }
        }}>
            <DialogContent className="sm:max-w-[520px] bg-white border border-slate-200 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 z-50"
                >
                    <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="flex flex-col h-full max-h-[90vh]">
                    <div className="p-8 md:p-10 pb-0">
                        <DialogHeader className="mb-0">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                                    Step {currentStep + 1} of {STEPS.length}
                                </span>
                                {currentStep > 0 && (
                                    <button
                                        onClick={prevStep}
                                        className="text-slate-600 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Back
                                    </button>
                                )}
                            </div>
                            <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight mb-2"
                            >
                                {currentStep === 0 && "Kickstart Your Career"}
                                {currentStep === 1 && "Customized For You"}
                                {currentStep === 2 && "Final Few Details"}
                            </DialogTitle>
                            <DialogDescription className="text-slate-600 text-base font-medium leading-relaxed"
                            >
                                {currentStep === 0 && "Join 5,000+ students who found their dream college through Adotzee."}
                                {currentStep === 1 && "Tell us what you're looking for so we can find the perfect match."}
                                {currentStep === 2 && "Anything else you'd like us to know? Our experts are ready to help."}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto px-8 md:px-10 py-2 custom-scrollbar"
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                        className="py-2"
                                    >
                                        {currentStep === 0 && (
                                            <div className="space-y-5">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Full Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter your full name" {...field} className="h-14 bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 rounded-2xl"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Phone Number</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Mobile number" {...field} className="h-14 bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 rounded-2xl"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Email Address</FormLabel>
                                                            <FormControl>
                                                                <Input type="email" placeholder="email@example.com" {...field} className="h-14 bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 rounded-2xl"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {currentStep === 1 && (
                                            <div className="space-y-5">
                                                <FormField
                                                    control={form.control}
                                                    name="interestedCourse"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Course Preference</FormLabel>
                                                            <div className="flex flex-wrap gap-2 mb-3">
                                                                {QUICK_COURSES.map((course) => (
                                                                    <button
                                                                        key={course}
                                                                        type="button"
                                                                        onClick={() => form.setValue("interestedCourse", course)}
                                                                        className={`px-4 py-2 text-[11px] font-bold border rounded-xl transition-all ${form.watch("interestedCourse") === course
                                                                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                                            : "bg-white border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900"
                                                                            }`}
                                                                    >
                                                                        {course}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <FormControl>
                                                                <Input placeholder="Search or type course" {...field} className="h-14 bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 rounded-2xl"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="preferredCity"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Preferred City</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Ex: Bangalore, Mangalore" {...field} className="h-14 bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 rounded-2xl"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        )}

                                        {currentStep === 2 && (
                                            <div className="space-y-5">
                                                <FormField
                                                    control={form.control}
                                                    name="message"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Questions (Optional)</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Tell us about your requirements or any specific colleges you have in mind..."
                                                                    className="resize-none min-h-[140px] bg-white border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 rounded-2xl p-4"

                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="bg-blue-50 border border-blue-200 text-slate-500 rounded-2xl p-4 flex items-start gap-3">
                                                    <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                    <p className="text-[11px] text-slate-400 font-medium leading-normal">
                                                        Your data is 100% secure. Adotzee follows strict privacy protocols to ensure your information is only used for admission guidance.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </form>
                        </Form>
                    </div>

                    <div className="p-8 md:p-10 pt-4 bg-white border-t border-slate-200">
                        <div className="flex gap-4 mb-6">
                            {currentStep < STEPS.length - 1 ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full bg-blue-600 hover:bg-blue-500 h-16 rounded-2xl text-lg font-black shadow-xl shadow-blue-600/20 transition-all border border-white/10 flex items-center justify-center gap-2 group"
                                >
                                    Continue <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={form.handleSubmit(onSubmit)}
                                    className="w-full bg-blue-600 hover:bg-blue-500 h-16 rounded-2xl text-lg font-black shadow-xl shadow-blue-600/20 transition-all border border-white/10 flex items-center justify-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        "Submitting..."
                                    ) : (
                                        <>Submit Application <Send className="w-4 h-4 ml-1" /></>
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.15);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </Dialog>
    );
}
