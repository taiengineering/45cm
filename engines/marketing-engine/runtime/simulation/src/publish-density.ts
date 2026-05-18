export function simulatePublishDensity(postsThisWeek: number, channelCount: number): { burst: boolean; overloaded: string[]; cadenceScore: number } {
  const perChannel = postsThisWeek / Math.max(1, channelCount);
  const burst = perChannel > 4;
  const overloaded = perChannel > 3 ? ['linkedin'] : [];
  if (perChannel > 5) overloaded.push('facebook');
  const cadenceScore = Math.max(10, Math.min(100, Math.round(100 - (perChannel - 2) * 15)));
  return { burst, overloaded, cadenceScore };
}
