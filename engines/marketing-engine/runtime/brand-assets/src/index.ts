// Brand Asset & Content Pipeline Runtime
// Assets are remembered, reused, adapted, and evolved — not created from scratch every time

// Asset Types
export type AssetType = 'hook'|'visual'|'cta'|'content'|'template'|'caption'|'scene';
export type AssetStatus = 'new'|'active'|'stable'|'fatigued'|'archived'|'revivable';
export type HookType = '3sec_hook'|'opening_sentence'|'title_pattern'|'shorts_intro'|'reel_intro'|'authority_intro';

export interface BrandAsset { id:string; type:AssetType; title:string; body:string; channel?:string; score:number; reuseCount:number; status:AssetStatus; }

// Asset Scoring
export function scoreAsset(engagement:number, trust:number, reuseFreq:number, fatigueImpact:number, approvalRate:number): {score:number,grade:'A'|'B'|'C'|'D'} {
  const score = Math.round(engagement*0.25 + trust*0.25 + reuseFreq*0.15 + (100-fatigueImpact)*0.15 + approvalRate*0.2);
  return {score, grade:score>80?'A':score>60?'B':score>40?'C':'D'};
}

// Asset Lifecycle transitions
export function transitionAsset(current:AssetStatus, reuseCount:number, fatigueScore:number, daysSinceCreation:number): AssetStatus {
  if(current==='archived') return fatigueScore<20&&daysSinceCreation>60 ? 'revivable' : 'archived';
  if(fatigueScore>70) return 'fatigued';
  if(current==='new'&&reuseCount>0) return 'active';
  if(current==='active'&&reuseCount>5&&fatigueScore<30) return 'stable';
  if(current==='fatigued'&&fatigueScore<20) return 'revivable';
  return current;
}

// Asset Reuse Recommendation
export function recommendReuse(assets:BrandAsset[], targetSurface:string): BrandAsset[] {
  return assets.filter(a=>a.status==='active'||a.status==='stable'||a.status==='revivable').sort((a,b)=>b.score-a.score).slice(0,5);
}

// Content Pipeline: Raw → Extract → Hook → Adapt → CTA → Preview → Approve → Publish → Memory → Reuse
export type PipelineStage = 'raw'|'extracted'|'hooked'|'adapted'|'cta_applied'|'previewed'|'approved'|'published'|'memorized';
export const PIPELINE_STAGES: {id:PipelineStage,name:string,nameKo:string}[] = [
  {id:'raw',name:'Raw Intake',nameKo:'원본 입력'},
  {id:'extracted',name:'Asset Extraction',nameKo:'자산 추출'},
  {id:'hooked',name:'Hook Generation',nameKo:'Hook 생성'},
  {id:'adapted',name:'Surface Adaptation',nameKo:'채널 적응'},
  {id:'cta_applied',name:'CTA Adaptation',nameKo:'CTA 적용'},
  {id:'previewed',name:'Preview',nameKo:'미리보기'},
  {id:'approved',name:'Approved',nameKo:'승인'},
  {id:'published',name:'Published',nameKo:'발행'},
  {id:'memorized',name:'Memorized',nameKo:'기억'},
];

// Asset Extraction: extract reusable elements from raw content
export function extractAssets(rawContent:string): {hooks:string[],painPoints:string[],values:string[],ctas:string[],trustPoints:string[]} {
  // In production: AI-based extraction. Here: structured placeholder
  return { hooks:[""], painPoints:[""], values:[""], ctas:[""], trustPoints:[""] };
}

// Content DNA: brand content characteristics
export interface ContentDNA { tone:number; energy:number; ctaDensity:number; authorityLevel:number; trustLevel:number; humor:number; eventIntensity:number; }
export function analyzeContentDNA(assets:BrandAsset[]): ContentDNA {
  const ctaCount = assets.filter(a=>a.type==='cta').length;
  const total = assets.length||1;
  return { tone:65, energy:50, ctaDensity:Math.round(ctaCount/total*100), authorityLevel:60, trustLevel:70, humor:20, eventIntensity:30 };
}

// Shorts Pipeline: hook → scene → pacing → caption → CTA softening → preview
export interface ShortsPlan { hook:string; scenes:{label:string,seconds:number}[]; totalSeconds:number; captionStyle:string; ctaSoftened:boolean; }
export function createShortsPlan(hook:string, topic:string): ShortsPlan {
  return {
    hook, totalSeconds:30, captionStyle:'short, readable',ctaSoftened:true,
    scenes:[{label:'Hook',seconds:3},{label:'Problem',seconds:8},{label:'Value',seconds:12},{label:'CTA (soft)',seconds:7}],
  };
}

// Multi-Asset Adaptation: one source → multiple surfaces
export function planMultiAssetAdaptation(sourceContent:string, targetChannels:string[]): {channel:string,format:string,density:string}[] {
  const densityMap:Record<string,string> = {naver_blog:'very_high',linkedin:'high',instagram:'medium',youtube_shorts:'very_low',kakao_channel:'low'};
  const formatMap:Record<string,string> = {naver_blog:'long-form trust article',linkedin:'authority post',instagram:'visual carousel',youtube_shorts:'30sec shorts',kakao_channel:'direct message'};
  return targetChannels.map(ch=>({channel:ch, format:formatMap[ch]??'standard post', density:densityMap[ch]??'medium'}));
}

// Asset Recommendation
export function generateAssetRecommendations(assets:BrandAsset[], contentDNA:ContentDNA): {text:string,assetId?:string}[] {
  const recs:{text:string,assetId?:string}[]=[];
  const fatigued = assets.filter(a=>a.status==='fatigued');
  const revivable = assets.filter(a=>a.status==='revivable');
  const topHooks = assets.filter(a=>a.type==='hook'&&a.score>70).sort((a,b)=>b.score-a.score);
  if(contentDNA.authorityLevel<40) recs.push({text:'최근 authority 콘텐츠가 부족합니다.'});
  if(topHooks.length>0) recs.push({text:`이 Hook 자산의 재활용을 추천합니다: "${topHooks[0].title}"`,assetId:topHooks[0].id});
  if(revivable.length>0) recs.push({text:`${revivable.length}개 자산이 재활용 가능합니다.`});
  if(fatigued.length>0) recs.push({text:`${fatigued.length}개 자산이 피로 상태입니다. 새로운 자산을 준비하세요.`});
  return recs;
}
