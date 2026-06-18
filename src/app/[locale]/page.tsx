import { Header } from "../../components/Header";
import { IntroSection } from "../../components/IntroSection";
import { AboutSection } from "@/components/AboutSection";
import { DeferredSection } from "@/components/DeferredSection";
import { Footer } from "@/components/Footer";
import { ProjectsSection } from "@/components/ProjectsSection";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import {
  getAbsoluteUrl,
  getLanguageAlternates,
  getPersonJsonLd,
  getWebPageJsonLd,
  getWebSiteJsonLd,
  localeMetadata,
  normalizeLocale,
  siteConfig,
} from "@/lib/seo";

const SkillsSection = dynamic(() =>
  import("../../components/SkillsSection").then((module) => module.SkillsSection)
);
const BlogSection = dynamic(() =>
  import("../../components/BlogSection").then((module) => module.BlogSection)
);
const ContactSection = dynamic(() =>
  import("../../components/ContactSection").then((module) => module.ContactSection)
);

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type Messages = Record<string, string>;

const projectTitleKeys = [
  "fars",
  "virasty",
  "msgway",
  "gap",
  "bimehyar",
  "nasimrezvan",
  "rpgSkillTracker",
  "ipedco2026",
] as const;

async function getMessages(locale: string): Promise<Messages> {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    return (await import("../../messages/en.json")).default;
  }
}

function splitFooterMade(value: string) {
  const separators = ["❤️", "❤", "Ã¢ÂÂ¤Ã¯Â¸Â", "â¤ï¸"];
  const separator = separators.find((item) => value.includes(item));

  if (!separator) {
    return { before: value, after: "" };
  }

  const [before, ...after] = value.split(separator);

  return { before, after: after.join(separator) };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLocale(locale);
  const metadata = localeMetadata[safeLocale];
  const canonical = getAbsoluteUrl(safeLocale);

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical,
      languages: {
        ...getLanguageAlternates(),
        "x-default": getAbsoluteUrl(siteConfig.defaultLocale),
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: metadata.ogLocale,
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Frontend Developer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const safeLocale = normalizeLocale(locale);
  const metadata = localeMetadata[safeLocale];
  const messages = await getMessages(safeLocale);
  const t = (key: string) => messages[key] ?? key;
  const footerMade = splitFooterMade(t("footerMade"));
  const projectTitles = Object.fromEntries(
    projectTitleKeys.map((key) => [key, t(key)])
  );
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
        <DeferredSection id="skills" minHeight={560}>
          <SkillsSection />
        </DeferredSection>
        <ProjectsSection
          title={t("projectsTitle")}
          subtitle={t("projectsSubtitle")}
          viewDetails={t("viewDetails")}
          projectTitles={projectTitles}
        />
        <DeferredSection id="blog" minHeight={640}>
          <BlogSection />
        </DeferredSection>
        <AboutSection
          title={t("aboutTitle")}
          subtitle={t("aboutSubtitle")}
          text1={t("aboutText1")}
          text2={t("aboutText2")}
          text3={t("aboutText3")}
          years={t("years")}
          experience={t("experience")}
          project={t("project")}
          completed={t("completed")}
          coffee={t("coffee")}
          consumed={t("consumed")}
        />
        <DeferredSection id="contact" minHeight={720}>
          <ContactSection />
        </DeferredSection>
      </main>
      <Footer
        footerText={t("footerText")}
        footerMadeBefore={footerMade.before}
        footerMadeAfter={footerMade.after}
      />
    </div>
  );
}
