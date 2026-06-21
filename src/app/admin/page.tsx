"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("bintou_admin_token");
      if (token === "admin-authenticated") {
        router.replace("/admin/dashboard");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        localStorage.setItem("bintou_admin_token", "admin-authenticated");
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1e0f1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#3d1f30",
          border: "1px solid rgba(232,180,205,0.3)",
          borderRadius: 12,
          padding: "48px 36px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 26,
              fontWeight: 300,
              color: "#c9a97a",
              letterSpacing: "0.08em",
              marginBottom: 6,
            }}
          >
            B LUXE Collection
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "rgba(249,240,245,0.6)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Admin Panel
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                width: "100%",
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "#f9f0f5",
                backgroundColor: "rgba(249,240,245,0.08)",
                border: "1px solid rgba(232,180,205,0.3)",
                borderRadius: 8,
                padding: "12px 44px 12px 16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "rgba(249,240,245,0.5)",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "#e8b4cd",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              color: "#1e0f1a",
              backgroundColor: loading ? "#a88a5c" : "#c9a97a",
              border: "none",
              padding: "13px",
              borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
