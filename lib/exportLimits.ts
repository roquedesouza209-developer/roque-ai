import { UserRole } from "./limits";

export const EXPORT_LIMITS = {
  guest: 0,
  free: 1,
  plus: 5,
  premium: 20,
  pro: Infinity,
} as const satisfies Record<UserRole, number>;
