import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Public endpoint — only exposes the WhatsApp number, never the password
export async function GET() {
  const { data } = await supabaseAdmin
    .from("settings")
    .select("whatsapp_number")
    .eq("id", 1)
    .single();

  const number =
    data?.whatsapp_number ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "2201234567";

  return NextResponse.json({ whatsapp_number: number });
}
