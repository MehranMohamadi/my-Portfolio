'use client'

import { useApp } from "../../contexts/AppContext";
import { Header } from "../../components/Header";
import { IntroSection } from "../../components/IntroSection";
import { SkillsSection } from "../../components/SkillsSection";
import { ProjectsSection } from "../../components/ProjectsSection";
import { AboutSection } from "../../components/AboutSection";
import { ContactSection } from "../../components/ContactSection";
import { Footer } from "../../components/Footer";
import dynamic from "next/dynamic";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="overflow-x-hidden bg-background">
        <IntroSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}