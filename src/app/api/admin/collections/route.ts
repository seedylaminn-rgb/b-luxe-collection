import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function checkAuth(req: NextRequest) {
  return req.headers.get("Authorization") === "Bearer admin-authenticated";
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data: collections, error } = await supabaseAdmin
    .from("collections")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Add product count per collection
  const withCounts = await Promise.all(
    (collections || []).map(async (col) => {
      const { count } = await supabaseAdmin
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("collection_id", col.id);
      return { ...col, product_count: count ?? 0 };
    })
  );

  return NextResponse.json(withCounts);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from("collections")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { id, ...rest } = body as { id: string; [key: string]: unknown };
  const { data, error } = await supabaseAdmin
    .from("collections")
    .update(rest)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // Check product count
  const { count } = await supabaseAdmin
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("collection_id", id);

  if (count && count > 0) {
    return NextResponse.json(
      { error: "Remove all products from this collection first" },
      { status: 409 }
    );
  }

  const { error } = await supabaseAdmin
    .from("collections")
    .delete()
    .eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
