import { Header } from "../../components/Header";
import { IntroSection } from "../../components/IntroSection";
import dynamic from "next/dynamic";

const SkillsSection = dynamic(() =>
  import("../../components/SkillsSection").then((module) => module.SkillsSection)
);
const ProjectsSection = dynamic(() =>
  import("../../components/ProjectsSection").then((module) => module.ProjectsSection)
);
const BlogSection = dynamic(() =>
  import("../../components/BlogSection").then((module) => module.BlogSection)
);
const AboutSection = dynamic(() =>
  import("../../components/AboutSection").then((module) => module.AboutSection)
);
const ContactSection = dynamic(() =>
  import("../../components/ContactSection").then((module) => module.ContactSection)
);
const Footer = dynamic(() =>
  import("../../components/Footer").then((module) => module.Footer)
);

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="overflow-x-hidden bg-background">
        <IntroSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection/>
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
