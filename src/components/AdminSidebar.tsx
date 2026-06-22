"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Page = "dashboard" | "products" | "collections" | "settings";

const navItems: { page: Page; label: string; href: string; icon: string }[] = [
  { page: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: "▦" },
  { page: "products", label: "Products", href: "/admin/products", icon: "◈" },
  { page: "collections", label: "Collections", href: "/admin/collections", icon: "⊞" },
  { page: "settings", label: "Settings", href: "/admin/settings", icon: "⚙" },
];

export default function AdminSidebar({ activePage }: { activePage: Page }) {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("bintou_admin_token");
    }
    router.push("/admin");
  };

  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        backgroundColor: "#fff",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 18,
            fontWeight: 400,
            color: "#c9a97a",
            letterSpacing: "0.06em",
          }}
        >
          B LUXE Collection
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#9ca3af",
            marginTop: 2,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Admin Panel
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 0" }}>
        {navItems.map((item) => {
          const active = activePage === item.page;
          return (
            <Link
              key={item.page}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                color: active ? "#c9a97a" : "#4b5563",
                textDecoration: "none",
                backgroundColor: active ? "#fdf8f3" : "transparent",
                borderLeft: active ? "3px solid #c9a97a" : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #f3f4f6",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "#6b7280",
            textDecoration: "none",
          }}
        >
          ← Back to Site
        </Link>
        <button
          onClick={handleLogout}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "#ef4444",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            padding: 0,
          }}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}
