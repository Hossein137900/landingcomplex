"use client";
import CTA from "@/components/static/cta";
import FAQ from "@/components/static/faq";
import Features from "@/components/static/features";
import Hero from "@/components/static/heroSection";
import HowItWorks from "@/components/static/howItWorks";
import Pricing from "@/components/static/pricing";
import Testimonials from "@/components/static/testimonials";
import { useEffect } from "react";

export default function Home() {
  // Add smooth scrolling behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
        const id = target.getAttribute("href")?.substring(1);
        const element = document.getElementById(id || "");
        if (element) {
          window.scrollTo({
            behavior: "smooth",
            top: element.offsetTop - 80,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen" dir="rtl">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
