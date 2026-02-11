export type UserRole = "guest" | "free" | "plus" | "premium" | "pro";

export const LIMITS = {
  free: {
    maxActions: 5,
    cooldownHours: 8,
  },
  plus: {
    maxActions: 20,
    cooldownHours: 4,
  },
  premium: {
    maxActions: 50,
    cooldownHours: 1,
  },
  pro: {
    maxActions: Infinity,
    cooldownHours: 0,
  },
};
