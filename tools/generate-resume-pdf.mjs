#!/usr/bin/env node

// ===================================================================
//  Resume PDF generator
//  Reads the same data file the React app uses, then writes a
//  single-file A4 PDF with the same dark/red theme as the site.
//  Output: public/resume-afarojkha-pathan.pdf
//  Run:    node tools/generate-resume-pdf.mjs
// ===================================================================

import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REPO = path.resolve(__dirname, '..');
const OUT = path.join(REPO, 'public', 'resume-afarojkha-pathan.pdf');

// The data file uses `import x from '...png'` which Node ESM cannot
// resolve. We collect the imported image names first, then nullify
// their references and strip the import lines, then rewrite the
// named exports to CommonJS `module.exports.xxx = ...` so we can
// `require()` it via a shim.
const dataPath = path.join(REPO, 'src', 'data', 'portfolio.js');
const rawSource = fs.readFileSync(dataPath, 'utf8');
const imageImports = [...rawSource.matchAll(/^import\s+(\w+)\s+from\s+['"][^'"]+\.(png|jpe?g|svg|webp|mp4)['"];?$/gm)];
let dataSource = rawSource;
// Nullify references to the image variables anywhere in the file
for (const m of imageImports) {
  dataSource = dataSource.replace(new RegExp(`\\b${m[1]}\\b`, 'g'), 'null');
}
// Strip the import lines (now that we've captured the names)
dataSource = dataSource.replace(/^import .+ from .+;$/gm, '// (image import stripped for PDF)');
// Rewrite ESM named exports to CommonJS
dataSource = dataSource.replace(/^export const (\w+)/gm, 'module.exports.$1');

const shimDir = path.join(REPO, '.pdf-build-tmp');
if (!fs.existsSync(shimDir)) fs.mkdirSync(shimDir, { recursive: true });
const shimPath = path.join(shimDir, 'portfolio-data.cjs');
fs.writeFileSync(shimPath, dataSource);
const portfolio = createRequire(import.meta.url)(shimPath);

// ------------------------------------------------------------------
// Theme
// ------------------------------------------------------------------
const COLORS = {
  bg: '#0a0a0a',
  panel: '#141414',
  text: '#ffffff',
  textMuted: '#b8b8b8',
  textSubtle: '#7a7a7a',
  accent: '#ff2a2a',
  accentSoft: '#ff6a6a',
  accentFaint: '#2a0a0a',
  border: '#ffffff15',
  success: '#10b981',
  brandTata: '#4866E5',
  brandInfosys: '#007CC3',
  brandAccenture: '#A100FF',
};

// ------------------------------------------------------------------
// PDF helpers
// ------------------------------------------------------------------
function makeDoc() {
  return new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 40, left: 40, right: 40 },
    info: {
      Title: `${portfolio.personal.fullName} — Resume`,
      Author: portfolio.personal.fullName,
      Subject: 'Software Engineer — Flutter, FastAPI & PostgreSQL',
      Keywords: 'Flutter, FastAPI, PostgreSQL, Software Engineer, Portfolio',
    },
    bufferPages: true,
  });
}

function sectionTitle(doc, label) {
  const x = doc.page.margins.left;
  const w = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const y = doc.y;

  // small red bar on the left
  doc.save();
  doc.rect(x, y, 4, 14).fill(COLORS.accent);
  doc.restore();

  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(COLORS.text)
    .text(label.toUpperCase(), x + 10, y, { characterSpacing: 1.2 });
  doc.moveDown(0.6);

  // hairline
  const lineY = doc.y;
  doc
    .strokeColor(COLORS.border)
    .lineWidth(0.5)
    .moveTo(x, lineY)
    .lineTo(x + w, lineY)
    .stroke();
  doc.moveDown(0.7);
}

function pill(doc, text, x, y, options = {}) {
  const { fill = COLORS.accentFaint, textColor = COLORS.accentSoft, padding = 4, fontSize = 7 } = options;

  doc.save();
  doc.fontSize(fontSize).font('Helvetica-Bold');
  const textWidth = doc.widthOfString(text);
  const w = textWidth + padding * 2;
  const h = fontSize + padding * 1.4;

  doc.roundedRect(x, y, w, h, 3).fill(fill);
  doc
    .fillColor(textColor)
    .text(text, x + padding, y + padding * 0.6, { lineBreak: false });
  doc.restore();

  return { w, h };
}

function header(doc) {
  const m = doc.page.margins.left;
  const w = doc.page.width - m * 2;
  const startY = 30;

  // Top accent bar
  doc.save();
  doc.rect(0, 0, doc.page.width, 6).fill(COLORS.accent);
  doc.restore();

  // Name
  doc
    .font('Helvetica-Bold')
    .fontSize(26)
    .fillColor(COLORS.text)
    .text(portfolio.personal.fullName.toUpperCase(), m, startY + 10, {
      characterSpacing: 1.5,
    });

  // Accent dot after the name
  const nameWidth = doc.widthOfString(portfolio.personal.fullName.toUpperCase());
  doc
    .fillColor(COLORS.accent)
    .circle(m + nameWidth + 8, startY + 24, 4)
    .fill();

  // Title
  doc
    .font('Helvetica')
    .fontSize(11)
    .fillColor(COLORS.accentSoft)
    .text('SOFTWARE ENGINEER  |  FLUTTER, FASTAPI & POSTGRESQL', m, startY + 46, {
      characterSpacing: 0.8,
    });

  // Contact row
  const contactY = startY + 70;
  const items = [
    { icon: '✉', text: portfolio.personal.email },
    { icon: '☎', text: portfolio.personal.phone },
    { icon: '◉', text: portfolio.personal.location },
  ];

  let cx = m;
  items.forEach((it, i) => {
    doc.fontSize(8).font('Helvetica-Bold').fillColor(COLORS.accent).text(it.icon, cx, contactY);
    doc.font('Helvetica').fontSize(8).fillColor(COLORS.textMuted).text(it.text, cx + 10, contactY);
    cx += doc.widthOfString(it.text) + 30;
  });

  // Second contact row
  const contact2Y = contactY + 14;
  const items2 = [
    { icon: '🌐', text: 'pathan-afroj.vercel.app' },
    { icon: 'in', text: 'linkedin.com/in/afarojkha-pathan' },
    { icon: '⌥', text: 'github.com/Mrkhan012' },
  ];

  cx = m;
  items2.forEach((it) => {
    doc.fontSize(8).font('Helvetica-Bold').fillColor(COLORS.accent).text(it.icon, cx, contact2Y);
    doc.font('Helvetica').fontSize(8).fillColor(COLORS.textMuted).text(it.text, cx + 10, contact2Y);
    cx += doc.widthOfString(it.text) + 35;
  });

  doc.y = contact2Y + 28;
}

function summary(doc) {
  sectionTitle(doc, 'Summary');
  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(COLORS.textMuted)
    .text(portfolio.resumeSummary, doc.page.margins.left, doc.y, {
      width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
      align: 'justify',
      lineGap: 2,
    });
  doc.moveDown(1.2);
}

function skills(doc) {
  sectionTitle(doc, 'Skills');

  const m = doc.page.margins.left;
  const colW = (doc.page.width - m * 2) / 2;

  // Group skills by category, render as label + pills
  const groups = portfolio.skills.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s.name);
    return acc;
  }, {});

  let i = 0;
  Object.entries(groups).forEach(([cat, names]) => {
    const col = i % 2;
    const x = m + col * colW;
    if (col === 0) {
      doc.moveDown(0.4);
      var rowY = doc.y;
    } else {
      rowY = doc.y;
    }

    // category label
    doc
      .font('Helvetica-Bold')
      .fontSize(8)
      .fillColor(COLORS.text)
      .text(cat + ':', x, rowY, { width: colW - 10, continued: false });

    const labelEnd = doc.y;

    // pills
    let px = x + doc.widthOfString(cat + ':') + 6;
    const py = labelEnd - 9;
    names.forEach((name) => {
      const { w } = pill(doc, name, px, py, {
        fill: COLORS.panel,
        textColor: COLORS.textMuted,
        fontSize: 6.5,
        padding: 3,
      });
      px += w + 4;
      // wrap to next line if it overflows
      if (px + 40 > x + colW) {
        doc.moveDown(0.8);
        var newY = doc.y;
        px = x;
        // re-align category for next column
      }
    });

    if (col === 1) doc.moveDown(0.6);
    i++;
  });

  doc.moveDown(1);
}

function experience(doc) {
  sectionTitle(doc, 'Professional Experience');

  portfolio.experiences.forEach((exp) => {
    const m = doc.page.margins.left;
    const w = doc.page.width - m * 2;

    // Duration pill on the right
    const durW = doc.widthOfString(exp.duration) + 14;
    doc.save();
    doc.roundedRect(doc.page.width - m - durW, doc.y, durW, 14, 4).fill(COLORS.accentFaint);
    doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.accentSoft)
      .text(exp.duration, doc.page.width - m - durW + 7, doc.y + 3.5, { lineBreak: false });
    doc.restore();

    // Role + company
    doc
      .font('Helvetica-Bold')
      .fontSize(11)
      .fillColor(COLORS.text)
      .text(exp.role, m, doc.y - 12, { width: w - durW - 10 });

    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor(COLORS.accentSoft)
      .text(`${exp.company}`, m, doc.y, { continued: true })
      .fillColor(COLORS.textSubtle)
      .text(`  •  ${exp.location}`, { continued: false });

    doc.moveDown(0.3);

    // Bullets
    exp.points.forEach((p) => {
      doc
        .font('Helvetica')
        .fontSize(8.5)
        .fillColor(COLORS.textMuted)
        .text('▸  ' + p, m + 8, doc.y, { width: w - 8, align: 'left', lineGap: 1.5 });
    });

    // Tech pills
    doc.moveDown(0.3);
    let px = m;
    const py = doc.y;
    exp.technologies.forEach((t) => {
      const { w: tw } = pill(doc, t, px, py, {
        fill: COLORS.panel,
        textColor: COLORS.textMuted,
        fontSize: 6.5,
        padding: 3,
      });
      px += tw + 4;
    });
    doc.moveDown(1.4);
  });
}

function projects(doc) {
  sectionTitle(doc, 'Projects');

  portfolio.projects.forEach((p) => {
    const m = doc.page.margins.left;
    const w = doc.page.width - m * 2;

    // Title
    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(COLORS.text)
      .text(p.title, m, doc.y, { width: w });

    // Subtitle (italic-ish: smaller, accent color)
    doc
      .font('Helvetica-Oblique')
      .fontSize(8)
      .fillColor(COLORS.accentSoft)
      .text(p.subtitle, m, doc.y, { width: w });

    doc.moveDown(0.2);

    // Description (truncated to keep one page neat)
    doc
      .font('Helvetica')
      .fontSize(8)
      .fillColor(COLORS.textMuted)
      .text(p.description, m, doc.y, { width: w, align: 'justify', lineGap: 1.2 });

    // Tech pills
    doc.moveDown(0.2);
    let px = m;
    const py = doc.y;
    p.technologies.forEach((t) => {
      const { w: tw } = pill(doc, t, px, py, {
        fill: COLORS.panel,
        textColor: COLORS.textMuted,
        fontSize: 6.5,
        padding: 3,
      });
      px += tw + 4;
    });
    doc.moveDown(1);
  });
}

function education(doc) {
  sectionTitle(doc, 'Education');

  const m = doc.page.margins.left;
  const w = doc.page.width - m * 2;

  portfolio.education.forEach((edu) => {
    // duration pill on the right
    const durW = doc.widthOfString(edu.duration) + 14;
    doc.save();
    doc.roundedRect(doc.page.width - m - durW, doc.y, durW, 14, 4).fill(COLORS.accentFaint);
    doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.accentSoft)
      .text(edu.duration, doc.page.width - m - durW + 7, doc.y + 3.5, { lineBreak: false });
    doc.restore();

    doc
      .font('Helvetica-Bold')
      .fontSize(10)
      .fillColor(COLORS.text)
      .text(edu.degree, m, doc.y - 12, { width: w - durW - 10 });

    doc
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor(COLORS.textMuted)
      .text(edu.institution, m, doc.y);

    doc.moveDown(1);
  });
}

function certifications(doc) {
  sectionTitle(doc, 'Licenses & Certifications');

  const m = doc.page.margins.left;
  const w = doc.page.width - m * 2;

  portfolio.certifications.forEach((c) => {
    const brandColor =
      c.company === 'Tata'
        ? COLORS.brandTata
        : c.company === 'Infosys'
          ? COLORS.brandInfosys
          : c.company === 'Accenture'
            ? COLORS.brandAccenture
            : COLORS.accent;

    // Left brand strip
    const stripY = doc.y;
    doc.save();
    doc.rect(m, stripY, 3, 36).fill(brandColor);
    doc.restore();

    // Title
    doc
      .font('Helvetica-Bold')
      .fontSize(9.5)
      .fillColor(COLORS.text)
      .text(c.title, m + 10, stripY, { width: w - 10 });

    // Issuer + date
    doc
      .font('Helvetica')
      .fontSize(7.5)
      .fillColor(COLORS.textMuted)
      .text(`${c.issuer}  •  Issued ${c.issued}`, m + 10, doc.y, { width: w - 10 });

    // Credential ID + link hint
    doc
      .font('Helvetica')
      .fontSize(7)
      .fillColor(COLORS.textSubtle)
      .text(`Credential ID: ${c.credentialId}`, m + 10, doc.y);

    doc.moveDown(0.8);
  });
}

function footer(doc) {
  // Page number + branding on every page
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const m = doc.page.margins.left;
    const w = doc.page.width - m * 2;
    const y = doc.page.height - 30;

    doc
      .font('Helvetica')
      .fontSize(7)
      .fillColor(COLORS.textSubtle)
      .text(
        `${portfolio.personal.fullName}  •  afroz.w9199@gmail.com  •  +91 91562 91160`,
        m,
        y,
        { width: w, align: 'center' }
      );

    doc
      .fillColor(COLORS.accent)
      .text(`Page ${i + 1} / ${range.count}`, m, y + 12, { width: w, align: 'center' });
  }
}

// ------------------------------------------------------------------
// Main
// ------------------------------------------------------------------
async function generate() {
  // Make sure output directory exists
  const outDir = path.dirname(OUT);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const doc = makeDoc();
  const stream = fs.createWriteStream(OUT);
  doc.pipe(stream);

  // Optional: set a dark page background for the first page
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.bg);
  doc.fillColor(COLORS.text);

  header(doc);
  summary(doc);
  skills(doc);
  experience(doc);
  certifications(doc);
  projects(doc);
  education(doc);

  footer(doc);
  doc.end();

  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

generate()
  .then(() => {
    const size = (fs.statSync(OUT).size / 1024).toFixed(1);
    console.log(`✅ Resume PDF generated: ${path.relative(process.cwd(), OUT)}  (${size} KB)`);
  })
  .catch((err) => {
    console.error('❌ PDF generation failed:', err);
    process.exit(1);
  });