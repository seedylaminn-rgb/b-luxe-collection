"use client";

import { useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Product } from "@/lib/types";

export default function SizeSelector({
  sizes,
  product,
}: {
  sizes: string[];
  product: Product;
}) {
  const [selected, setSelected] = useState<string>("");

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          color: "rgba(249,240,245,0.6)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        Select Size
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {sizes.map((s) => {
          const active = selected === s;
          return (
            <button
              key={s}
              onClick={() => setSelected(s)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                fontWeight: 500,
                color: active ? "#1e0f1a" : "#f9f0f5",
                backgroundColor: active ? "#c9a97a" : "transparent",
                border: `1px solid ${active ? "#c9a97a" : "#e8b4cd"}`,
                padding: "8px 16px",
                borderRadius: 4,
                cursor: "pointer",
                transition: "all 0.15s",
                minWidth: 48,
              }}
            >
              {s}
            </button>
          );
        })}
      </div>
      <WhatsAppButton
        productName={product.name}
        price={product.price}
        selectedSize={selected || undefined}
      />
    </div>
  );
}
