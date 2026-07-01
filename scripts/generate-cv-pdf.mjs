import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const outputPath = join(process.cwd(), 'public', 'Mehran-Mohammadi-CV.pdf');

const pages = [
  [
    { text: 'Mehran Mohammadi', size: 24, bold: true },
    { text: 'Frontend Engineer - Vue, Nuxt, TypeScript', size: 14 },
    { text: 'Email: mehran.mohammadi.frd@gmail.com | Telegram: @Mehran_ll', size: 10 },
    { text: 'LinkedIn: linkedin.com/in/mehran-mohammadi-far | GitHub: github.com/MehranMohamadi', size: 10 },
    { text: 'Portfolio: mehranmohammadifrd.ir', size: 10 },
    { gap: 14 },
    { text: 'Profile', size: 15, bold: true },
    {
      text:
        'Frontend Engineer with 4+ years of experience building production web applications with Vue, Nuxt, TypeScript, JavaScript and modern frontend tooling. Focused on scalable product interfaces, clean component architecture, performance, RTL/Persian user experiences, dashboards, forms, API-driven flows and maintainable UI systems.',
      size: 10,
    },
    { gap: 10 },
    { text: 'Core Skills', size: 15, bold: true },
    { text: 'Core Stack: Vue.js, Nuxt.js, TypeScript, JavaScript, Tailwind CSS', size: 10 },
    { text: 'Frontend Engineering: SSR, Component Architecture, State Management, REST API Integration, Performance Optimization, Responsive Design, RTL Interfaces', size: 10 },
    { text: 'Also Worked With: React, Next.js, Svelte', size: 10 },
    { text: 'Tools: Git, Vercel, Figma, npm/pnpm', size: 10 },
    { gap: 10 },
    { text: 'Work Experience', size: 15, bold: true },
    { text: 'Frontend Developer - Tosee Saman / TSIT', size: 12, bold: true },
    { text: '2022 - Present', size: 10 },
    { text: '- Built and maintained production web applications using Vue, Nuxt, JavaScript/TypeScript and modern frontend tooling.', size: 10 },
    { text: '- Developed reusable UI components, dashboards, forms, tables, filters and API-driven interfaces.', size: 10 },
    { text: '- Worked on RTL/Persian interfaces and responsive layouts.', size: 10 },
    { text: '- Collaborated with backend developers, designers and product stakeholders.', size: 10 },
    { text: '- Improved maintainability through cleaner component structure and reusable patterns.', size: 10 },
    { text: 'Technologies: Vue, Nuxt, JavaScript, TypeScript, Tailwind CSS, REST APIs, RTL UI', size: 10 },
  ],
  [
    { text: 'Selected Projects', size: 18, bold: true },
    { gap: 8 },
    { text: 'Bimehyar - Frontend Developer', size: 12, bold: true },
    { text: 'Stack: Vue/Nuxt, Tailwind CSS, REST API, RTL UI', size: 10 },
    { text: 'Built insurance-related user flows, responsive pages, form-heavy interfaces and API integrations. Managed multi-step user flows, validation and Persian RTL UX. Result: production-ready insurance platform UI with user-focused purchase and comparison flows.', size: 10 },
    { gap: 8 },
    { text: 'SkillXP / RPG Skill Tracker - Personal Project / Frontend Developer', size: 12, bold: true },
    { text: 'Stack: Nuxt/Vue, TypeScript, Tailwind, Vercel', size: 10 },
    { text: 'Built a dashboard-like interface for XP, streaks, achievements and habit tracking with reusable components. Demonstrates product thinking, UI architecture and frontend implementation beyond simple landing pages.', size: 10 },
    { gap: 8 },
    { text: 'IPEDCO / Tavan Sanat Shargh - Frontend Developer', size: 12, bold: true },
    { text: 'Stack: Nuxt/Vue, Tailwind, Responsive UI', size: 10 },
    { text: 'Built corporate website pages, product/service presentation, blog/article structure and contact sections. Result: professional company website suitable for presenting services, products and articles.', size: 10 },
    { gap: 8 },
    { text: 'Additional Production Contributions', size: 12, bold: true },
    { text: '- Fars News: Contributed to frontend development of content-heavy responsive news interfaces.', size: 10 },
    { text: '- Virasty: Contributed to frontend screens, RTL layouts and component-based product UI.', size: 10 },
    { text: '- Msg Way: Contributed to dashboard-style communication product UI and API-driven interfaces.', size: 10 },
    { text: '- Gap Messenger: Contributed to responsive Persian messenger product UI patterns.', size: 10 },
    { text: '- Nasim Rezvan: Contributed to RTL service application screens, forms and workflows.', size: 10 },
    { gap: 10 },
    { text: 'Selected Impact', size: 15, bold: true },
    { text: '- Built production web applications used by real users.', size: 10 },
    { text: '- Worked on complex RTL/Persian interfaces and responsive layouts.', size: 10 },
    { text: '- Experienced with Vue/Nuxt SSR applications.', size: 10 },
    { text: '- Built reusable components and scalable UI structures.', size: 10 },
    { text: '- Integrated REST APIs, authentication flows, forms, filters and tables.', size: 10 },
    { text: '- Focused on maintainability, performance and clean frontend architecture.', size: 10 },
  ],
];

const pageWidth = 595.28;
const pageHeight = 841.89;
const marginX = 52;
const topY = 790;
const maxWidth = 490;

function escapePdfText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrapText(text, size) {
  const avgCharWidth = size * 0.48;
  const maxChars = Math.floor(maxWidth / avgCharWidth);
  const words = text.split(' ');
  const lines = [];
  let line = '';

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

function makePageContent(items) {
  let y = topY;
  const commands = [];

  for (const item of items) {
    if (item.gap) {
      y -= item.gap;
      continue;
    }

    const size = item.size ?? 10;
    const font = item.bold ? 'F2' : 'F1';
    const lineHeight = Math.max(size + 4, 14);
    const lines = wrapText(item.text, size);

    for (const line of lines) {
      commands.push(`BT /${font} ${size} Tf ${marginX} ${y.toFixed(2)} Td (${escapePdfText(line)}) Tj ET`);
      y -= lineHeight;
    }

    y -= item.bold ? 4 : 2;
  }

  return commands.join('\n');
}

const objects = [];
function addObject(content) {
  objects.push(content);
  return objects.length;
}

const catalogId = addObject('<< /Type /Catalog /Pages 2 0 R >>');
const pagesId = addObject('');
const fontRegularId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
const fontBoldId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

const pageIds = [];
for (const page of pages) {
  const stream = makePageContent(page);
  const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`);
  const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`);
  pageIds.push(pageId);
}

objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

let pdf = '%PDF-1.4\n';
const offsets = [0];
for (let index = 0; index < objects.length; index += 1) {
  offsets.push(Buffer.byteLength(pdf, 'utf8'));
  pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf, 'utf8');
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';
for (let index = 1; index < offsets.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, pdf);
console.log(outputPath);
