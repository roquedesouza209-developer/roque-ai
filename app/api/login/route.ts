import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 }
    );
  }

  // Temporary auth (replace with database later)
  return NextResponse.json({
    success: true,
    user: {
      email,
      role: "free",
    },
  });
}
