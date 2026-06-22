"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

const AUTH = "Bearer admin-authenticated";

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  color: "#111827",
  backgroundColor: "#fff",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  padding: "11px 14px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 13,
  fontWeight: 500,
  color: "#374151",
  display: "block",
  marginBottom: 6,
};

const helpStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 12,
  color: "#9ca3af",
  marginTop: 5,
};

const saveBtn = (loading: boolean): React.CSSProperties => ({
  fontFamily: "var(--font-body)",
  fontSize: 14,
  fontWeight: 500,
  color: "#1e0f1a",
  backgroundColor: loading ? "#a88a5c" : "#c9a97a",
  border: "none",
  padding: "11px 28px",
  borderRadius: 8,
  cursor: loading ? "not-allowed" : "pointer",
  letterSpacing: "0.04em",
  transition: "background 0.2s",
});

export default function SettingsPage() {
  const router = useRouter();

  // WhatsApp section
  const [waNumber, setWaNumber] = useState("");
  const [waSaving, setWaSaving] = useState(false);
  const [waMsg, setWaMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password section
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("bintou_admin_token");
    if (token !== "admin-authenticated") {
      router.replace("/admin");
      return;
    }
    loadSettings();
  }, [router]);

  const loadSettings = async () => {
    const res = await fetch("/api/admin/settings", {
      headers: { Authorization: AUTH },
    });
    if (res.ok) {
      const data = await res.json();
      setWaNumber(data.whatsapp_number || "");
    }
    setPageLoading(false);
  };

  const saveWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = waNumber.trim().replace(/\D/g, "");
    if (!trimmed) {
      setWaMsg({ type: "error", text: "Please enter a valid number." });
      return;
    }
    setWaSaving(true);
    setWaMsg(null);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { Authorization: AUTH, "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp_number: trimmed }),
    });
    if (res.ok) {
      setWaNumber(trimmed);
      setWaMsg({ type: "success", text: "WhatsApp number updated successfully." });
    } else {
      const d = await res.json();
      setWaMsg({ type: "error", text: d.error || "Save failed." });
    }
    setWaSaving(false);
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);

    if (newPw.length < 8) {
      setPwMsg({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    setPwSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { Authorization: AUTH, "Content-Type": "application/json" },
      body: JSON.stringify({ current_password: currentPw, admin_password: newPw }),
    });
    if (res.ok) {
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      setPwMsg({ type: "success", text: "Password updated successfully." });
    } else {
      const d = await res.json();
      setPwMsg({ type: "error", text: d.error || "Update failed." });
    }
    setPwSaving(false);
  };

  const sectionCard = (children: React.ReactNode) => (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "28px 28px",
        marginBottom: 24,
        maxWidth: 520,
      }}
    >
      {children}
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <AdminSidebar activePage="settings" />

      <main style={{ marginLeft: 240, flex: 1, padding: "40px 32px" }}>
        <h1
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 24,
            fontWeight: 500,
            color: "#111827",
            marginBottom: 8,
          }}
        >
          Settings
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#6b7280", marginBottom: 36 }}>
          Manage your store contact number and admin access.
        </p>

        {pageLoading ? (
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#9ca3af" }}>
            Loading…
          </div>
        ) : (
          <>
            {/* ── WhatsApp Section ── */}
            {sectionCard(
              <form onSubmit={saveWhatsApp}>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: 20,
                    paddingBottom: 12,
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  WhatsApp Order Number
                </h2>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>WhatsApp Order Number</label>
                  <p style={{ ...helpStyle, marginBottom: 8, marginTop: 0 }}>
                    Customers will message this number when ordering
                  </p>
                  <input
                    type="tel"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    placeholder="e.g. 2207654321"
                    required
                    style={inputStyle}
                  />
                  <p style={helpStyle}>
                    Include country code, e.g. 220XXXXXXX (no + or spaces)
                  </p>
                </div>

                {waMsg && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: waMsg.type === "success" ? "#16a34a" : "#dc2626",
                      marginBottom: 14,
                    }}
                  >
                    {waMsg.text}
                  </p>
                )}

                <button type="submit" disabled={waSaving} style={saveBtn(waSaving)}>
                  {waSaving ? "Saving…" : "Save Number"}
                </button>
              </form>
            )}

            {/* ── Password Section ── */}
            {sectionCard(
              <form onSubmit={savePassword}>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: 20,
                    paddingBottom: 12,
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  Change Password
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={labelStyle}>Current Password</label>
                    <input
                      type="password"
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      placeholder="Enter current password"
                      required
                      autoComplete="current-password"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>New Password</label>
                    <input
                      type="password"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                      autoComplete="new-password"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="Repeat new password"
                      required
                      autoComplete="new-password"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {pwMsg && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: pwMsg.type === "success" ? "#16a34a" : "#dc2626",
                      marginBottom: 14,
                    }}
                  >
                    {pwMsg.text}
                  </p>
                )}

                <button type="submit" disabled={pwSaving} style={saveBtn(pwSaving)}>
                  {pwSaving ? "Updating…" : "Update Password"}
                </button>
              </form>
            )}
          </>
        )}
      </main>
    </div>
  );
}
