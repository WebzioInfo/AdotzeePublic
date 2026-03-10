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
import { useState, useEffect } from "react";
import { apiClient } from "../../lib/apiClient";
import { ENDPOINTS } from "../../lib/endpoints";
import { toast } from "sonner";

import { COMPANY_INFO } from "../../lib/constants";

const leadFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Valid phone number required").max(15),
    email: z.string().email("Invalid email address"),
    interestedCourse: z.string().optional(),
    preferredCity: z.string().optional(),
    message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export function LeadFormModal() {
    const { openLeadModal } = useUiStore();

    useEffect(() => {
        const hasSeenModal = sessionStorage.getItem("leadModalShown");

        if (hasSeenModal) return;

        const openModal = (source: string) => {
            const alreadyOpen = useUiStore.getState().isLeadModalOpen;
            if (alreadyOpen) return;

            openLeadModal(undefined, source);
            sessionStorage.setItem("leadModalShown", "true");
        };

        // Scroll trigger: 40-50%
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

        // Exit intent (Desktop)
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0) {
                openModal("exit_intent");
                document.removeEventListener("mouseleave", handleMouseLeave);
            }
        };

        document.addEventListener("mouseleave", handleMouseLeave);

        // Timed fallback: 25 seconds
        const timer = setTimeout(() => openModal("timed_fallback"), 25000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mouseleave", handleMouseLeave);
            clearTimeout(timer);
        };
    }, [openLeadModal]);

    const { isLeadModalOpen, closeLeadModal, selectedCourseForLead, leadSource } = useUiStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    });

    // Pre-fill the course name if provided from store
    useEffect(() => {
        if (selectedCourseForLead) {
            form.setValue("interestedCourse", selectedCourseForLead);
        }
    }, [selectedCourseForLead, form]);

    const onSubmit = async (data: LeadFormValues) => {
        setIsSubmitting(true);
        try {
            // Map frontend data to backend LeadCreateDTO with improved tracking
            const leadPayload = {
                fullName: data.name,
                phoneNumber: data.phone,
                email: data.email,
                courseInterested: data.interestedCourse,
                preferredCity: data.preferredCity,
                source: 1, // 1 = Website/Public Frontend
                notes: JSON.stringify({
                    message: data.message,
                    page: window.location.pathname,
                    device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
                    triggerSource: leadSource || "direct_cta",
                    userAgent: navigator.userAgent
                })
            };

            // 1. Store lead in backend
            await apiClient.post(ENDPOINTS.LEADS.CREATE, leadPayload);

            toast.success("Lead submitted successfully! Redirecting to WhatsApp...");

            // 2. Redirect to WhatsApp using constant
            const text = `Hi Adotzee, I need admission guidance.\n\nName: ${data.name}\nCourse: ${data.interestedCourse || "General"}\nPreferred City: ${data.preferredCity || "Not Specified"}\nPage: ${window.location.href}`;
            const whatsappUrl = `${COMPANY_INFO.socials.whatsapp}?text=${encodeURIComponent(text)}`;

            closeLeadModal();
            form.reset();

            // Open WhatsApp in new tab
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

    const QUICK_COURSES = ["BBA", "BCA", "BCom", "Nursing", "Engineering"];

    return (
        <Dialog open={isLeadModalOpen} onOpenChange={closeLeadModal}>
            <DialogContent className="sm:max-w-[480px] bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                <DialogHeader className="mb-8">
                    <DialogTitle className="text-3xl font-black text-white tracking-tight mb-2">Get Admission Guidance</DialogTitle>
                    <DialogDescription className="text-slate-400 text-lg font-light leading-relaxed">
                        Find the best college and course in South India tailored for you.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your legal name" {...field} className="h-14 bg-background border-border text-white focus:ring-brand-accent rounded-xl" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contact number" {...field} className="h-14 bg-background border-border text-white focus:ring-brand-accent rounded-xl" />
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
                                        <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Your email" {...field} className="h-14 bg-background border-border text-slate-800 focus:ring-brand-accent rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="interestedCourse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Course Preference</FormLabel>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {QUICK_COURSES.map((course) => (
                                                <button
                                                    key={course}
                                                    type="button"
                                                    onClick={() => form.setValue("interestedCourse", course)}
                                                    className="px-3 py-1.5 text-[10px] font-bold bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all"
                                                >
                                                    {course}
                                                </button>
                                            ))}
                                        </div>
                                        <FormControl>
                                            <Input placeholder="e.g., BBA, BCA" {...field} className="h-14 bg-background border-border text-white focus:ring-brand-accent rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="preferredCity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Preferred City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Bangalore, Mangalore" {...field} className="h-14 bg-background border-border text-white focus:ring-[#2563EB] rounded-xl" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Questions (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us about your requirements..."
                                            className="resize-none min-h-[100px] bg-background border-border text-white focus:ring-brand-accent rounded-xl"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] h-16 rounded-2xl text-lg font-black shadow-xl shadow-[#2563EB]/20 transition-all border border-white/10"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Processing..." : "Find My College"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
