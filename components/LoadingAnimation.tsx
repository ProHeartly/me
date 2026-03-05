"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function LoadingAnimation({ 
  onComplete, 
  onSkip 
}: { 
  onComplete: () => void;
  onSkip: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLineRef = useRef<HTMLDivElement>(null);
  const secondLineRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!firstLineRef.current || !secondLineRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into characters
      const firstText = new SplitType(firstLineRef.current!, { types: "chars" });
      const secondText = new SplitType(secondLineRef.current!, { types: "chars" });

      if (!firstText.chars || !secondText.chars) return;

      // Set parent divs to visible after split
      gsap.set([firstLineRef.current, secondLineRef.current], { opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 300);
        }
      });

      // First line: stagger chars in
      tl.fromTo(
        firstText.chars,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
        }
      )
      // Hold
      .to({}, { duration: 1 })
      // Fade out first line smoothly
      .to(firstText.chars, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.in",
      })
      // Pause between animations
      .to({}, { duration: 0.5 })
      // Second line: clean entrance
      .fromTo(
        secondText.chars,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.out",
        }
      )
      // Hold
      .to({}, { duration: 1.5 })
      // Fade out everything
      .to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden"
    >
      {/* Skip button */}
      <button
        onClick={onSkip}
        className="absolute top-8 right-8 px-6 py-3 text-sm md:text-base text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 hover:border-blue-500/50 transition-all z-50"
      >
        Skip Animation
      </button>

      {/* Glitch flash overlay */}
      <div
        ref={glitchRef}
        className="absolute inset-0 bg-blue-500/20 opacity-0 pointer-events-none"
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" />

      {/* Animated glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center px-8 perspective-1000 relative z-10">
        <div
          ref={firstLineRef}
          className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight opacity-0"
          style={{ textShadow: "0 0 30px rgba(59,130,246,0.5)" }}
        >
          Curiosity kills the cat
        </div>
        <div
          ref={secondLineRef}
          className="text-4xl md:text-7xl font-bold text-white tracking-tight opacity-0"
          style={{ 
            textShadow: "0 0 40px rgba(59,130,246,0.8)",
            WebkitTextStroke: "1px rgba(59,130,246,0.3)"
          }}
        >
          but satisfaction brings it back!
        </div>
      </div>
    </div>
  );
}
