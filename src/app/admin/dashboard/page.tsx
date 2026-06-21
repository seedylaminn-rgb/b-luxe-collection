"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import type { Product } from "@/lib/types";

interface Stats {
  total: number;
  inStock: number;
  outOfStock: number;
  collections: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ total: 0, inStock: 0, outOfStock: 0, collections: 0 });
  const [recent, setRecent] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("bintou_admin_token");
    if (token !== "admin-authenticated") {
      router.replace("/admin");
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    const token = "Bearer admin-authenticated";
    const [prodRes, colRes] = await Promise.all([
      fetch("/api/admin/products", { headers: { Authorization: token } }),
      fetch("/api/admin/collections", { headers: { Authorization: token } }),
    ]);
    const products: Product[] = prodRes.ok ? await prodRes.json() : [];
    const colData = colRes.ok ? await colRes.json() : [];

    setStats({
      total: products.length,
      inStock: products.filter((p) => p.is_in_stock).length,
      outOfStock: products.filter((p) => !p.is_in_stock).length,
      collections: colData.length,
    });
    setRecent(products.slice(0, 5));
    setLoading(false);
  };

  const statCards = [
    { label: "Total Products", value: stats.total },
    { label: "In Stock", value: stats.inStock },
    { label: "Out of Stock", value: stats.outOfStock },
    { label: "Collections", value: stats.collections },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <AdminSidebar activePage="dashboard" />

      <main style={{ marginLeft: 240, flex: 1, padding: "40px 32px" }}>
        <h1
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 24,
            fontWeight: 500,
            color: "#111827",
            marginBottom: 32,
          }}
        >
          Dashboard
        </h1>

        {/* Stat cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
            marginBottom: 40,
          }}
        >
          {statCards.map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: "24px 20px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 32,
                  fontWeight: 500,
                  color: "#c9a97a",
                  marginBottom: 6,
                }}
              >
                {loading ? "—" : s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "#6b7280",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Recent products */}
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #f3f4f6",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 500,
              color: "#111827",
            }}
          >
            Recent Products
          </div>
          {loading ? (
            <div style={{ padding: "32px 20px", color: "#9ca3af", fontFamily: "var(--font-body)", fontSize: 14 }}>
              Loading…
            </div>
          ) : recent.length === 0 ? (
            <div style={{ padding: "32px 20px", color: "#9ca3af", fontFamily: "var(--font-body)", fontSize: 14 }}>
              No products yet.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {["Image", "Name", "Category", "Price", "Stock"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 20px",
                        textAlign: "left",
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#6b7280",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                    <td style={{ padding: "12px 20px" }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 6,
                          overflow: "hidden",
                          backgroundColor: "#3d1f30",
                          position: "relative",
                          flexShrink: 0,
                        }}
                      >
                        {p.image_url ? (
                          <Image
                            src={p.image_url}
                            alt={p.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 11,
                              color: "#c9a97a",
                              fontFamily: "var(--font-heading)",
                            }}
                          >
                            BC
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "12px 20px", fontFamily: "var(--font-body)", fontSize: 14, color: "#111827", fontWeight: 500 }}>
                      {p.name}
                    </td>
                    <td style={{ padding: "12px 20px", fontFamily: "var(--font-body)", fontSize: 13, color: "#6b7280" }}>
                      {p.category}
                    </td>
                    <td style={{ padding: "12px 20px", fontFamily: "var(--font-body)", fontSize: 13, color: "#111827" }}>
                      GMD {p.price.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
                          fontWeight: 500,
                          color: p.is_in_stock ? "#16a34a" : "#dc2626",
                          backgroundColor: p.is_in_stock ? "#f0fdf4" : "#fef2f2",
                          padding: "3px 8px",
                          borderRadius: 4,
                        }}
                      >
                        {p.is_in_stock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <Link
            href="/admin/products"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              color: "#1e0f1a",
              backgroundColor: "#c9a97a",
              padding: "11px 24px",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            + Add Product
          </Link>
          <Link
            href="/admin/collections"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              color: "#374151",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              padding: "11px 24px",
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}
          >
            + Add Collection
          </Link>
        </div>
      </main>
    </div>
  );
}
