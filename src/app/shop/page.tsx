"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBackground from "@/components/HeroBackground";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

const CATEGORIES = ["All", "Dresses", "Tops", "Bottoms", "Accessories", "Other"] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("products")
        .select("*, collection:collections(id,name,slug,description,cover_image,is_active,display_order,created_at)")
        .order("created_at", { ascending: false });
      setAllProducts((data as Product[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = allProducts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (inStockOnly && !p.is_in_stock) return false;
    return true;
  });

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
            Browse our pieces
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
            Shop
          </h1>
        </div>
      </section>

      {/* Filters */}
      <div
        style={{
          position: "sticky",
          top: 72,
          zIndex: 30,
          backgroundColor: "#1e0f1a",
          borderBottom: "1px solid rgba(232,180,205,0.15)",
          padding: "16px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 500,
                    color: active ? "#1e0f1a" : "#f9f0f5",
                    backgroundColor: active ? "#c9a97a" : "transparent",
                    border: `1px solid ${active ? "#c9a97a" : "#e8b4cd"}`,
                    padding: "7px 18px",
                    borderRadius: 4,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#f9f0f5",
            }}
          >
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              style={{ accentColor: "#c9a97a", width: 15, height: 15 }}
            />
            In Stock Only
          </label>
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "rgba(249,240,245,0.4)",
              fontFamily: "var(--font-body)",
            }}
          >
            Loading…
          </div>
        ) : (
          <>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "rgba(249,240,245,0.5)",
                marginBottom: 24,
                letterSpacing: "0.04em",
              }}
            >
              Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div
                style={{
                  border: "1px solid #e8b4cd",
                  borderRadius: 8,
                  padding: "48px 32px",
                  textAlign: "center",
                  color: "rgba(249,240,245,0.6)",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  maxWidth: 400,
                  margin: "40px auto",
                }}
              >
                No products found. Try a different filter.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 20,
                }}
              >
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
