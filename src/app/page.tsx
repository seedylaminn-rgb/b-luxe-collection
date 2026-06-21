export const dynamic = "force-dynamic";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBackground from "@/components/HeroBackground";
import CollectionCard from "@/components/CollectionCard";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import type { Collection, Product } from "@/lib/types";
import Link from "next/link";

async function getCollections(): Promise<Collection[]> {
  const { data } = await supabase
    .from("collections")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(3);
  return data || [];
}

async function getLatestProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("*, collection:collections(id,name,slug,description,cover_image,is_active,display_order,created_at)")
    .order("created_at", { ascending: false })
    .limit(8);
  return (data as Product[]) || [];
}

export default async function HomePage() {
  const [collections, products] = await Promise.all([
    getCollections(),
    getLatestProducts(),
  ]);

  return (
    <div style={{ backgroundColor: "#1e0f1a", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeroBackground height="100vh" />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: 720,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 400,
              color: "#e8b4cd",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            New Collection 2025
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 300,
              color: "#f9f0f5",
              letterSpacing: "0.06em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            B LUXE Collection
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 18,
              fontWeight: 400,
              color: "#e8b4cd",
              marginBottom: 40,
              letterSpacing: "0.04em",
            }}
          >
            Wear Your Confidence
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/shop"
              className="btn-gold"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: "#1e0f1a",
                backgroundColor: "#c9a97a",
                padding: "14px 36px",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Shop Now
            </Link>
            <Link
              href="/collections"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: "#f9f0f5",
                backgroundColor: "transparent",
                border: "1px solid #f9f0f5",
                padding: "14px 36px",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              View Collections
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            animation: "bounce 2s infinite",
          }}
        >
          <span style={{ color: "rgba(249,240,245,0.4)", fontSize: 11, fontFamily: "var(--font-body)", letterSpacing: "0.1em" }}>scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 9l5 5 5-5" stroke="rgba(249,240,245,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── Featured Collections ── */}
      <section style={{ backgroundColor: "#f9f0f5", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 300,
                color: "#2a1a24",
                letterSpacing: "0.04em",
                marginBottom: 12,
              }}
            >
              Our Collections
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "rgba(42,26,36,0.6)",
              }}
            >
              Explore our curated drops
            </p>
          </div>

          {collections.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "rgba(42,26,36,0.5)",
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
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {collections.map((c) => (
                <CollectionCard key={c.id} collection={c} />
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link
              href="/collections"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: "#2a1a24",
                border: "1px solid #2a1a24",
                padding: "12px 32px",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest Arrivals ── */}
      <section style={{ backgroundColor: "#1e0f1a", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 300,
                color: "#f9f0f5",
                letterSpacing: "0.04em",
                marginBottom: 12,
              }}
            >
              Latest Arrivals
            </h2>
          </div>

          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "rgba(249,240,245,0.4)",
                fontFamily: "var(--font-body)",
                fontSize: 15,
              }}
            >
              Products coming soon.
            </div>
          ) : (
            <div
              className="grid-products"
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

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link
              href="/shop"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: "#c9a97a",
                border: "1px solid #c9a97a",
                padding: "12px 32px",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              Shop All
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand Statement ── */}
      <section
        style={{
          backgroundColor: "#3d1f30",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#e8b4cd",
              lineHeight: 1.4,
              marginBottom: 36,
            }}
          >
            &ldquo;Every piece tells a story. What&apos;s yours?&rdquo;
          </p>
          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              color: "#1e0f1a",
              backgroundColor: "#c9a97a",
              padding: "14px 36px",
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            Explore Shop
          </Link>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </div>
  );
}
