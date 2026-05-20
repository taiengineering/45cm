// Channel Capability Matrix — What each channel can do

export type ChannelCapabilityType =
  | 'post_text' | 'post_image' | 'post_video'
  | 'short_video' | 'long_video' | 'story'
  | 'comment' | 'message' | 'email'
  | 'review_monitor' | 'profile_update' | 'analytics';

export interface ChannelCapabilities {
  channel: string;
  capabilities: ChannelCapabilityType[];
}

export const CAPABILITY_LABELS: Record<ChannelCapabilityType, string> = {
  post_text: 'Text', post_image: 'Image', post_video: 'Video',
  short_video: 'Short', long_video: 'Long Video', story: 'Story',
  comment: 'Comment', message: 'Message', email: 'Email',
  review_monitor: 'Review', profile_update: 'Profile', analytics: 'Analytics',
};

export const CHANNEL_CAPABILITIES: Record<string, ChannelCapabilityType[]> = {
  instagram:       ['post_image','post_video','short_video','story','comment','analytics'],
  facebook:        ['post_text','post_image','post_video','story','comment','analytics'],
  linkedin:        ['post_text','post_image','comment','analytics'],
  threads:         ['post_text','post_image'],
  naver_blog:      ['post_text','post_image','post_video','comment','analytics'],
  tistory:         ['post_text','post_image','post_video','comment'],
  brunch:          ['post_text','post_image'],
  youtube_shorts:  ['short_video','analytics'],
  instagram_reels: ['short_video','analytics'],
  tiktok:          ['short_video','comment','analytics'],
  youtube:         ['long_video','post_text','comment','analytics'],
  naver_cafe:      ['post_text','post_image','comment'],
  kakao_channel:   ['message','analytics'],
  email:           ['email','analytics'],
  sms:             ['message'],
  alimtalk:        ['message','analytics'],
  naver_place:     ['profile_update','review_monitor','analytics'],
  google_business: ['profile_update','review_monitor','post_text','post_image','analytics'],
};

export function getCapabilities(channel: string): ChannelCapabilityType[] {
  return CHANNEL_CAPABILITIES[channel] ?? [];
}

export function hasCapability(channel: string, cap: ChannelCapabilityType): boolean {
  return (CHANNEL_CAPABILITIES[channel] ?? []).includes(cap);
}
