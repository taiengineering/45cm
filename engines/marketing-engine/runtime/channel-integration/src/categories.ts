// Channel Categories — Korea-first Universal (no commerce, no IT-specific)

export type ChannelCategory = 'social' | 'blog' | 'short_video' | 'video' | 'community' | 'messaging' | 'search_presence';

export const CHANNEL_CATEGORIES: { id: ChannelCategory; name: string; nameKo: string; icon: string }[] = [
  { id: 'social', name: 'SNS', nameKo: 'SNS', icon: '📱' },
  { id: 'blog', name: 'Blog', nameKo: '블로그', icon: '📝' },
  { id: 'short_video', name: 'Short Video', nameKo: '순동영상', icon: '🎬' },
  { id: 'video', name: 'Video', nameKo: '영상', icon: '🎥' },
  { id: 'community', name: 'Community', nameKo: '커뮤니티', icon: '💬' },
  { id: 'messaging', name: 'Messaging', nameKo: '메시징', icon: '✉️' },
  { id: 'search_presence', name: 'Search Presence', nameKo: '검색 노출', icon: '🔍' },
];
