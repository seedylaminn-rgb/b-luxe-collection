import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body as { password: string };

    // Check DB first; fall back to env var if no settings row exists yet
    const { data: row } = await supabaseAdmin
      .from("settings")
      .select("admin_password")
      .eq("id", 1)
      .single();

    const adminPassword =
      row?.admin_password ||
      process.env.ADMIN_PASSWORD ||
      "BintouAdmin2025";

    if (password === adminPassword) {
      return NextResponse.json({ token: "admin-authenticated" }, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
