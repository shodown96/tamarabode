"use client";

import { useState, useEffect, useRef } from "react";

// Quote data

const QUOTES = [
    {
        label: "Stay Motivated",
        text: "You don't start things and not finish them. You don't quit. There's nothing that comes out of quitting besides knowing that you didn't finish.",
        author: "Kevin Hart",
    },
    {
        label: "Stay Motivated",
        text: "Don't stop when you're tired. Stop when you're done.",
        author: "David Goggins",
    },
    {
        label: "Stay Motivated",
        text: "Don't quit. Suffer now and live the rest of your life as a champion.",
        author: "Muhammad Ali",
    },
    {
        label: "Stay Motivated",
        text: "Doing the best at this moment puts you in the best place for the next moment.",
        author: "Oprah Winfrey",
    },
    {
        label: "Stay Motivated",
        text: "Without commitment, you'll never start. But more importantly, without consistency, you'll never finish.",
        author: "Denzel Washington",
    },
    {
        label: "Stay Motivated",
        text: "It is hard to fail, but it is worse never to have tried to succeed.",
        author: "Theodore Roosevelt",
    },
    {
        label: "Stay Motivated",
        text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        author: "Ralph Waldo Emerson",
    },
    {
        label: "Stay Motivated",
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
    },
    {
        label: "Stay Motivated",
        text: "Mistakes are always forgivable, if one has the courage to admit them.",
        author: "Bruce Lee",
    },
    {
        label: "Stay Motivated",
        text: "Discipline is the bridge between goals and accomplishment.",
        author: "Jim Rohn",
    },
    {
        label: "Stay Motivated",
        text: "Where blood, sweat and tears stop, joy begins... Keep Walking",
        author: "Johnnie Walker",
    },
];


interface QuoteCarouselProps {
    // Override the quotes array if needed — defaults to the built-in list
    quotes?: typeof QUOTES;
    // Auto-advance interval in ms (default 5000)
    interval?: number;
    className?: string;
}


// Sliding quote carousel — auto-advances every 5s, slides downward between quotes
export default function QuoteCarousel({
    quotes = QUOTES,
    interval = 5000,
    className = "",
}: QuoteCarouselProps) {
    const [current, setCurrent] = useState(0);
    const [sliding, setSliding] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const goTo = (index: number) => {
        if (index === current || sliding) return;
        setSliding(true);
        setTimeout(() => {
            setCurrent(index);
            setSliding(false);
        }, 450); // matches CSS transition duration
    };

    // Auto-advance
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            const next = (current + 1) % QUOTES.length;
            goTo(next);
        }, 5000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [current, sliding]);

    const quote = QUOTES[current];

    return (
        <div className="p-9 flex flex-col justify-between border-r border-white/10 h-full overflow-hidden max-md:border-b">
            {/* Quote content — slides down on transition */}
            <div
                style={{
                    transform: sliding ? "translateY(24px)" : "translateY(0)",
                    opacity: sliding ? 0 : 1,
                    transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease",
                }}
            >
                <p className="text-xs text-grey mb-6">
                    {quote.label} <span className="text-primary font-bold">//</span>
                </p>
                <p className="text-lg text-white leading-relaxed">{quote.text}</p>
            </div>

            <div
                style={{
                    transform: sliding ? "translateY(24px)" : "translateY(0)",
                    opacity: sliding ? 0 : 1,
                    transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease",
                }}
            >
                <p className="text-sm text-grey italic mt-8 mb-6">{quote.author}</p>

                {/* Dot indicators */}
                <div className="flex gap-2 flex-wrap">
                    {QUOTES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to quote ${i + 1}`}
                            style={{ all: "unset", cursor: "pointer" }}
                        >
                            <span
                                style={{
                                    display: "block",
                                    width: i === current ? "20px" : "6px",
                                    height: "6px",
                                    borderRadius: "999px",
                                    background: i === current ? "var(--color-primary, #e63946)" : "rgba(255,255,255,0.2)",
                                    transition: "width 0.3s ease, background 0.3s ease",
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}