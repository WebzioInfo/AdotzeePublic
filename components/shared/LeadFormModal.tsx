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

const leadFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Valid phone number required").max(15),
    email: z.string().email("Invalid email address"),
    interestedCourse: z.string().optional(),
    message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export function LeadFormModal() {
    const { isLeadModalOpen, closeLeadModal, selectedCourseForLead } = useUiStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            interestedCourse: "",
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
            // Map frontend data to backend LeadCreateDTO
            const leadPayload = {
                fullName: data.name,
                phoneNumber: data.phone,
                email: data.email,
                courseInterested: data.interestedCourse,
                source: 1, // 1 = Website/Public Frontend
                notes: data.message
            };

            // 1. Store lead in backend
            await apiClient.post(ENDPOINTS.LEADS.CREATE, leadPayload);

            toast.success("Lead submitted successfully! Redirecting to WhatsApp...");

            // 2. Redirect to WhatsApp
            const whatsappNumber = "917907805626";
            const text = `Hi Adotzee, I need course guidance.\nName: ${data.name}\nCourse: ${data.interestedCourse || "General"}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

            closeLeadModal();
            form.reset();

            // Open WhatsApp in new tab
            setTimeout(() => {
                window.open(whatsappUrl, "_blank");
            }, 1000);
        } catch (error) {
            console.error("Failed to submit lead", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isLeadModalOpen} onOpenChange={closeLeadModal}>
            <DialogContent className="sm:max-w-[480px] bg-card border border-border rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                <DialogHeader className="mb-8">
                    <DialogTitle className="text-3xl font-black text-white tracking-tight mb-2">Accelerate Discovery</DialogTitle>
                    <DialogDescription className="text-slate-400 text-lg font-light leading-relaxed">
                        Authorize specialized inquiry to receive a comprehensive institutional briefing.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Subject Identity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Full Name" {...field} className="h-14 bg-background border-border text-white focus:ring-[#2563EB] rounded-xl" />
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
                                        <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Contact Vector</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Phone Number" {...field} className="h-14 bg-background border-border text-white focus:ring-[#2563EB] rounded-xl" />
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
                                        <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email Gateway</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Email Address" {...field} className="h-14 bg-background border-border text-white focus:ring-[#2563EB] rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="interestedCourse"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Inquiry Target</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Computer Science Hub" {...field} className="h-14 bg-background border-border text-white focus:ring-[#2563EB] rounded-xl" />
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
                                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Notes (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Specific parameters for consultation..."
                                            className="resize-none min-h-[100px] bg-background border-border text-white focus:ring-[#2563EB] rounded-xl"
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
                                {isSubmitting ? "Processing..." : "Submit Inquiry"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
