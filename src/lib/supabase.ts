import { createClient } from "@supabase/supabase-js";

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const rawAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const rawService = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseUrl = isValidUrl(rawUrl) ? rawUrl : "https://placeholder.supabase.co";
const supabaseAnonKey = rawAnon || "placeholder_anon_key";
const supabaseServiceKey = rawService || "placeholder_service_key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
