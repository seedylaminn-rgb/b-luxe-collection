"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminSidebar from "@/components/AdminSidebar";
import ImageUpload from "@/components/ImageUpload";
import type { Collection } from "@/lib/types";

type CollectionWithCount = Collection & { product_count: number };

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  cover_image: null as string | null,
  is_active: true,
  display_order: 0,
};

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function AdminCollections() {
  const router = useRouter();
  const [collections, setCollections] = useState<CollectionWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [slideOpen, setSlideOpen] = useState(false);
  const [editing, setEditing] = useState<CollectionWithCount | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [slugEditable, setSlugEditable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<CollectionWithCount | null>(null);

  const token = "Bearer admin-authenticated";

  const checkAuth = useCallback(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("bintou_admin_token") === "admin-authenticated";
  }, []);

  const loadData = useCallback(async () => {
    const res = await fetch("/api/admin/collections", { headers: { Authorization: token } });
    setCollections(res.ok ? await res.json() : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!checkAuth()) { router.replace("/admin"); return; }
    loadData();
  }, [checkAuth, loadData, router]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setSlugEditable(false);
    setSlideOpen(true);
  };

  const openEdit = (c: CollectionWithCount) => {
    setEditing(c);
    setForm({
      name: c.name,
      slug: c.slug,
      description: c.description || "",
      cover_image: c.cover_image,
      is_active: c.is_active,
      display_order: c.display_order,
    });
    setSlugEditable(false);
    setSlideOpen(true);
  };

  const handleNameChange = (name: string) => {
    setForm((f) => ({
      ...f,
      name,
      slug: slugEditable ? f.slug : toSlug(name),
    }));
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) return;
    setSaving(true);
    const payload = { ...form };
    if (editing) {
      await fetch("/api/admin/collections", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ id: editing.id, ...payload }),
      });
    } else {
      await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(payload),
      });
    }
    setSaving(false);
    setSlideOpen(false);
    loadData();
  };

  const handleDelete = async (c: CollectionWithCount) => {
    if (c.product_count > 0) {
      setDeleteError("Remove all products from this collection first.");
      return;
    }
    const res = await fetch(`/api/admin/collections?id=${c.id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    if (!res.ok) {
      const data = await res.json();
      setDeleteError(data.error || "Cannot delete.");
      return;
    }
    setDeleteConfirm(null);
    setDeleteError("");
    loadData();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <AdminSidebar activePage="collections" />

      <main style={{ marginLeft: 240, flex: 1, padding: "40px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-body)", fontSize: 24, fontWeight: 500, color: "#111827" }}>Collections</h1>
          <button
            onClick={openAdd}
            style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1e0f1a", backgroundColor: "#c9a97a", border: "none", padding: "10px 22px", borderRadius: 8, cursor: "pointer" }}
          >
            + Add Collection
          </button>
        </div>

        <div style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "auto" }}>
          {loading ? (
            <div style={{ padding: "40px 20px", color: "#9ca3af", fontFamily: "var(--font-body)", fontSize: 14 }}>Loading…</div>
          ) : collections.length === 0 ? (
            <div style={{ padding: "40px 20px", color: "#9ca3af", fontFamily: "var(--font-body)", fontSize: 14 }}>No collections yet.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                  {["Cover", "Name", "Slug", "Active", "Products", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {collections.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #f9fafb" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 6, overflow: "hidden", backgroundColor: "#3d1f30", position: "relative" }}>
                        {c.cover_image ? (
                          <Image src={c.cover_image} alt={c.name} fill style={{ objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#c9a97a", fontFamily: "var(--font-heading)" }}>BC</div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#111827" }}>{c.name}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 13, color: "#6b7280" }}>{c.slug}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 500, fontFamily: "var(--font-body)", color: c.is_active ? "#16a34a" : "#6b7280", backgroundColor: c.is_active ? "#f0fdf4" : "#f3f4f6", padding: "3px 8px", borderRadius: 4 }}>
                        {c.is_active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 14, color: "#374151" }}>{c.product_count}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => openEdit(c)} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Edit</button>
                        <button onClick={() => { setDeleteConfirm(c); setDeleteError(""); }} style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#dc2626", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Delete</button>
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
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "min(480px, 100vw)", backgroundColor: "#fff", overflowY: "auto", padding: "32px 28px", boxShadow: "-4px 0 24px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <h2 style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 500, color: "#111827" }}>{editing ? "Edit Collection" : "Add Collection"}</h2>
              <button onClick={() => setSlideOpen(false)} style={{ background: "none", border: "none", fontSize: 22, color: "#6b7280", cursor: "pointer" }}>×</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Field label="Collection Name *">
                <input value={form.name} onChange={(e) => handleNameChange(e.target.value)} style={inputStyle} placeholder="e.g. Summer Luxe" />
              </Field>

              <Field label="Slug">
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    value={form.slug}
                    readOnly={!slugEditable}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                    style={{ ...inputStyle, color: slugEditable ? "#111827" : "#6b7280", backgroundColor: slugEditable ? "#fff" : "#f9fafb" }}
                    placeholder="auto-generated"
                  />
                  <button type="button" onClick={() => setSlugEditable((v) => !v)} style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#6b7280", background: "none", border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 12px", cursor: "pointer", whiteSpace: "nowrap" }}>
                    {slugEditable ? "Lock" : "Edit"}
                  </button>
                </div>
              </Field>

              <Field label="Description">
                <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Optional description…" />
              </Field>

              <Field label="Cover Image">
                <ImageUpload currentImage={form.cover_image || undefined} onUpload={(url) => setForm((f) => ({ ...f, cover_image: url }))} />
              </Field>

              <Field label="Visibility">
                <Toggle value={form.is_active} onChange={(v) => setForm((f) => ({ ...f, is_active: v }))} label="Active (visible on site)" />
              </Field>

              <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
                <button onClick={handleSave} disabled={saving} style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1e0f1a", backgroundColor: saving ? "#a88a5c" : "#c9a97a", border: "none", padding: "12px", borderRadius: 8, cursor: saving ? "not-allowed" : "pointer" }}>
                  {saving ? "Saving…" : "Save Collection"}
                </button>
                <button onClick={() => setSlideOpen(false)} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6b7280", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", padding: "12px 20px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: "32px", maxWidth: 400, width: "90%", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#111827", marginBottom: 8, fontWeight: 500 }}>Delete collection?</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6b7280", marginBottom: 16 }}>
              &ldquo;{deleteConfirm.name}&rdquo; — {deleteConfirm.product_count} product{deleteConfirm.product_count !== 1 ? "s" : ""}
            </p>
            {deleteError && <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#dc2626", marginBottom: 16 }}>{deleteError}</p>}
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#fff", backgroundColor: "#dc2626", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer" }}>Delete</button>
              <button onClick={() => { setDeleteConfirm(null); setDeleteError(""); }} style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#374151", backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", padding: "10px 24px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
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
      <div onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: value ? "#16a34a" : "#d1d5db", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: 9, backgroundColor: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#374151" }}>{label}</span>
    </label>
  );
}
