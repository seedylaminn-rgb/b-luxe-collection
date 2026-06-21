import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div
      style={{
        backgroundColor: "#3d1f30",
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link href={`/shop/${product.id}`} style={{ textDecoration: "none" }}>
        {/* Image container — 3:4 aspect ratio */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "133.33%",
            overflow: "hidden",
            backgroundColor: "#3d1f30",
          }}
          className="group"
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
              className="group-hover:scale-105"
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#3d1f30",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 48,
                  fontWeight: 300,
                  color: "#c9a97a",
                  letterSpacing: "0.1em",
                }}
              >
                BC
              </span>
            </div>
          )}
          {/* Hover overlay */}
          <div
            className="group-hover:opacity-100"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(30,15,26,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: "#f9f0f5",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              View Details
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "16px 16px 8px" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              color: "#f9f0f5",
              marginBottom: 4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "#c9a97a",
              marginBottom: 8,
              fontWeight: 500,
            }}
          >
            GMD {product.price.toLocaleString()}
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
              {product.sizes.map((s) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "#f9f0f5",
                    border: "1px solid #e8b4cd",
                    borderRadius: 4,
                    padding: "1px 6px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Stock badge */}
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              color: product.is_in_stock ? "#4ade80" : "#f87171",
              backgroundColor: product.is_in_stock
                ? "rgba(74,222,128,0.1)"
                : "rgba(248,113,113,0.1)",
              padding: "2px 8px",
              borderRadius: 4,
              display: "inline-block",
            }}
          >
            {product.is_in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </Link>

      <div style={{ padding: "0 16px 16px" }}>
        <WhatsAppButton productName={product.name} price={product.price} />
      </div>
    </div>
  );
}
