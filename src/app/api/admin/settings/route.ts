import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function checkAuth(req: NextRequest) {
  return req.headers.get("Authorization") === "Bearer admin-authenticated";
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("settings")
    .select("whatsapp_number, updated_at")
    .eq("id", 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    whatsapp_number?: string;
    admin_password?: string;
    current_password?: string;
  };

  // If changing password, verify current password first
  if (body.admin_password !== undefined) {
    if (!body.current_password) {
      return NextResponse.json(
        { error: "Current password required" },
        { status: 400 }
      );
    }

    const { data: row } = await supabaseAdmin
      .from("settings")
      .select("admin_password")
      .eq("id", 1)
      .single();

    const currentPw =
      row?.admin_password ||
      process.env.ADMIN_PASSWORD ||
      "BintouAdmin2025";

    if (body.current_password !== currentPw) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 403 }
      );
    }

    if (body.admin_password.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters" },
        { status: 400 }
      );
    }
  }

  const updateData: Record<string, string> = {
    updated_at: new Date().toISOString(),
  };
  if (body.whatsapp_number !== undefined)
    updateData.whatsapp_number = body.whatsapp_number;
  if (body.admin_password !== undefined)
    updateData.admin_password = body.admin_password;

  const { data, error } = await supabaseAdmin
    .from("settings")
    .update(updateData)
    .eq("id", 1)
    .select("whatsapp_number, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
