'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../contexts/AppContext";
import { Header } from "../components/Header";
import { IntroSection } from "../components/IntroSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export default function HomePage() {
  const { ripples } = useApp();
  return (
    <div className="min-h-screen relative">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 100, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9999] rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "40px",
              height: "40px",
              transform: "translate(-50%, -50%)",
              background:
                ripple.targetTheme === 'dark'
                  ? "radial-gradient(circle, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.9) 30%, rgba(17, 24, 39, 0.7) 60%, transparent 100%)"
                  : "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.7) 60%, transparent 100%)",
            }}
          />
        ))}
      </AnimatePresence>

      <Header />
      <main>
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