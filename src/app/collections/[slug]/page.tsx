export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBackground from "@/components/HeroBackground";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import type { Collection, Product } from "@/lib/types";

async function getCollection(slug: string): Promise<Collection | null> {
  const { data } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  return data as Collection | null;
}

async function getProducts(collectionId: string): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("*, collection:collections(id,name,slug,description,cover_image,is_active,display_order,created_at)")
    .eq("collection_id", collectionId)
    .order("display_order", { ascending: true });
  return (data as Product[]) || [];
}

export default async function CollectionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const collection = await getCollection(params.slug);
  if (!collection) notFound();

  const products = await getProducts(collection.id);

  return (
    <div style={{ backgroundColor: "#1e0f1a", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeroBackground height="60vh" />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#e8b4cd",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Collection
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 300,
              color: "#f9f0f5",
              letterSpacing: "0.08em",
            }}
          >
            {collection.name}
          </h1>
        </div>
      </section>

      {/* Description + Products */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 80px" }}>
        {collection.description && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "rgba(249,240,245,0.65)",
              lineHeight: 1.8,
              maxWidth: 600,
              marginBottom: 48,
            }}
          >
            {collection.description}
          </p>
        )}

        {products.length === 0 ? (
          <div
            style={{
              border: "1px solid #e8b4cd",
              borderRadius: 8,
              padding: "48px 32px",
              textAlign: "center",
              color: "rgba(249,240,245,0.5)",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              maxWidth: 400,
              margin: "40px auto",
            }}
          >
            No products in this collection yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
