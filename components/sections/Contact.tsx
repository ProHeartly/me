"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
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
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        socialsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: socialsRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const socials = [
    { name: "GitHub", icon: faGithub, link: "https://github.com/ProHeartly/", color: "from-gray-600 to-gray-800" },
    { name: "LinkedIn", icon: faLinkedin, link: "https://linkedin.com/in/heartly", color: "from-blue-600 to-blue-800" },
    { name: "Instagram", icon: faInstagram, link: "https://instagram.com/h3r1ly", color: "from-pink-600 to-purple-600" }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-white px-6 md:px-16 py-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 ref={titleRef} className="text-4xl md:text-6xl font-black tracking-tight">
              Let's Work Together
            </h2>
            <p ref={descRef} className="text-lg md:text-2xl text-gray-400">
              Have a project in mind? Drop me a message and let's create something amazing.
            </p>
          </div>
          
          <div ref={formRef} className="bg-slate-900/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 md:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm text-blue-300 font-semibold">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-950/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-blue-300 font-semibold">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-950/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-blue-300 font-semibold">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-950/50 border border-blue-500/30 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold transition-all text-lg transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Failed to send" : "Send Message"}
              </button>
            </form>
          </div>
          
          <div ref={socialsRef} className="pt-8 space-y-6">
            <p className="text-center text-gray-500 text-sm md:text-base">Or connect with me on</p>
            <div className="flex gap-6 justify-center">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="group relative"
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-linear-to-br ${social.color} flex items-center justify-center transform transition-all duration-300 ${hoveredSocial === social.name ? 'scale-110 rotate-6' : 'scale-100 rotate-0'} hover:shadow-2xl`}>
                    <FontAwesomeIcon icon={social.icon} className="text-3xl md:text-4xl text-white" />
                  </div>
                  <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${hoveredSocial === social.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    {social.name}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
