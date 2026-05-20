// Universal Channel Registry — Korea-first, enterprise universal
import type { ChannelCategory } from './categories';
import type { ChannelCapabilityType } from './capabilities';
import { CHANNEL_CAPABILITIES } from './capabilities';

export type ChannelStatus = 'active' | 'available' | 'manual' | 'planning' | 'coming_soon';

export interface UniversalChannel {
  id: string;
  name: string;
  nameKo: string;
  category: ChannelCategory;
  icon: string;
  capabilities: ChannelCapabilityType[];
  status: ChannelStatus;
  oauthSupported: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  ctaSensitivity: 'low' | 'medium' | 'high';
  cadence: string;
}

export const UNIVERSAL_CHANNELS: UniversalChannel[] = [
  // SNS
  { id:'instagram', name:'Instagram', nameKo:'인스타그램', category:'social', icon:'📸', capabilities:CHANNEL_CAPABILITIES.instagram, status:'coming_soon', oauthSupported:true, riskLevel:'medium', ctaSensitivity:'low', cadence:'주 3-5회' },
  { id:'facebook', name:'Facebook Page', nameKo:'페이스북 페이지', category:'social', icon:'📘', capabilities:CHANNEL_CAPABILITIES.facebook, status:'available', oauthSupported:true, riskLevel:'low', ctaSensitivity:'medium', cadence:'주 2-3회' },
  { id:'linkedin', name:'LinkedIn', nameKo:'링크드인', category:'social', icon:'🔗', capabilities:CHANNEL_CAPABILITIES.linkedin, status:'active', oauthSupported:true, riskLevel:'low', ctaSensitivity:'high', cadence:'주 2-3회' },
  { id:'threads', name:'Threads', nameKo:'쓰레드', category:'social', icon:'🧵', capabilities:CHANNEL_CAPABILITIES.threads, status:'coming_soon', oauthSupported:true, riskLevel:'low', ctaSensitivity:'low', cadence:'주 3-5회' },
  // Blog
  { id:'naver_blog', name:'Naver Blog', nameKo:'네이버 블로그', category:'blog', icon:'🟢', capabilities:CHANNEL_CAPABILITIES.naver_blog, status:'available', oauthSupported:true, riskLevel:'low', ctaSensitivity:'medium', cadence:'주 1-2회' },
  { id:'tistory', name:'Tistory', nameKo:'티스토리', category:'blog', icon:'📙', capabilities:CHANNEL_CAPABILITIES.tistory, status:'planning', oauthSupported:false, riskLevel:'low', ctaSensitivity:'medium', cadence:'주 1-2회' },
  { id:'brunch', name:'Brunch', nameKo:'브런치', category:'blog', icon:'☕', capabilities:CHANNEL_CAPABILITIES.brunch, status:'planning', oauthSupported:false, riskLevel:'low', ctaSensitivity:'low', cadence:'주 1회' },
  // Short Video
  { id:'youtube_shorts', name:'YouTube Shorts', nameKo:'유튜브 쇼츠', category:'short_video', icon:'▶️', capabilities:CHANNEL_CAPABILITIES.youtube_shorts, status:'coming_soon', oauthSupported:true, riskLevel:'high', ctaSensitivity:'low', cadence:'주 3-5회' },
  { id:'instagram_reels', name:'Instagram Reels', nameKo:'인스타 릴스', category:'short_video', icon:'🎬', capabilities:CHANNEL_CAPABILITIES.instagram_reels, status:'coming_soon', oauthSupported:true, riskLevel:'high', ctaSensitivity:'low', cadence:'주 3-5회' },
  { id:'tiktok', name:'TikTok', nameKo:'틱톡', category:'short_video', icon:'🎵', capabilities:CHANNEL_CAPABILITIES.tiktok, status:'coming_soon', oauthSupported:true, riskLevel:'high', ctaSensitivity:'low', cadence:'주 5-7회' },
  // Video
  { id:'youtube', name:'YouTube', nameKo:'유튜브', category:'video', icon:'🎥', capabilities:CHANNEL_CAPABILITIES.youtube, status:'coming_soon', oauthSupported:true, riskLevel:'medium', ctaSensitivity:'medium', cadence:'주 1-2회' },
  // Community
  { id:'naver_cafe', name:'Naver Cafe', nameKo:'네이버 카페', category:'community', icon:'☕', capabilities:CHANNEL_CAPABILITIES.naver_cafe, status:'planning', oauthSupported:false, riskLevel:'medium', ctaSensitivity:'high', cadence:'주 2-3회' },
  // Messaging
  { id:'kakao_channel', name:'Kakao Channel', nameKo:'카카오 채널', category:'messaging', icon:'📨', capabilities:CHANNEL_CAPABILITIES.kakao_channel, status:'planning', oauthSupported:true, riskLevel:'high', ctaSensitivity:'medium', cadence:'주 1-2회' },
  { id:'email', name:'Email', nameKo:'이메일', category:'messaging', icon:'✉️', capabilities:CHANNEL_CAPABILITIES.email, status:'planning', oauthSupported:false, riskLevel:'medium', ctaSensitivity:'medium', cadence:'주 1회' },
  { id:'sms', name:'SMS', nameKo:'SMS', category:'messaging', icon:'📱', capabilities:CHANNEL_CAPABILITIES.sms, status:'planning', oauthSupported:false, riskLevel:'high', ctaSensitivity:'high', cadence:'월 2-4회' },
  { id:'alimtalk', name:'Alimtalk', nameKo:'알림톡', category:'messaging', icon:'📢', capabilities:CHANNEL_CAPABILITIES.alimtalk, status:'planning', oauthSupported:true, riskLevel:'high', ctaSensitivity:'medium', cadence:'주 1-2회' },
  // Search Presence
  { id:'naver_place', name:'Naver Place', nameKo:'네이버 플레이스', category:'search_presence', icon:'📍', capabilities:CHANNEL_CAPABILITIES.naver_place, status:'planning', oauthSupported:false, riskLevel:'low', ctaSensitivity:'low', cadence:'월 1-2회' },
  { id:'google_business', name:'Google Business', nameKo:'구글 비즈니스', category:'search_presence', icon:'🌐', capabilities:CHANNEL_CAPABILITIES.google_business, status:'planning', oauthSupported:true, riskLevel:'low', ctaSensitivity:'low', cadence:'월 1-2회' },
];

export function getChannelsByCategory(category: ChannelCategory): UniversalChannel[] {
  return UNIVERSAL_CHANNELS.filter(c => c.category === category);
}

export function getChannel(id: string): UniversalChannel | undefined {
  return UNIVERSAL_CHANNELS.find(c => c.id === id);
}
