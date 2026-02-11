import { NextResponse } from "next/server";
import { EXPORT_LIMITS } from "@/lib/exportLimits";
import { getUsage, incrementUsage, resetUsage } from "@/lib/usageStore";
import { UserRole } from "@/lib/limits";

export async function POST(req: Request) {
  const {
    email,
    role,
    type,
  }: { email: string; role: UserRole; type: "pdf" | "word" } =
    await req.json();

  if (!email || !role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = EXPORT_LIMITS[role];

  if (limit === 0) {
    return NextResponse.json(
      {
        message: "Exports are not available for guests. Please sign up.",
      },
      { status: 403 }
    );
  }

  if (limit === Infinity) {
    return NextResponse.json({ success: true });
  }

  const usage = getUsage(`${email}-export`);

  if (usage.count >= limit) {
    return NextResponse.json(
      {
        message:
          role === "free"
            ? "Daily export limit reached. Upgrade to Pro for unlimited exports."
            : "Export limit reached.",
      },
      { status: 429 }
    );
  }

  incrementUsage(`${email}-export`);

  return NextResponse.json({ success: true });
}
