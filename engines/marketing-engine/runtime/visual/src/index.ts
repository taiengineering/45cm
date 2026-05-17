// Visual Runtime — Brand Visual Operations Engine
// Template-first, AI-assisted. NOT a generic image generator.

export interface VisualTemplate {
  id: string;
  name: string;
  type: 'linkedin_card' | 'blog_cover' | 'cta_banner' | 'faq_card' | 'campaign_card' | 'insight_card';
  layout: LayoutConfig;
  palette: PaletteConfig;
  fontStyle: FontStyleConfig;
  ctaPlacement: 'bottom' | 'right' | 'overlay' | 'none';
  backgroundStyle: 'solid' | 'gradient' | 'pattern' | 'image';
}

export interface LayoutConfig {
  width: number;
  height: number;
  padding: number;
  titleMaxLines: number;
  subtitleMaxLines: number;
  showLogo: boolean;
  showBrandBar: boolean;
}

export interface PaletteConfig {
  background: string;
  foreground: string;
  accent: string;
  ctaBackground: string;
  ctaForeground: string;
  brandBar: string;
}

export interface FontStyleConfig {
  titleWeight: number;
  titleSize: number;
  subtitleSize: number;
  ctaSize: number;
  family: string;
}

export interface BrandVisualPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  colors: string[];
  palette: PaletteConfig;
  fontStyle: FontStyleConfig;
  visualDensity: 'minimal' | 'balanced' | 'dense';
  ctaEmphasis: number; // 1-10
}

export interface CardGenerateInput {
  templateId: string;
  presetId: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  channel: string;
  brandName?: string;
}

export interface CardGenerateResult {
  svg: string;
  width: number;
  height: number;
  templateId: string;
  presetId: string;
}

// ====== Template Library ======

export const TEMPLATES: VisualTemplate[] = [
  {
    id: 'linkedin-professional',
    name: 'LinkedIn Professional',
    type: 'linkedin_card',
    layout: { width: 1200, height: 628, padding: 60, titleMaxLines: 3, subtitleMaxLines: 2, showLogo: true, showBrandBar: true },
    palette: { background: '#0f172a', foreground: '#e2e8f0', accent: '#3b82f6', ctaBackground: '#3b82f6', ctaForeground: '#ffffff', brandBar: '#3b82f6' },
    fontStyle: { titleWeight: 700, titleSize: 42, subtitleSize: 18, ctaSize: 16, family: 'sans-serif' },
    ctaPlacement: 'bottom',
    backgroundStyle: 'solid',
  },
  {
    id: 'linkedin-insight',
    name: 'LinkedIn Insight',
    type: 'insight_card',
    layout: { width: 1200, height: 628, padding: 60, titleMaxLines: 2, subtitleMaxLines: 3, showLogo: true, showBrandBar: false },
    palette: { background: '#18181b', foreground: '#e4e4e7', accent: '#a78bfa', ctaBackground: '#a78bfa', ctaForeground: '#ffffff', brandBar: '#a78bfa' },
    fontStyle: { titleWeight: 700, titleSize: 38, subtitleSize: 16, ctaSize: 14, family: 'sans-serif' },
    ctaPlacement: 'bottom',
    backgroundStyle: 'solid',
  },
  {
    id: 'safety-alert',
    name: 'Safety Alert',
    type: 'campaign_card',
    layout: { width: 1200, height: 628, padding: 60, titleMaxLines: 2, subtitleMaxLines: 2, showLogo: true, showBrandBar: true },
    palette: { background: '#1e1e1e', foreground: '#fef2f2', accent: '#f97316', ctaBackground: '#dc2626', ctaForeground: '#ffffff', brandBar: '#f97316' },
    fontStyle: { titleWeight: 800, titleSize: 44, subtitleSize: 18, ctaSize: 16, family: 'sans-serif' },
    ctaPlacement: 'bottom',
    backgroundStyle: 'solid',
  },
  {
    id: 'clean-corporate',
    name: 'Clean Corporate',
    type: 'linkedin_card',
    layout: { width: 1200, height: 628, padding: 64, titleMaxLines: 3, subtitleMaxLines: 2, showLogo: true, showBrandBar: true },
    palette: { background: '#ffffff', foreground: '#0f172a', accent: '#0ea5e9', ctaBackground: '#0ea5e9', ctaForeground: '#ffffff', brandBar: '#0ea5e9' },
    fontStyle: { titleWeight: 700, titleSize: 40, subtitleSize: 17, ctaSize: 15, family: 'sans-serif' },
    ctaPlacement: 'bottom',
    backgroundStyle: 'solid',
  },
  {
    id: 'faq-card',
    name: 'FAQ Card',
    type: 'faq_card',
    layout: { width: 1080, height: 1080, padding: 60, titleMaxLines: 3, subtitleMaxLines: 4, showLogo: true, showBrandBar: true },
    palette: { background: '#fafafa', foreground: '#171717', accent: '#171717', ctaBackground: '#171717', ctaForeground: '#fafafa', brandBar: '#171717' },
    fontStyle: { titleWeight: 700, titleSize: 36, subtitleSize: 18, ctaSize: 14, family: 'sans-serif' },
    ctaPlacement: 'bottom',
    backgroundStyle: 'solid',
  },
  {
    id: 'cta-banner',
    name: 'CTA Banner',
    type: 'cta_banner',
    layout: { width: 1200, height: 400, padding: 48, titleMaxLines: 2, subtitleMaxLines: 1, showLogo: false, showBrandBar: false },
    palette: { background: '#0f172a', foreground: '#e2e8f0', accent: '#22c55e', ctaBackground: '#22c55e', ctaForeground: '#0f172a', brandBar: '#22c55e' },
    fontStyle: { titleWeight: 700, titleSize: 36, subtitleSize: 16, ctaSize: 18, family: 'sans-serif' },
    ctaPlacement: 'right',
    backgroundStyle: 'gradient',
  },
  {
    id: 'blog-cover',
    name: 'Blog Cover',
    type: 'blog_cover',
    layout: { width: 1200, height: 630, padding: 60, titleMaxLines: 3, subtitleMaxLines: 2, showLogo: true, showBrandBar: true },
    palette: { background: '#1a1a2e', foreground: '#eaeaea', accent: '#e94560', ctaBackground: '#e94560', ctaForeground: '#ffffff', brandBar: '#e94560' },
    fontStyle: { titleWeight: 700, titleSize: 40, subtitleSize: 16, ctaSize: 14, family: 'sans-serif' },
    ctaPlacement: 'bottom',
    backgroundStyle: 'solid',
  },
];

// ====== Brand Visual Presets ======

export const BRAND_PRESETS: BrandVisualPreset[] = [
  {
    id: 'tai_professional', name: 'TAI Professional', description: '산업안전 + 전문성', icon: '🏢',
    colors: ['#0f172a', '#1e40af', '#3b82f6', '#e2e8f0'],
    palette: { background: '#0f172a', foreground: '#e2e8f0', accent: '#3b82f6', ctaBackground: '#3b82f6', ctaForeground: '#ffffff', brandBar: '#3b82f6' },
    fontStyle: { titleWeight: 700, titleSize: 42, subtitleSize: 18, ctaSize: 16, family: 'sans-serif' },
    visualDensity: 'balanced', ctaEmphasis: 5,
  },
  {
    id: 'minimal_corporate', name: 'Minimal Corporate', description: '미니멀 기업형', icon: '◻',
    colors: ['#fafafa', '#e5e5e5', '#171717', '#525252'],
    palette: { background: '#fafafa', foreground: '#171717', accent: '#171717', ctaBackground: '#171717', ctaForeground: '#fafafa', brandBar: '#171717' },
    fontStyle: { titleWeight: 600, titleSize: 38, subtitleSize: 16, ctaSize: 14, family: 'sans-serif' },
    visualDensity: 'minimal', ctaEmphasis: 3,
  },
  {
    id: 'technical_insight', name: 'Technical Insight', description: '기술 콘텐츠형', icon: '🖥️',
    colors: ['#18181b', '#27272a', '#a78bfa', '#e4e4e7'],
    palette: { background: '#18181b', foreground: '#e4e4e7', accent: '#a78bfa', ctaBackground: '#a78bfa', ctaForeground: '#ffffff', brandBar: '#a78bfa' },
    fontStyle: { titleWeight: 700, titleSize: 40, subtitleSize: 17, ctaSize: 15, family: 'monospace' },
    visualDensity: 'balanced', ctaEmphasis: 4,
  },
  {
    id: 'safety_alert', name: 'Safety Alert', description: '경고/주의형', icon: '⚠️',
    colors: ['#1e1e1e', '#dc2626', '#f97316', '#fef2f2'],
    palette: { background: '#1e1e1e', foreground: '#fef2f2', accent: '#f97316', ctaBackground: '#dc2626', ctaForeground: '#ffffff', brandBar: '#f97316' },
    fontStyle: { titleWeight: 800, titleSize: 44, subtitleSize: 18, ctaSize: 16, family: 'sans-serif' },
    visualDensity: 'dense', ctaEmphasis: 7,
  },
  {
    id: 'warm_advisor', name: 'Warm Advisor', description: '부드러운 설명형', icon: '🌟',
    colors: ['#fffbeb', '#f59e0b', '#92400e', '#1c1917'],
    palette: { background: '#fffbeb', foreground: '#1c1917', accent: '#f59e0b', ctaBackground: '#f59e0b', ctaForeground: '#1c1917', brandBar: '#f59e0b' },
    fontStyle: { titleWeight: 600, titleSize: 38, subtitleSize: 17, ctaSize: 15, family: 'sans-serif' },
    visualDensity: 'balanced', ctaEmphasis: 4,
  },
  {
    id: 'industrial_modern', name: 'Industrial Modern', description: '산업형 다크톤', icon: '⚙️',
    colors: ['#1a1a2e', '#16213e', '#e94560', '#eaeaea'],
    palette: { background: '#1a1a2e', foreground: '#eaeaea', accent: '#e94560', ctaBackground: '#e94560', ctaForeground: '#ffffff', brandBar: '#e94560' },
    fontStyle: { titleWeight: 700, titleSize: 42, subtitleSize: 18, ctaSize: 16, family: 'sans-serif' },
    visualDensity: 'dense', ctaEmphasis: 6,
  },
];

// ====== SVG Card Generator ======

export function generateCardSVG(input: CardGenerateInput): CardGenerateResult {
  const template = TEMPLATES.find(t => t.id === input.templateId) ?? TEMPLATES[0];
  const preset = BRAND_PRESETS.find(p => p.id === input.presetId) ?? BRAND_PRESETS[0];
  const { layout } = template;
  const pal = preset.palette;
  const font = preset.fontStyle;

  const brandName = input.brandName ?? 'TAI Engineering';
  const titleLines = input.title.split('\n').slice(0, layout.titleMaxLines);

  let bgFill = `<rect width="${layout.width}" height="${layout.height}" fill="${pal.background}" />`;
  if (template.backgroundStyle === 'gradient') {
    bgFill = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${pal.background}" /><stop offset="100%" stop-color="${pal.accent}22" /></linearGradient></defs><rect width="${layout.width}" height="${layout.height}" fill="url(#bg)" />`;
  }

  const brandBar = layout.showBrandBar
    ? `<rect x="0" y="0" width="4" height="${layout.height}" fill="${pal.brandBar}" />`
    : '';

  const logo = layout.showLogo
    ? `<text x="${layout.padding + 4}" y="${layout.padding + 16}" fill="${pal.accent}" font-size="12" font-weight="600" font-family="${font.family}" text-transform="uppercase" letter-spacing="1">${brandName}</text>`
    : '';

  const titleY = layout.padding + (layout.showLogo ? 56 : 20);
  const titleSvg = titleLines.map((line, i) =>
    `<text x="${layout.padding + 4}" y="${titleY + i * (font.titleSize + 8)}" fill="${pal.foreground}" font-size="${font.titleSize}" font-weight="${font.titleWeight}" font-family="${font.family}">${escapeXml(line)}</text>`
  ).join('');

  const accentBar = `<rect x="${layout.padding + 4}" y="${titleY + titleLines.length * (font.titleSize + 8) + 8}" width="40" height="3" rx="1.5" fill="${pal.accent}" />`;

  const subtitleY = titleY + titleLines.length * (font.titleSize + 8) + 28;
  const subtitle = input.subtitle
    ? `<text x="${layout.padding + 4}" y="${subtitleY}" fill="${pal.foreground}" opacity="0.7" font-size="${font.subtitleSize}" font-family="${font.family}">${escapeXml(input.subtitle.slice(0, 80))}</text>`
    : '';

  let cta = '';
  if (input.ctaText && template.ctaPlacement !== 'none') {
    if (template.ctaPlacement === 'right') {
      cta = `<rect x="${layout.width - layout.padding - 220}" y="${layout.height / 2 - 24}" width="200" height="48" rx="8" fill="${pal.ctaBackground}" />
             <text x="${layout.width - layout.padding - 120}" y="${layout.height / 2 + 4}" fill="${pal.ctaForeground}" font-size="${font.ctaSize}" font-weight="600" text-anchor="middle" font-family="${font.family}">${escapeXml(input.ctaText)}</text>`;
    } else {
      cta = `<rect x="${layout.padding + 4}" y="${layout.height - layout.padding - 44}" width="${Math.min(input.ctaText.length * (font.ctaSize * 0.7) + 32, 300)}" height="40" rx="6" fill="${pal.ctaBackground}" />
             <text x="${layout.padding + 4 + Math.min(input.ctaText.length * (font.ctaSize * 0.7) + 32, 300) / 2}" y="${layout.height - layout.padding - 19}" fill="${pal.ctaForeground}" font-size="${font.ctaSize}" font-weight="600" text-anchor="middle" font-family="${font.family}">${escapeXml(input.ctaText)}</text>`;
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${layout.width} ${layout.height}" width="${layout.width}" height="${layout.height}">
${bgFill}
${brandBar}
${logo}
${titleSvg}
${accentBar}
${subtitle}
${cta}
</svg>`;

  return { svg, width: layout.width, height: layout.height, templateId: template.id, presetId: preset.id };
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ====== Channel Mapping ======

export const CHANNEL_TEMPLATE_MAP: Record<string, string[]> = {
  linkedin: ['linkedin-professional', 'linkedin-insight', 'clean-corporate'],
  facebook: ['clean-corporate', 'faq-card'],
  naver_blog: ['blog-cover', 'clean-corporate'],
  cta: ['cta-banner'],
};

export function getTemplatesForChannel(channel: string): VisualTemplate[] {
  const ids = CHANNEL_TEMPLATE_MAP[channel] ?? ['linkedin-professional'];
  return ids.map(id => TEMPLATES.find(t => t.id === id)).filter(Boolean) as VisualTemplate[];
}

// ====== Visual Smell Analysis ======

export interface VisualSmellResult {
  before: number;
  after: number;
  items: { name: string; mitigated: boolean }[];
}

export function analyzeVisualSmell(presetId: string): VisualSmellResult {
  const preset = BRAND_PRESETS.find(p => p.id === presetId);
  const isTemplate = true; // template-first = always lower AI smell
  const base = 68;
  const reduction = isTemplate ? 48 : 20;
  const extra = preset?.visualDensity === 'minimal' ? 8 : preset?.visualDensity === 'dense' ? -4 : 0;

  return {
    before: base,
    after: Math.max(5, base - reduction - extra),
    items: [
      { name: '제네릭 AI 구도 제거', mitigated: isTemplate },
      { name: '과생성 텍스처 제거', mitigated: isTemplate },
      { name: '가짜 스톡 느낌 제거', mitigated: preset?.visualDensity !== 'dense' },
      { name: '비현실적 조명 제거', mitigated: isTemplate },
      { name: '브랜드 불일치 제거', mitigated: !!preset },
      { name: '템플릿 반복감 감소', mitigated: false }, // always room to improve
    ],
  };
}
