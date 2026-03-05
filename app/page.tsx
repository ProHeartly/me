import IntroSection from "@/components/IntroSection";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";

export default function Home() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rasim Mahato",
    "jobTitle": "Student Developer",
    "description": "Passionate student exploring full stack development, AI & robotics, machine learning, and creative tech",
    "url": "https://yourwebsite.com",
    "image": "https://yourwebsite.com/profile.png",
    "sameAs": [
      "https://github.com/ProHeartly/",
      "https://linkedin.com/in/heartly",
      "https://instagram.com/h3r1ly"
    ],
    "knowsAbout": [
      "Python",
      "FastAPI",
      "Flask",
      "Machine Learning",
      "Flutter",
      "Web Development",
      "Cyber Security",
      "Competitive Programming",
      "ESP32",
      "Robotics",
      "Graphics Designing"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <IntroSection />
        <About />
        <Hero />
        <Projects />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}
