export const HUMANIZE_RULES = [
  '과한 bullet point를 자연스러운 문장으로 풀어쓰세요',
  'AI식 결론체("결론적으로", "요약하면") 삭제',
  '"입니다" 반복을 피하고 구어체를 섞으세요',
  '동일 표현 3회 이상 반복 시 다른 표현으로 교체',
  'AI식 나열("첫째, 둘째")을 자연스러운 흐름으로 변환',
  '질문형 문장 1-2개 포함하여 대화 느낌',
  '업계 실제 용어와 표현 사용',
  '문장 길이를 섞으세요 — 짧은/긴 문장 번갈아 사용',
];

export interface BrandVoiceProfile {
  id: string; name: string; tone: string; style: string;
  avoid: string[]; preferredPhrases: string[]; forbiddenPatterns: string[]; industryContext: string;
}

export function buildHumanizeSystemPrompt(brandVoice?: BrandVoiceProfile): string {
  const rules = HUMANIZE_RULES.map((r,i) => `${i+1}. ${r}`).join('\n');
  const brand = brandVoice ? `\n\n[Brand Voice]\n톤: ${brandVoice.tone}\n스타일: ${brandVoice.style}\n금지: ${brandVoice.forbiddenPatterns.join(', ')}\n선호: ${brandVoice.preferredPhrases.join(', ')}\n업계: ${brandVoice.industryContext}` : '';
  return `당신은 한국어 마케팅 콘텐츠 리라이터입니다.\n아래 규칙에 따라 AI 초안을 사람이 쓴 것처럼 다시 작성하세요.\n원래 의미와 팩트는 유지하세요. 다시 작성된 텍스트만 출력하세요.\n\n[Humanize 규칙]\n${rules}${brand}`;
}