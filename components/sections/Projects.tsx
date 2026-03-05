"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { link } from "fs";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Apricity",
    description: "A game about truth beyond the surface - play as Kiri stuck in wilderness, where the end is just the beginning.",
    tech: ["Game Development", "Narrative Design"],
    color: "blue",
    link: "https://heartlythenewbie.itch.io/apricity"
  },
  {
    title: "ContextCards",
    description: "Your companion for remembering people you connect with. Network better with proper privacy and consent.",
    tech: ["Web App", "Privacy-First"],
    color: "cyan",
    link: "https://github.com/ProHeartly/contextcard"
  },
  {
    title: "Just Enough Drive (JED)",
    description: "A personal cloud drive built for fun - sharing files with friends made simple and enjoyable.",
    tech: ["Cloud Storage", "Full Stack"],
    color: "purple",
    link: "https://github.com/ProHeartly/jed"
  },
  {
    title: "Terminul",
    description: "A terminal-based media player built from scratch with no AI assistance - documenting the journey of learning by doing.",
    tech: ["Python", "Terminal UI", "Learning Project"],
    color: "blue",
    link: "https://github.com/ProHeartly/terminul"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: 20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.15,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white px-6 md:px-16 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <h2 ref={titleRef} className="text-4xl md:text-6xl font-black tracking-tight mb-12 md:mb-16">
          Featured Projects
        </h2>
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 perspective-1000">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link || "#"}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              className={`group relative p-6 md:p-8 bg-${project.color}-950/30 border border-${project.color}-500/20 rounded-lg transition-all cursor-pointer block overflow-hidden`}
              style={{
                transformStyle: "preserve-3d",
                transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
              }}
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.transform = "translateY(-8px) rotateX(5deg) rotateY(-5deg)";
                card.style.borderColor = `var(--${project.color}-500)`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
              }}
            >
              <div className={`absolute inset-0 bg-linear-to-br from-${project.color}-500/0 to-${project.color}-500/0 group-hover:from-${project.color}-500/10 group-hover:to-${project.color}-500/5 transition-all duration-500`} />
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition-all duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 group-hover:text-blue-300 transition-colors duration-300">{project.title}</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 group-hover:text-gray-300 transition-colors duration-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs md:text-sm group-hover:bg-white/20 transition-all duration-300"
                      style={{
                        transitionDelay: `${i * 50}ms`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
