"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AnimatedParticles from "@/components/AnimatedParticles";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      const skills = skillsRef.current?.querySelectorAll("span");
      if (skills) {
        gsap.fromTo(
          skills,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 50, rotateY: 15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-slate-950 text-white px-6 md:px-16 py-20 flex items-center overflow-hidden">
      <AnimatedParticles />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="space-y-6">
            <h2 ref={titleRef} className="text-4xl md:text-6xl font-black tracking-tight">
              About Me
            </h2>
            <div ref={textRef} className="space-y-4 text-base md:text-lg text-gray-400 leading-relaxed">
              <p>
                I'm a passionate student who loves coding and tech world. With a sharp eye for design 
                and will to bring change, I bridge the gap between aesthetics and functionality.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open source, or experimenting with creative projects that push boundaries.
              </p>
            </div>
            
            <div className="pt-6 space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-blue-300">Skills</h3>
              <div ref={skillsRef} className="flex flex-wrap gap-2 md:gap-3">
                {["Python", "FastAPI", "Flask", "Machine Learning", "Flutter", "Web Development", "Cyber Security", "Competitive Programming", "ESP32", "Robotics", "Graphics Designing", "Hackathons", "Game Jam"].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-950/50 border border-blue-500/30 rounded-full text-xs md:text-sm text-blue-200 whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative h-[300px] md:h-[500px] bg-linear-to-br from-blue-600/20 to-cyan-600/20 rounded-lg overflow-hidden">
            <Image
              src="/coding-image.jpg"
              alt="Coding workspace"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
