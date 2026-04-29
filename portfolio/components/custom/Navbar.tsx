"use client";

import { CONTACT_INFO, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { useState, useEffect } from "react";



const TAGLINE = "Elevate your brand with\ndesign built to inspire\nstrength.";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

//  Animated menu icon 
// Closed state: 5 staggered horizontal bars (the original SVG design)
// Open state:   all bars collapse to a single underline beneath "CLOSE"

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  // Each bar: { x, y, width } in the 48×22 viewBox
  const bars = [
    { x: 0, y: 0, w: 9.59 },  // top-left short
    { x: 14.41, y: 0, w: 33.59 },  // top-right long
    { x: 0, y: 10, w: 48 },  // middle full
    { x: 0, y: 20, w: 33.59 },  // bottom-left long
    { x: 38.41, y: 20, w: 9.59 },  // bottom-right short
  ];

  return (
    <svg
      width="48"
      height="22"
      viewBox="0 0 48 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-all duration-300"
    >
      {bars.map((bar, i) => (
        <rect
          key={i}
          // When open: all bars collapse to the single bottom line (y=20, full width)
          x={isOpen ? 0 : bar.x}
          y={isOpen ? 20 : bar.y}
          width={isOpen ? 48 : bar.w}
          height="2"
          fill="white"
          className="transition-all duration-300"
          style={{ transitionDelay: isOpen ? `${i * 30}ms` : `${(4 - i) * 30}ms` }}
        />
      ))}
    </svg>
  );
}

//  Navbar 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function onScroll() {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      setScrolled(currentScrollY > 20);
      setVisible(currentScrollY === 0 || scrollingUp);

      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      {/*  Bar — always visible, sits above the overlay  */}
      <nav
        className={`flex justify-between items-center py-5 px-9 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isOpen || scrolled ? "bg-background" : "bg-transparent"
          } ${visible || isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        <a href="/" className="text-3xl uppercase font-bebas tracking-wider">
          Tamara<span className="text-primary">.</span>
        </a>

        {/* Right side: CLOSE label (only when open) + animated icon */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex flex-col items-center -mt-2 gap-1.5 focus:outline-none cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {/* CLOSE text — fades in when open, sits above the underline bar */}
          <span
            className={`text-xs font-semibold tracking-widest text-white uppercase transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0 -mb-5 block" : "opacity-0 -translate-y-2 pointer-events-none hidden"}`}
          >
            CLOSE
          </span>

          {/* The animated icon — becomes a single underline when open */}
          <MenuIcon isOpen={isOpen} />
        </button>
      </nav>

      {/*  Full-screen menu overlay  */}
      {/*
        Slides down from the top (translateY) and fades in.
        Two-column layout: nav links left, tagline + contact right.
        Social links + legal links span the full bottom bar.
      */}
      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col justify-between px-9 pt-28 pb-8 transition-all duration-500 ${isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        {/*  Main content row  */}
        <div className="grid grid-cols-12 flex-1 mb-4">

          {/* Left — nav links */}
          <nav className="col-span-12 md:col-span-6 flex flex-col justify-start gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-baseline gap-3 text-white hover:text-primary transition-colors duration-200"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 5.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
                }}
              >
                {link.label}
                {link.badge && (
                  <span className="text-grey text-sm font-normal tracking-wide">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right — tagline + contact */}
          <div className="col-span-12 md:col-span-6 flex flex-col justify-between items-end text-right">

            {/* Tagline */}
            <p
              className="text-white font-semibold leading-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
            >
              {TAGLINE.split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-1">
              <p className="text-grey text-sm">{CONTACT_INFO.phone}</p>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-white text-2xl font-medium hover:text-primary transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/*  Bottom bar — social links left, legal links right  */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">

          {/* Social links */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.slice(0, 4).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={"text-grey text-sm hover:text-white transition-colors flex items-center gap-1"}
              >
                {link.label}
                {/* Diagonal arrow */}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>

          {/* Legal links */}
          {/* <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-4">
                {i > 0 && <span className="text-grey text-xs">•</span>}
                <a
                  href={link.href}
                  className="text-grey text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}