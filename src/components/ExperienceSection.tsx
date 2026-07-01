import { Briefcase, Calendar, Code2 } from 'lucide-react';

const experience = [
  {
    id: 'tsit',
    technologies: ['Vue', 'Nuxt', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'RTL UI'],
  },
];

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  date: string;
  responsibilities: string[];
  impact: string;
};

type ExperienceSectionProps = {
  title: string;
  subtitle: string;
  impactLabel: string;
  items: ExperienceItem[];
};

export function ExperienceSection({ title, subtitle, impactLabel, items }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="relative border-l-2 border-blue-200 dark:border-blue-900 pl-6 sm:pl-8">
          {items.map((item) => {
            const meta = experience.find((experienceItem) => experienceItem.id === item.id) ?? experience[0];

            return (
              <article
                key={item.id}
                className="relative rounded-3xl border border-white/30 dark:border-gray-700/40 bg-white/70 dark:bg-gray-800/70 p-5 sm:p-7 shadow-lg"
              >
                <span className="absolute -left-[35px] sm:-left-[43px] top-7 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 ring-4 ring-white dark:ring-gray-950">
                  <Briefcase className="h-4 w-4 text-white" />
                </span>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-950 dark:text-white">{item.role}</h3>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{item.company}</p>
                  </div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-200">
                    <Calendar className="h-4 w-4" />
                    {item.date}
                  </p>
                </div>

                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {meta.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="inline-flex items-center gap-1 rounded-full border border-gray-200/80 dark:border-gray-700/80 bg-white/70 dark:bg-gray-900/50 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      {technology}
                    </span>
                  ))}
                </div>

                <p className="mt-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 p-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-950 dark:text-white">{impactLabel}:</span> {item.impact}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
