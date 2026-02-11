type UsageRecord = {
  count: number;
  lastReset: number;
};

const usageMap = new Map<string, UsageRecord>();

export function getUsage(email: string): UsageRecord {
  if (!usageMap.has(email)) {
    usageMap.set(email, {
      count: 0,
      lastReset: Date.now(),
    });
  }
  return usageMap.get(email)!;
}

export function incrementUsage(email: string) {
  const usage = getUsage(email);
  usage.count += 1;
}

export function resetUsage(email: string) {
  usageMap.set(email, {
    count: 0,
    lastReset: Date.now(),
  });
}
