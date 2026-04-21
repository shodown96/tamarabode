"use client";

import { useState } from "react";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import LetsTellAStory from "@/components/custom/LetsTellAStory";

//  Contact page data 

const PAGE_HEADER = {
    title: "Contact.",
};

const PERKS = [
    {
        title: "Quick response",
        description: "I'll review your message and respond promptly, usually within 12 hours.",
        icon: "bolt",
    },
    {
        title: "No commitment consultation",
        description: "I'll provide expert advice and recommendations with zero obligation.",
        icon: "eye",
    },
    {
        title: "Clear roadmap",
        description: "I'll outline clear, practical actions to move your project forward.",
        icon: "compass",
    },
];

const FORM_FIELDS = [
    { id: "name", label: "Your name *", type: "text", required: true },
    { id: "email", label: "Your Email *", type: "email", required: true },
    { id: "service", label: "What service are you interested in?", type: "text", required: false },
    { id: "budget", label: "What is your budget?", type: "text", required: false },
];

//  Icon components 

function BoltIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 2L4 11H10L9 18L16 9H10L11 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="10" r="2.5" stroke="white" strokeWidth="1.5" />
        </svg>
    );
}

function CompassIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.5" />
            <path d="M13.5 6.5L11.5 11.5L6.5 13.5L8.5 8.5L13.5 6.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function PerkIcon({ icon }: { icon: string }) {
    if (icon === "bolt") return <BoltIcon />;
    if (icon === "eye") return <EyeIcon />;
    if (icon === "compass") return <CompassIcon />;
    return null;
}

//  Page ─

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "", email: "", service: "", budget: "", message: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Wire up to your preferred form handler / API here
        console.log("Form submitted:", form);
    }

    return (
        <div>
            <Navbar />

            {/*  Page heading  */}
            <div className="pt-36 pb-16 px-9">
                <h1
                    className="text-white font-bold leading-none"
                    style={{ fontSize: "clamp(4rem, 9vw, 10rem)" }}
                >
                    {PAGE_HEADER.title}
                </h1>
            </div>

            {/*  Main content: perks left, form right  */}
            <div className="px-9 pb-28 grid grid-cols-12 md:gap-16 items-start">

                {/* Left — perks list */}
                <div className="col-span-12 md:col-span-5 flex flex-col gap-10">
                    {PERKS.map((perk) => (
                        <div key={perk.title} className="flex flex-col gap-3">
                            {/* Icon + title row */}
                            <div className="flex items-center gap-3">
                                <span className="shrink-0">
                                    <PerkIcon icon={perk.icon} />
                                </span>
                                <p className="text-white font-semibold text-base">{perk.title}</p>
                            </div>
                            {/* Description — indented to align with title text */}
                            <p className="text-grey text-sm leading-relaxed pl-8">
                                {perk.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Right — contact form */}
                {/*
          Each field uses an underline-only style (no box border) matching the design.
          The textarea grows to fill available space. The CTA button is full primary red.
        */}
                <form
                    onSubmit={handleSubmit}
                    className="col-span-12 md:col-span-7 flex flex-col gap-0"
                >
                    {/* Single-line fields */}
                    {FORM_FIELDS.map((field) => (
                        <div key={field.id} className="border-b border-white/20 focus-within:border-primary transition-all py-5 w-full">
                            <input
                                id={field.id}
                                type={field.type}
                                placeholder={field.label}
                                required={field.required}
                                value={form[field.id as keyof typeof form]}
                                onChange={handleChange}
                                className="w-full bg-transparent text-grey placeholder-grey text-base focus:outline-none focus:placeholder-white/40 transition-colors"
                            />
                        </div>
                    ))}

                    {/* Message textarea */}
                    <div className="border-b border-white/20 py-5">
                        <textarea
                            id="message"
                            placeholder="Enter your message..."
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            className="w-full bg-transparent text-grey placeholder-grey text-base focus:outline-none focus:placeholder-white/40 transition-colors resize-y"
                        />
                    </div>

                    {/* Submit button */}
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary/90 transition-colors text-white font-semibold px-10 py-5 flex items-center gap-3 text-base"
                        >
                            Get in touch
                            {/* Diagonal arrow */}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 13.5L13.5 2.5M13.5 2.5H6M13.5 2.5V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            <LetsTellAStory />
            <Footer />
        </div>
    );
}