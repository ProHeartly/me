"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  "/certificates/1768065502322.jpg",
  "/certificates/1768065854247.jpg",
  "/certificates/1768065997412.jpg",
  "/certificates/1768066135643.jpg",
  "/certificates/1768066406919.jpg",
  "/certificates/1772545070302.jpg",
  "/certificates/1772545331897.jpg",
  "/certificates/1772545332255.jpg",
  "/certificates/Screenshot 2026-03-05 170623.png",
  "/certificates/Screenshot 2026-03-05 170652.png"
];

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

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
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCert]);

  return (
    <>
      <section ref={sectionRef} className="min-h-screen bg-slate-950 text-white px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-black tracking-tight mb-12 md:mb-16">
            Certificates
          </h2>
          
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {certificates.map((cert, index) => (
              <div 
                key={index}
                onClick={() => setSelectedCert(cert)}
                className="group relative aspect-4/3 bg-linear-to-br from-blue-950/40 to-cyan-950/40 border-2 border-blue-500/30 rounded-xl overflow-hidden cursor-pointer"
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
                }}
                style={{
                  transition: "all 0.1s ease-out",
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-blue-400/0 via-cyan-400/0 to-blue-400/0 group-hover:from-blue-400/20 group-hover:via-cyan-400/10 group-hover:to-blue-400/20 transition-all duration-500" />
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-400 to-transparent animate-shimmer" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-shimmer" style={{ animationDelay: "0.5s" }} />
                </div>
                
                <div className="relative w-full h-full" style={{ transform: "translateZ(20px)" }}>
                  <Image
                    src={cert}
                    alt={`Certificate ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-blue-500/90 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      View Certificate
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400/50 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ transform: "translateZ(30px)" }} />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ transform: "translateZ(30px)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-12 right-0 text-white hover:text-blue-400 transition-colors text-4xl font-light"
            >
              ×
            </button>
            <div className="relative w-full h-full">
              <Image
                src={selectedCert}
                alt="Certificate"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
