"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import ImageUpload from "@/components/ImageUpload";
import type { Product, Collection } from "@/lib/types";

const CATEGORIES = ["Dresses", "Tops", "Bottoms", "Accessories", "Other"] as const;
const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

const emptyForm = {
  name: "",
  description: "",
  price: 0,
  category: "Dresses" as Product["category"],
  sizes: [] as string[],
  collection_id: null as string | null,
  is_in_stock: true,
  is_featured: false,
  image_url: null as string | null,
};

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [slideOpen, setSlideOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);

  const token = "Bearer admin-authenticated";

  const checkAuth = useCallback(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("bintou_admin_token") === "admin-authenticated";
  }, []);

  const loadData = useCallback(async () => {
    const [pRes, cRes] = await Promise.all([
      fetch("/api/admin/products", { headers: { Authorization: token } }),
      fetch("/api/admin/collections", { headers: { Authorization: token } }),
    ]);
    setProducts(pRes.ok ? await pRes.json() : []);
    setCollections(cRes.ok ? await cRes.json() : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!checkAuth()) { router.replace("/admin"); return; }
    loadData();
  }, [checkAuth, loadData, router]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setSlideOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description || "",
      price: p.price,
      category: p.category,
      sizes: p.sizes || [],
      collection_id: p.collection_id,
      is_in_stock: p.is_in_stock,
      is_featured: p.is_featured,
      image_url: p.image_url,
    });
    setSlideOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    const payload = { ...form, price: Number(form.price) };
    if (editing) {
      await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ id: editing.id, ...payload }),
      });
    } else {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(payload),
      });
    }
    setSaving(false);
    setSlideOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/products?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setDeleteConfirm(null);
    loadData();
  };

  const toggleSize = (s: string) => {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(s) ? f.sizes.filter((x) => x !== s) : [...f.sizes, s],
    }));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <AdminSidebar activePage="products" />

      <main style={{ marginLeft: 240, flex: 1, padding: "40px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-body)", fontSize: 24, fontWeight: 500, color: "#111827" }}>
            Products
          </h1>
          <button
            onClick={openAdd}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              color: "#1e0f1a",
              backgroundColor: "#c9a97a",
              border: "none",
              padding: "10px 22px",
              borderRadius: 8,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            + Add Product
          </button>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "auto" }}>
          {loading ? (
            <div style={{ padding: "40px 20px", color: "#9ca3af", fontFamily: "var(--font-body)", fontSize: 14 }}>Loading…</div>
          ) : products.length === 0 ? (
            <div style={{ padding: "40px 20px", color: "#9ca3af", fontFamily: "var(--font-body)", fontSize: 14 }}>No products yet. Add your first one!</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {["Image", "Name", "Category", "Price", "Sizes", "Collection", "Stock", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 6, overflow: "hidden", backgroundColor: "#3d1f30", position: "relative" }}>
                        {p.image_url ? (
                          <Image src={p.image_url} alt={p.name} fill style={{ objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#c9a97a", fontFamily: "var(--font-heading)" }}>BC</div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#111827", maxWidth: 160 }}>{p.name}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#6b7280" }}>{p.category}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#111827", whiteSpace: "nowrap" }}>GMD {p.price.toLocaleString()}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                        {(p.sizes || []).map((s) => (
                          <span key={s} style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "#6b7280", backgroundColor: "#f3f4f6", padding: "1px 5px", borderRadius: 3 }}>{s}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#6b7280" }}>
                      {(p.collection as unknown as { name: string } | null)?.name || "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 500, fontFamily: "var(--font-body)", color: p.is_in_stock ? "#16a34a" : "#dc2626", backgroundColor: p.is_in_stock ? "#f0fdf4" : "#fef2f2", padding: "3px 8px", borderRadius: 4 }}>
                        {p.is_in_stock ? "In Stock" : "Out"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => openEdit(p)} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Edit</button>
                        <button onClick={() => setDeleteConfirm(p)} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#dc2626", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Slide-over */}
      {slideOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div onClick={() => setSlideOpen(false)} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(480px, 100vw)",
              backgroundColor: "#fff",
              overflowY: "auto",
              padding: "32px 28px",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <h2 style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 500, color: "#111827" }}>
                {editing ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setSlideOpen(false)} style={{ background: "none", border: "none", fontSize: 22, color: "#6b7280", cursor: "pointer" }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Field label="Product Name *">
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. Elegant Floral Dress" />
              </Field>

              <Field label="Description">
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder="Describe the product…" />
              </Field>

              <Field label="Price (GMD) *">
                <input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} style={inputStyle} placeholder="0" min={0} />
              </Field>

              <Field label="Category">
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Product["category"] }))} style={inputStyle}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Sizes">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {ALL_SIZES.map((s) => {
                    const checked = form.sizes.includes(s);
                    return (
                      <label key={s} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 13, color: "#374151" }}>
                        <input type="checkbox" checked={checked} onChange={() => toggleSize(s)} style={{ accentColor: "#c9a97a" }} />
                        {s}
                      </label>
                    );
                  })}
                </div>
              </Field>

              <Field label="Collection">
                <select value={form.collection_id || ""} onChange={(e) => setForm((f) => ({ ...f, collection_id: e.target.value || null }))} style={inputStyle}>
                  <option value="">None</option>
                  {collections.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>

              <Field label="Stock Status">
                <Toggle value={form.is_in_stock} onChange={(v) => setForm((f) => ({ ...f, is_in_stock: v }))} label="In Stock" />
              </Field>

              <Field label="Featured on Home Page">
                <Toggle value={form.is_featured} onChange={(v) => setForm((f) => ({ ...f, is_featured: v }))} label="Featured" />
              </Field>

              <Field label="Product Image">
                <ImageUpload
                  currentImage={form.image_url || undefined}
                  onUpload={(url) => setForm((f) => ({ ...f, image_url: url }))}
                />
              </Field>

              <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1e0f1a", backgroundColor: saving ? "#a88a5c" : "#c9a97a", border: "none", padding: "12px", borderRadius: 8, cursor: saving ? "not-allowed" : "pointer", letterSpacing: "0.04em" }}
                >
                  {saving ? "Saving…" : "Save Product"}
                </button>
                <button
                  onClick={() => setSlideOpen(false)}
                  style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6b7280", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", padding: "12px 20px", borderRadius: 8, cursor: "pointer" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "32px", maxWidth: 400, width: "90%", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#111827", marginBottom: 8, fontWeight: 500 }}>Delete product?</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6b7280", marginBottom: 24 }}>Are you sure you want to delete &ldquo;{deleteConfirm.name}&rdquo;? This cannot be undone.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => handleDelete(deleteConfirm.id)} style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#fff", backgroundColor: "#dc2626", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer" }}>Delete</button>
              <button onClick={() => setDeleteConfirm(null)} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#374151", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", padding: "10px 24px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  color: "#111827",
  backgroundColor: "#fff",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  padding: "10px 14px",
  outline: "none",
  boxSizing: "border-box",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#374151", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div
        onClick={() => onChange(!value)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          backgroundColor: value ? "#16a34a" : "#d1d5db",
          position: "relative",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: value ? 23 : 3,
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: "#fff",
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#374151" }}>{label}</span>
    </label>
  );
}
