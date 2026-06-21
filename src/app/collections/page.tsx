export const dynamic = "force-dynamic";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBackground from "@/components/HeroBackground";
import CollectionCard from "@/components/CollectionCard";
import { supabase } from "@/lib/supabase";
import type { Collection } from "@/lib/types";

async function getCollections(): Promise<Collection[]> {
  const { data } = await supabase
    .from("collections")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  return data || [];
}

export default async function CollectionsPage() {
  const collections = await getCollections();

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
            Curated for you
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 300,
              color: "#f9f0f5",
              letterSpacing: "0.08em",
            }}
          >
            Collections
          </h1>
        </div>
      </section>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 80px" }}>
        {collections.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "rgba(249,240,245,0.4)",
              fontFamily: "var(--font-body)",
              fontSize: 15,
            }}
          >
            Collections coming soon.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {collections.map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
