import { useState, useEffect, Suspense, lazy } from "react";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import LiveBackground from "@/components/LiveBackground";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import FloatingNav from "@/components/FloatingNav";
import TerminalHero from "@/components/TerminalHero";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load heavy components
const JourneyTimeline = lazy(() => import("@/components/JourneyTimeline"));
const WorkSection = lazy(() => import("@/components/WorkSection"));
const CVSection = lazy(() => import("@/components/CVSection"));
const CreativeContact = lazy(() => import("@/components/CreativeContact"));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {!isMobile && !prefersReducedMotion && <CustomCursor />}
      <div className="noise-overlay" />

      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className={`relative min-h-screen transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Live animated particle background */}
        {!prefersReducedMotion && !isMobile && <LiveBackground />}
        
        {/* Gradient orbs overlay */}
        {!prefersReducedMotion && <BackgroundOrbs />}

        <FloatingNav />

        <main className="relative z-10">
          <TerminalHero />
          <Suspense fallback={<div className="h-screen" />}>
            <JourneyTimeline />
          </Suspense>
          <Suspense fallback={<div className="h-screen" />}>
            <WorkSection />
          </Suspense>
          <Suspense fallback={<div className="h-screen" />}>
            <CVSection />
          </Suspense>
          <Suspense fallback={<div className="h-screen" />}>
            <CreativeContact />
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default Index;
