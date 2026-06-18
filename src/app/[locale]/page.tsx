import { Header } from "../../components/Header";
import { IntroSection } from "../../components/IntroSection";
import dynamic from "next/dynamic";
import {
  getPersonJsonLd,
  getWebPageJsonLd,
  getWebSiteJsonLd,
  localeMetadata,
  normalizeLocale,
} from "@/lib/seo";

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

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLocale(locale);
  const metadata = localeMetadata[safeLocale];
  const jsonLd = [
    getPersonJsonLd(),
    getWebSiteJsonLd(),
    getWebPageJsonLd({
      locale: safeLocale,
      title: metadata.title,
      description: metadata.description,
    }),
  ];

  return (
    <div className="min-h-screen relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
