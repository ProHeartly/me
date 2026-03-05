import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Rasim Mahato - Student Developer & Tech Enthusiast",
  description: "Passionate student exploring full stack development, AI & robotics, machine learning, and creative tech. Experienced in Python, FastAPI, Flutter, web development, and competitive programming.",
  keywords: [
    "Rasim Mahato",
    "Student Developer",
    "Full Stack Developer",
    "Python Developer",
    "Machine Learning",
    "AI and Robotics",
    "Web Development",
    "FastAPI",
    "Flutter",
    "ESP32",
    "Competitive Programming",
    "Graphics Design",
    "Game Development",
    "Hackathons",
    "Portfolio"
  ],
  authors: [{ name: "Rasim Mahato" }],
  creator: "Rasim Mahato",
  publisher: "Rasim Mahato",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "Rasim Mahato - Student Developer & Tech Enthusiast",
    description: "Passionate student exploring full stack development, AI & robotics, machine learning, and creative tech.",
    siteName: "Rasim Mahato Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Rasim Mahato",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasim Mahato - Student Developer & Tech Enthusiast",
    description: "Passionate student exploring full stack development, AI & robotics, machine learning, and creative tech.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://yourwebsite.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body>
        <ClientLayout>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ClientLayout>
      </body>
    </html>
  );
}
