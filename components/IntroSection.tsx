"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Backend Development",
  "Graphics Designing",
  "Android Development",
  "Vibe Coding 😝",
  "Machine Learning",
  "Game Developmept",
  "Hackathon",
  "Game jam",
  "Presentation",
  "Web development",
  "Robotics"
];

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background text appears first
      tl.fromTo(
        bgTextRef.current,
        { opacity: 0, x: -100 },
        { opacity: 0.03, x: 0, duration: 1.2, ease: "power2.out" }
      )
      // Circle background
      .fromTo(
        circleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" },
        "-=0.8"
      )
      // Image slides in
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      )
      // Hello animation
      .fromTo(
        helloRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      )
      // Name appears
      .fromTo(
        nameRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      // Title appears
      .fromTo(
        titleRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

      // Scroll animation - split to sides
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Move left side (image) to top-left
          gsap.to(leftSideRef.current, {
            x: -progress * 300,
            y: -progress * 200,
            scale: 0.6 + (1 - progress) * 0.4,
            duration: 0
          });
          
          // Move right side (text) to top-right
          gsap.to(rightSideRef.current, {
            x: progress * 300,
            y: -progress * 200,
            scale: 0.6 + (1 - progress) * 0.4,
            duration: 0
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Typing animation effect
  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 3000;

    const timeout = setTimeout(() => {
      const currentText = roles[roleIndex];
      
      if (!isDeleting && currentRole === currentText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentRole === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else if (isDeleting) {
        setCurrentRole(currentText.substring(0, currentRole.length - 1));
      } else {
        setCurrentRole(currentText.substring(0, currentRole.length + 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentRole, roleIndex, isDeleting]);

  // Cursor blink effect
  useEffect(() => {
    const currentText = roles[roleIndex];
    const isPaused = !isDeleting && currentRole === currentText;
    
    if (!isPaused) {
      setShowCursor(true);
      return;
    }

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [currentRole, roleIndex, isDeleting, roles]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white px-8 md:px-16 overflow-hidden"
    >
      <div
        ref={bgTextRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-0"
      >
        <div className="text-[25vw] md:text-[20vw] font-black text-blue-400/5 whitespace-nowrap tracking-tighter">
          RASIM
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center max-w-7xl w-full">
        <div ref={leftSideRef} className="relative flex items-center justify-center md:justify-end h-[500px] md:h-[600px]">
          <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-blue-500/20 blur-[100px]" />
          <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-cyan-400/15 blur-[80px]" />
          
          <div
            ref={circleRef}
            className="absolute w-[280px] h-[360px] md:w-[380px] md:h-[480px] bg-linear-to-br from-blue-600/50 via-cyan-500/40 to-blue-700/50 opacity-0 -rotate-3 shadow-2xl shadow-blue-500/50"
          />
          
          <div className="absolute w-[280px] h-[360px] md:w-[380px] md:h-[480px] border-2 border-blue-400/40 -rotate-3" />
          <div className="absolute w-[280px] h-[360px] md:w-[380px] md:h-[480px] bg-black/30 -rotate-3 translate-x-2 translate-y-2 blur-md -z-10" />
          
          <div
            ref={imageRef}
            className="relative w-[320px] h-[400px] md:w-[420px] md:h-[520px] opacity-0 z-10 -rotate-3"
          >
            <div className="absolute inset-0 overflow-hidden shadow-2xl shadow-blue-500/50">
              <Image
                src="/profile.png"
                alt="Profile"
                fill
                className="object-cover object-top drop-shadow-[0_0_60px_rgba(59,130,246,0.6)]"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>

        <div ref={rightSideRef} className="flex flex-col justify-center space-y-6 md:pl-8">
          <div ref={helloRef} className="opacity-0">
            <div className="text-xl md:text-2xl font-light tracking-wider text-blue-300">
              Hello!
            </div>
            <div className="text-xl md:text-2xl font-light tracking-wider text-blue-300">
              I'm,
            </div>
          </div>

          <div ref={nameRef} className="opacity-0">
            <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-white">
              Rasim
            </div>
            <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]">
              <span className="bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Mahato
              </span>
            </div>
          </div>

          <div ref={titleRef} className="text-base md:text-xl font-light text-blue-300/90 opacity-0 h-8 md:h-10">
            <span className="inline-block min-w-[300px]">
              {currentRole}
              <span className={`inline-block w-0.5 h-5 md:h-7 bg-blue-400 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
