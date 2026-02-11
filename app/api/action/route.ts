import { NextResponse } from "next/server";
import { LIMITS, UserRole } from "@/lib/limits";
import { getUsage, incrementUsage, resetUsage } from "@/lib/usageStore";

export async function POST(req: Request) {
  const { email, role }: { email: string; role: UserRole } = await req.json();

if (role === "guest") {
  return NextResponse.json(
    {
      message: "Guests have limited access. Please create an account.",
    },
    { status: 403 }
  );
}

  const limits = LIMITS[role];
  const usage = getUsage(email);

  const now = Date.now();
  const hoursPassed = (now - usage.lastReset) / (1000 * 60 * 60);

  if (hoursPassed >= limits.cooldownHours) {
    resetUsage(email);
  }

  if (usage.count >= limits.maxActions) {
    return NextResponse.json(
      {
        error: "Limit reached",
        message:
          role === "free"
            ? "You’ve reached your limit. Please wait 8 hours or upgrade to Pro."
            : "You’ve reached your limit.",
      },
      { status: 429 }
    );
  }

  incrementUsage(email);

  return NextResponse.json({
    success: true,
    remaining:
      limits.maxActions === Infinity
        ? "Unlimited"
        : limits.maxActions - usage.count,
  });
}
