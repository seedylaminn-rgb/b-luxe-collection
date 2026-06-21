import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body as { password: string };
    const adminPassword = process.env.ADMIN_PASSWORD || "BintouAdmin2025";

    if (password === adminPassword) {
      return NextResponse.json({ token: "admin-authenticated" }, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
