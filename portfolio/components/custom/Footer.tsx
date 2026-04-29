"use client";

import { CREDITS, NAV_LINKS, SOCIAL_LINKS, TICKER_WORDS } from "@/lib/constants";
import LivelocalTime from "./NigeriaTime";
import QuoteCarousel from "./QuoteCarousel";
import TickerMarquee from "./TickerMarquee";
import { ArrowIcon } from "./ui";

export default function Footer() {
  return (
    <footer>

      <TickerMarquee words={TICKER_WORDS}/>

      {/* Main footer grid */}
      {/*
        3-column layout separated by border lines.
        Col 1: quote block
        Col 2: navigation
        Col 3: time + reach out + social links
      */}
      <div className="grid grid-cols-3 border-b border-white/10">

        <div className="col-span-3 md:col-span-2 border-r border-white/10 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">

            {/* Quote — now a sliding carousel */}
            <QuoteCarousel />

            {/* Col 2 — Navigation + TAMARA wordmark */}
            <div className="flex flex-col">

              {/* Nav links */}
              <div className="p-10 flex-1">
                <p className="text-xs text-grey mb-6">
                  Navigation <span className="text-primary font-bold">//</span>
                </p>
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-4xl font-medium text-white hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* TAMARA wordmark — bleeds into bottom */}
          <div className="p-6 pb-0- overflow-hidden max-md:border-b border-white/10">
            <p
              className="font-black text-[#A8A8A8] leading-none select-none font-"
              style={{ fontSize: "clamp(4rem, 11vw, 13rem)" }}
            >
              TAMARA<span className="text-primary font-bebas" style={{ fontSize: "0.5em" }}>.</span>
            </p>
          </div>
        </div>

        {/* Time + Reach out + Social */}
        <div className="col-span-3 md:col-span-1 py-10 flex flex-col gap-10">

          {/* Time block */}
          <div className="px-10">
            <p className="text-xs text-grey mb-4">
              Currently <span className="text-primary italic font-medium">Working</span>
            </p>
            <LivelocalTime />
          </div>

          {/* Reach out */}
          <div className="max-md:border-b border-white/10 px-10 max-md:pb-10">
            <a
              href="#contact"
              className="text-sm text-grey hover:text-white transition-colors flex items-center gap-1 group"
            >
              Reach out
              <span className="text-primary group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            </a>
          </div>

          {/* Social links */}
          <div className="px-10">
            <p className="text-xs text-grey mb-4">
              Social <span className="text-primary font-bold">//</span>
            </p>
            <div className="flex flex-col gap-1">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-medium text-white hover:text-primary transition-colors duration-200 flex items-center"
                >
                  {link.label}
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 text-xs text-grey">

        {/* Developer credit */}
        <div className="flex items-center gap-2 max-md:border-b border-r border-white/10 py-5 pl-9">
          <div className="w-6 h-6 rounded-full bg-white/10 overflow-hidden shrink-0">
            <img src={CREDITS.developer.avatar} alt={CREDITS.developer.name} className="w-full h-full object-cover" />
          </div>
          <span>
            Developed by{" "}
            <a href={CREDITS.developer.href} target="_blank" rel="noopener noreferrer" className="underline">
              {CREDITS.developer.name}
            </a>
          </span>
        </div>

        {/* Copyright */}
        <div className="flex items-center md:justify-center max-md:border-b border-r border-white/10 py-5 max-md:pl-9">
          <span>{CREDITS.copyright}</span>
        </div>

        {/* Inspired by */}
        <div className="flex items-center md:justify-end gap-2 py-5 md:pr-9 max-md:pl-9">
          <div className="flex -space-x-4">
            {CREDITS.inspired.map((person) => (
              <div key={person.name} className="w-6 h-6 rounded-full bg-white/10 border border-background overflow-hidden">
                <img src={person.avatar} alt={person.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span>
            Inspired by{" "}
            {CREDITS.inspired.map((person, i) => (
              <span key={person.name}>
                <a href={person.href} className="underline underline-offset-2 hover:text-white transition-colors">
                  {person.name}
                </a>
                {i < CREDITS.inspired.length - 1 && " & "}
              </span>
            ))}
          </span>
        </div>
      </div>

    </footer>
  );
}