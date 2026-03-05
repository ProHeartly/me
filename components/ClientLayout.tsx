"use client";

import { useState, useEffect } from "react";
import LoadingAnimation from "./LoadingAnimation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add loading class to body
    document.body.classList.add('loading');
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem("hasVisited", "true");
    setIsLoading(false);
    // Remove loading class from body
    document.body.classList.remove('loading');
    setTimeout(() => setShowContent(true), 100);
  };

  const handleSkip = () => {
    sessionStorage.setItem("hasVisited", "true");
    setIsLoading(false);
    document.body.classList.remove('loading');
    setShowContent(true);
  };

  if (!mounted) return null;

  return (
    <>
      {isLoading && <LoadingAnimation onComplete={handleAnimationComplete} onSkip={handleSkip} />}
      <div style={{ opacity: showContent ? 1 : 0, transition: "opacity 0.5s" }}>
        {children}
      </div>
    </>
  );
}
