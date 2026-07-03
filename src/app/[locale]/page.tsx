import { Header } from "../../components/Header";
import { IntroSection } from "../../components/IntroSection";
import { AboutSection } from "@/components/AboutSection";
import { DeferredSection } from "@/components/DeferredSection";
import { Footer } from "@/components/Footer";
import { ProjectsSection } from "@/components/ProjectsSection";
import { projectDefinitions } from "@/data/projects";
// import { ExperienceSection } from "@/components/ExperienceSection";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import {
  getAbsoluteAssetUrl,
  getAbsoluteUrl,
  getDefaultOpenGraphImage,
  getLanguageAlternates,
  getOpenGraphAlternateLocales,
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
    keywords: metadata.keywords,
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
      alternateLocale: getOpenGraphAlternateLocales(safeLocale),
      type: "website",
      images: getDefaultOpenGraphImage(),
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
    projectDefinitions.map((project) => [project.titleKey, t(project.titleKey)])
  );
  const projectDescriptions = Object.fromEntries(
    projectDefinitions.map((project) => [project.descKey, t(project.descKey)])
  );
  // const experienceItems = [
  //   {
  //     id: "tsit",
  //     role: t("experienceRoleFrontend"),
  //     company: t("experienceCompanyTsit"),
  //     date: t("experienceDateTsit"),
  //     responsibilities: [
  //       t("experienceResponsibilityTsit1"),
  //       t("experienceResponsibilityTsit2"),
  //       t("experienceResponsibilityTsit3"),
  //       t("experienceResponsibilityTsit4"),
  //       t("experienceResponsibilityTsit5"),
  //     ],
  //     impact: t("experienceImpactTsit"),
  //   },
  // ];
  const projectsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t("projectsTitle"),
    description: t("projectsSubtitle"),
    itemListElement: projectDefinitions.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: projectTitles[project.titleKey],
        description: projectDescriptions[project.descKey],
        url: project.link,
        image: getAbsoluteAssetUrl(project.image),
        dateCreated: project.year,
        creator: {
          '@type': 'Person',
          name: siteConfig.name,
          url: siteConfig.siteUrl,
        },
        keywords: [
          projectTitles[project.titleKey],
          'Frontend',
          'Vue',
          'Nuxt',
          'TypeScript',
          'RTL',
          'Dashboard',
          'Web Application',
        ].join(', '),
      },
    })),
  };

  const jsonLd = [
    getPersonJsonLd(),
    getWebSiteJsonLd(),
    getWebPageJsonLd({
      locale: safeLocale,
      title: metadata.title,
      description: metadata.description,
    }),
    projectsJsonLd,
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
        {/* <ExperienceSection
          title={t("experienceTitle")}
          subtitle={t("experienceSubtitle")}
          impactLabel={t("experienceImpactLabel")}
          items={experienceItems}
        /> */}
        <ProjectsSection
          title={t("projectsTitle")}
          subtitle={t("projectsSubtitle")}
          viewDetails={t("viewDetails")}
          projectTitles={projectTitles}
          projectDescriptions={projectDescriptions}
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
