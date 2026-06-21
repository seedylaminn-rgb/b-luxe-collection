export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

async function getProduct(id: string): Promise<Product | null> {
  const { data } = await supabase
    .from("products")
    .select("*, collection:collections(id,name,slug,description,cover_image,is_active,display_order,created_at)")
    .eq("id", id)
    .single();
  return data as Product | null;
}

async function getRelated(category: string, excludeId: string): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("*, collection:collections(id,name,slug,description,cover_image,is_active,display_order,created_at)")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(4);
  return (data as Product[]) || [];
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const related = await getRelated(product.category, product.id);

  const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
  const availableSizes = ALL_SIZES.filter((s) => product.sizes?.includes(s));

  return (
    <div style={{ backgroundColor: "#1e0f1a", minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 60,
            alignItems: "start",
          }}
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "125%",
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "#3d1f30",
            }}
          >
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 96,
                    fontWeight: 300,
                    color: "#c9a97a",
                    letterSpacing: "0.1em",
                  }}
                >
                  BC
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Category badge */}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 10,
                fontWeight: 500,
                color: "#e8b4cd",
                backgroundColor: "rgba(232,180,205,0.15)",
                padding: "4px 12px",
                borderRadius: 3,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "inline-block",
                marginBottom: 16,
              }}
            >
              {product.category}
            </span>

            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 300,
                color: "#f9f0f5",
                letterSpacing: "0.04em",
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 24,
                color: "#c9a97a",
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              GMD {product.price.toLocaleString()}
            </div>

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 500,
                color: product.is_in_stock ? "#4ade80" : "#f87171",
                backgroundColor: product.is_in_stock
                  ? "rgba(74,222,128,0.1)"
                  : "rgba(248,113,113,0.1)",
                padding: "3px 10px",
                borderRadius: 4,
                display: "inline-block",
                marginBottom: 24,
              }}
            >
              {product.is_in_stock ? "In Stock" : "Out of Stock"}
            </span>

            {product.description && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "rgba(249,240,245,0.75)",
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                {product.description}
              </p>
            )}

            {/* Size selector */}
            {availableSizes.length > 0 && (
              <SizeSelector sizes={availableSizes} product={product} />
            )}

            {availableSizes.length === 0 && (
              <div style={{ marginBottom: 24 }}>
                <WhatsAppButton productName={product.name} price={product.price} />
              </div>
            )}

            <div style={{ marginTop: 32 }}>
              <Link
                href="/shop"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "rgba(249,240,245,0.5)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
              >
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 28,
                fontWeight: 300,
                color: "#f9f0f5",
                letterSpacing: "0.04em",
                marginBottom: 32,
              }}
            >
              You might also like
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 20,
              }}
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// Client component for size selection
import SizeSelector from "./SizeSelector";
