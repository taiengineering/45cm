// Content Surface Runtime — Channel-adaptive brand surface engine

export type SurfaceType = 'social_feed'|'authority_feed'|'trust_blog'|'short_discovery'|'authority_video'|'community_trust'|'messaging_direct'|'search_presence'|'event_burst';
export type SurfaceStage = 'growing'|'stable'|'fatigued'|'recovering'|'overloaded'|'dormant';

export const CHANNEL_SURFACE_MAP: Record<string,SurfaceType> = {
  instagram:'social_feed', facebook:'social_feed', threads:'social_feed',
  linkedin:'authority_feed',
  naver_blog:'trust_blog', tistory:'trust_blog', brunch:'trust_blog',
  youtube_shorts:'short_discovery', instagram_reels:'short_discovery', tiktok:'short_discovery',
  youtube:'authority_video',
  naver_cafe:'community_trust',
  kakao_channel:'messaging_direct', email:'messaging_direct', sms:'messaging_direct', alimtalk:'messaging_direct',
  naver_place:'search_presence', google_business:'search_presence',
};

export const SURFACE_LABELS: Record<SurfaceType,{name:string,purpose:string}> = {
  social_feed:{name:'Social Feed',purpose:'brand presence + engagement'},
  authority_feed:{name:'Authority Feed',purpose:'professional authority + B2B trust'},
  trust_blog:{name:'Trust Blog',purpose:'deep trust + SEO + long-term value'},
  short_discovery:{name:'Short Discovery',purpose:'discovery + reach + hook'},
  authority_video:{name:'Authority Video',purpose:'deep authority + education'},
  community_trust:{name:'Community Trust',purpose:'community trust + conversation'},
  messaging_direct:{name:'Direct Messaging',purpose:'direct engagement + CRM'},
  search_presence:{name:'Search Presence',purpose:'search visibility + local presence'},
  event_burst:{name:'Event Burst',purpose:'urgent multi-channel push'},
};

export function getSurface(channel:string): SurfaceType { return CHANNEL_SURFACE_MAP[channel]??'social_feed'; }

// Content Density per surface
export type Density = 'very_low'|'low'|'medium'|'high'|'very_high';
export const SURFACE_DENSITY: Record<SurfaceType,{density:Density,maxWords:number,visualRequired:boolean}> = {
  social_feed:{density:'medium',maxWords:150,visualRequired:true},
  authority_feed:{density:'high',maxWords:300,visualRequired:false},
  trust_blog:{density:'very_high',maxWords:2000,visualRequired:false},
  short_discovery:{density:'very_low',maxWords:30,visualRequired:true},
  authority_video:{density:'high',maxWords:500,visualRequired:true},
  community_trust:{density:'medium',maxWords:500,visualRequired:false},
  messaging_direct:{density:'low',maxWords:100,visualRequired:false},
  search_presence:{density:'low',maxWords:200,visualRequired:false},
  event_burst:{density:'medium',maxWords:200,visualRequired:false},
};

// Adaptation Engine: transform content for target surface
export interface AdaptationResult { surface:SurfaceType; channel:string; tone:string; density:Density; maxWords:number; ctaAllowed:boolean; ctaStyle:string; visualRequired:boolean; explanation:string; }

export function adaptContent(channel:string, ctaIntensity:number): AdaptationResult {
  const surface = getSurface(channel);
  const d = SURFACE_DENSITY[surface];
  const toneMap:Record<SurfaceType,string> = { social_feed:'casual, visual-first', authority_feed:'professional, problem-solving', trust_blog:'상세, 신뢰 중심', short_discovery:'hook-first, fast', authority_video:'educational, deep', community_trust:'친근, 신뢰', messaging_direct:'간결, 직접적', search_presence:'정보성, 구조화', event_burst:'urgent, clear' };
  const ctaMap:Record<SurfaceType,{allowed:boolean,style:string}> = { social_feed:{allowed:ctaIntensity<=2,style:'soft only'}, authority_feed:{allowed:true,style:'consultative'}, trust_blog:{allowed:true,style:'advisory'}, short_discovery:{allowed:false,style:'none'}, authority_video:{allowed:true,style:'in-description'}, community_trust:{allowed:ctaIntensity<=1,style:'minimal'}, messaging_direct:{allowed:true,style:'direct'}, search_presence:{allowed:false,style:'none'}, event_burst:{allowed:true,style:'clear action'} };
  const cta = ctaMap[surface];
  const explanations:Record<SurfaceType,string> = { social_feed:`${channel}은 visual presence 중심으로 축약했습니다.`, authority_feed:`${channel}은 전문성 중심 B2B 톤으로 적응했습니다.`, trust_blog:`${channel}은 신뢰 확보를 위해 상세 설명을 유지했습니다.`, short_discovery:`${channel}은 hook-first 방식으로 discovery 최적화했습니다.`, authority_video:`${channel}은 교육적 권위 콘텐츠로 변환했습니다.`, community_trust:`${channel}은 커뮤니티 신뢰 중심으로 적응했습니다.`, messaging_direct:`${channel}은 간결한 다이렉트 메시지로 변환했습니다.`, search_presence:`${channel}은 검색 노출용 구조화 정보로 적응했습니다.`, event_burst:`긴급 이벤트 대응으로 multi-channel push했습니다.` };
  return { surface, channel, tone:toneMap[surface], density:d.density, maxWords:d.maxWords, ctaAllowed:cta.allowed, ctaStyle:cta.style, visualRequired:d.visualRequired, explanation:explanations[surface] };
}

// Trust Preservation: detect brand trust risks
export function checkTrustRisks(ctaPressure:number, isRepeatedContent:boolean, consecutiveHooks:number, postsToday:number, toneMismatch:boolean): {safe:boolean,risks:string[]} {
  const risks:string[]=[];
  if(ctaPressure>40) risks.push('과도한 CTA 비율');
  if(isRepeatedContent) risks.push('복붙 콘텐츠 감지');
  if(consecutiveHooks>3) risks.push('반복 hook 감지');
  if(postsToday>3) risks.push('과운영 감지');
  if(toneMismatch) risks.push('tone 불일치');
  return {safe:risks.length===0,risks};
}

// Content Freshness
export function calculateFreshness(daysSinceLastPost:number, repeatRate:number, cadenceDecay:number): {score:number,status:'fresh'|'aging'|'stale'} {
  const score = Math.max(0,Math.min(100, 100 - daysSinceLastPost*3 - repeatRate*20 - cadenceDecay*10));
  return {score:Math.round(score), status:score>70?'fresh':score>40?'aging':'stale'};
}

// Content Fatigue
export function checkContentFatigue(sameMessageCount:number, similarHookCount:number, eventOverload:boolean, ctaRepeat:number): {fatigued:boolean,score:number,reasons:string[]} {
  const reasons:string[]=[];
  let score = 0;
  if(sameMessageCount>2) { score+=30; reasons.push('같은 메시지 반복'); }
  if(similarHookCount>3) { score+=20; reasons.push('유사 hook 반복'); }
  if(eventOverload) { score+=25; reasons.push('과도한 이벤트'); }
  if(ctaRepeat>3) { score+=25; reasons.push('CTA 반복'); }
  return {fatigued:score>50, score:Math.min(100,score), reasons};
}

// Surface Health Score
export function calculateSurfaceHealth(freshness:number, fatigue:number, trust:number, cadence:number, consistency:number, engagementStability:number): number {
  return Math.round(Math.min(100, freshness*0.2 + (100-fatigue)*0.2 + trust*0.2 + cadence*0.15 + consistency*0.15 + engagementStability*0.1));
}

// Content Routing: where to send this content
export function routeContent(contentType:'trust'|'authority'|'lifestyle'|'event'|'cta', availableChannels:string[]): {channel:string,surface:SurfaceType,reason:string}[] {
  const priority:Record<string,SurfaceType[]> = { trust:['trust_blog','community_trust','authority_feed'], authority:['authority_feed','authority_video','trust_blog'], lifestyle:['social_feed','short_discovery'], event:['event_burst','social_feed','messaging_direct'], cta:['messaging_direct','authority_feed'] };
  const targets = priority[contentType]??['social_feed'];
  return availableChannels.filter(ch=>targets.includes(getSurface(ch))).map(ch=>({channel:ch,surface:getSurface(ch),reason:`${contentType} 콘텐츠는 ${SURFACE_LABELS[getSurface(ch)].purpose}에 적합`}));
}

// Surface Recommendations
export function generateSurfaceRecommendations(surfaces:{channel:string,surface:SurfaceType,health:number,fatigue:number,freshness:number}[]): {channel:string,text:string,severity:'info'|'warning'|'action'}[] {
  const recs:{channel:string,text:string,severity:'info'|'warning'|'action'}[]=[];
  for(const s of surfaces){
    if(s.fatigue>60) recs.push({channel:s.channel,text:`${s.channel} Surface 피로도가 높습니다(${s.fatigue}%). cooldown을 추천합니다.`,severity:'warning'});
    if(s.freshness<30) recs.push({channel:s.channel,text:`${s.channel} 콘텐츠가 노후화되고 있습니다. 신선한 콘텐츠를 추가하세요.`,severity:'action'});
    if(s.health>70) recs.push({channel:s.channel,text:`${s.channel} Surface가 건강합니다. 현재 운영을 유지하세요.`,severity:'info'});
  }
  return recs;
}

// Cross-Surface Consistency
export function checkCrossSurfaceConsistency(surfaces:{channel:string,tone:string}[]): {consistent:boolean,mismatches:string[]} {
  const tones = new Set(surfaces.map(s=>s.tone));
  // Allow different tones per surface (that's the point), but flag if same surface type has different tones
  const surfaceGrouped = new Map<SurfaceType,string[]>();
  for(const s of surfaces) { const st=getSurface(s.channel); surfaceGrouped.set(st,[...(surfaceGrouped.get(st)??[]),s.tone]); }
  const mismatches:string[]=[];
  for(const [st,ts] of surfaceGrouped) { if(new Set(ts).size>1) mismatches.push(`${st}: tone 불일치`); }
  return {consistent:mismatches.length===0,mismatches};
}
