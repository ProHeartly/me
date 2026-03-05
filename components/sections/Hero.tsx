"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedParticles from "@/components/AnimatedParticles";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 md:px-16 py-20 flex items-center overflow-hidden">
      <AnimatedParticles />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="space-y-8">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-black tracking-tight">
            What I Do
          </h2>
          <p ref={descRef} className="text-lg md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
            A curious student exploring the vast world of technology, learning everything from code to creativity.
          </p>
          
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8">
            <div className="group p-6 md:p-8 bg-blue-950/30 border border-blue-500/20 rounded-lg hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-bounce-subtle">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-300 group-hover:text-blue-200 transition-colors">Full Stack Development</h3>
              <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                Learning to build complete web applications from frontend to backend, APIs to databases.
              </p>
            </div>
            
            <div className="group p-6 md:p-8 bg-cyan-950/30 border border-cyan-500/20 rounded-lg hover:border-cyan-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-cyan-300 group-hover:text-cyan-200 transition-colors">AI & Robotics</h3>
              <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                Exploring machine learning, IoT with ESP32, and building intelligent systems that interact with the world.
              </p>
            </div>
            
            <div className="group p-6 md:p-8 bg-purple-950/30 border border-purple-500/20 rounded-lg hover:border-purple-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-bounce-subtle" style={{ animationDelay: '1s' }}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-300 group-hover:text-purple-200 transition-colors">Creative Tech</h3>
              <p className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                Diving into graphics design, game development, and competitive programming to sharpen problem-solving skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
