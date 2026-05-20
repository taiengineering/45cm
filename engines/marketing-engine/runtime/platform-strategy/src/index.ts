// Platform Strategy Runtime — automation level + fallback decisions

import { getAutomationLevel, type AutomationLevel } from '../platform-restrictions/src/index';

export interface PlatformStrategy {
  channel: string;
  automationLevel: AutomationLevel;
  publishMethod: 'api' | 'copy_assist' | 'manual';
  draftGeneration: 'ai' | 'ai_assist' | 'manual';
  visualGeneration: 'auto' | 'template' | 'manual';
  approvalRequired: boolean;
  fallback: string;
}

export function getPlatformStrategy(channel: string): PlatformStrategy {
  const level = getAutomationLevel(channel);
  switch (level) {
    case 'full_automation':
      return { channel, automationLevel: level, publishMethod: 'api', draftGeneration: 'ai', visualGeneration: 'auto', approvalRequired: false, fallback: 'copy_assist' };
    case 'assisted':
      return { channel, automationLevel: level, publishMethod: 'api', draftGeneration: 'ai_assist', visualGeneration: 'template', approvalRequired: true, fallback: 'copy_assist' };
    case 'manual_required':
      return { channel, automationLevel: level, publishMethod: 'copy_assist', draftGeneration: 'ai_assist', visualGeneration: 'template', approvalRequired: true, fallback: 'manual' };
    case 'blocked':
      return { channel, automationLevel: level, publishMethod: 'manual', draftGeneration: 'manual', visualGeneration: 'manual', approvalRequired: true, fallback: 'manual' };
  }
}

// Manual Assist Fallback: AI Draft → Operator Review → 1-click Copy/Open → Manual Publish
export interface AssistFallback {
  draftReady: boolean;
  copyText: string;
  openUrl: string;
  instructions: string;
}

export function createAssistFallback(channel: string, content: string): AssistFallback {
  const urls: Record<string, string> = {
    naver_blog: 'https://blog.naver.com/postwrite',
    tistory: 'https://www.tistory.com/auth/login',
    brunch: 'https://brunch.co.kr/write',
    naver_cafe: 'https://cafe.naver.com/',
  };
  return {
    draftReady: true,
    copyText: content,
    openUrl: urls[channel] ?? '',
    instructions: `1. 아래 내용을 복사합니다\n2. ${channel} 페이지를 엽니다\n3. 붙여넣기 후 게시합니다`,
  };
}
