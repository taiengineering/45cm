// Brand Voice — Channel-specific profiles
import type { BrandVoiceProfile } from '../runtime/ai/src/humanize/rules';

export const CHANNEL_VOICES: Record<string, Partial<BrandVoiceProfile>> = {
  linkedin: {
    tone: '전문성 중심. B2B 네트워킹 톤. 산업 전문가 느낌.',
    style: '짧은 단락, 핵심 먼저, 전문용어 적절히 사용',
    preferredPhrases: ['실무에서는', '현장 경험상', '전문가 의견'],
    forbiddenPatterns: ['ㅋㅋ', '!!', '~~', '이모지'],
  },
  facebook: {
    tone: '친근하고 접근 가능한 톤. 대화형.',
    style: '구어체 허용, 질문형 문장 많이, 가볍게',
    preferredPhrases: ['혹시 이런 경험 있으신가요?', '같이 생각해봐요'],
    forbiddenPatterns: ['결론적으로', '요약하면'],
  },
  naver_blog: {
    tone: '정보형 + SEO 최적화. 검색 친화적.',
    style: '소제목 활용, 단락 분리, 핵심 키워드 반복',
    preferredPhrases: ['알아보겠습니다', '정리해드리겠습니다', '참고하세요'],
    forbiddenPatterns: [],
  },
  naver_kin: {
    tone: '도움 주는 전문가 느낌. 신뢰감.',
    style: '질문자 상황에 공감 후 답변. 구체적 조치 제시.',
    preferredPhrases: ['실무적으로 보면', '참고하시면 좋을 점은'],
    forbiddenPatterns: ['결론적으로'],
  },
};

// Enhanced Anti-AI rules
export const ANTI_AI_RULES = [
  'GPT 특유의 마무리("도움이 되었으면 좋겠습니다", "추가적인 질문이 있으시면") 완전 삭제',
  '"이상으로" "이외에도" "따라서" 등 불필요한 접속어 제거',
  '문장 시작을 다양하게 — "또한", "그리고", "한편" 대신 자연스러운 연결',
  '인간적 리듬: 짧은 문장 후 긴 문장, 단언 후 설명',
  '완벽한 문단 구성 대신 생각의 흐름이 보이는 글쓰기',
  '특정 사례/숫자/경험을 언급하여 구체성 확보',
];
