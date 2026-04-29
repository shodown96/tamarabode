"use client";

import Navbar from "@/components/custom/Navbar";
import HeroSection from "@/components/custom/HeroSection";
import WorkWithMeSection from "@/components/custom/WorkWithMeSection";
import ProjectsSection from "@/components/custom/ProjectsSection";
import TestimonialsSection from "@/components/custom/TestimonialsSection";
import MyStandardsSection from "@/components/custom/MyStandardsSection";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <div className="flex flex-col items-center">
        <div className="max-w-450">
          <WorkWithMeSection />
          <ProjectsSection />
          <TestimonialsSection />
        </div>
      </div>
      <MyStandardsSection />
      <Footer />
    </main>
  );
}