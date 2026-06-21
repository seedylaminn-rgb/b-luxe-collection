"use client";

import Link from "next/link";

export default function Footer() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2201234567";

  return (
    <footer style={{ backgroundColor: "#1e0f1a", borderTop: "1px solid rgba(232,180,205,0.15)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 300, color: "#c9a97a", letterSpacing: "0.1em", marginBottom: 8 }}>
              B LUXE Collection
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: 14, color: "#e8b4cd", fontStyle: "italic", marginBottom: 12 }}>
              Wear Your Confidence
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "rgba(249,240,245,0.6)", lineHeight: 1.7 }}>
              Curating women&apos;s fashion for every occasion. Based in The Gambia, shipping nationwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, color: "#e8b4cd", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
              Navigation
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/collections", label: "Collections" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="link-hover-gold"
                  style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(249,240,245,0.7)", textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 500, color: "#e8b4cd", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>
              Contact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#25D366", textDecoration: "none" }}
              >
                Order via WhatsApp
              </a>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(249,240,245,0.7)" }}>+{wa}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(249,240,245,0.7)" }}>📍 The Gambia</span>
              <Link
                href="/admin"
                style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(232,180,205,0.45)", textDecoration: "none", letterSpacing: "0.05em", marginTop: 8 }}
                className="link-admin-subtle"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(232,180,205,0.15)", paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(249,240,245,0.4)" }}>
            © 2025 B LUXE Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
