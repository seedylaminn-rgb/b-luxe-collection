"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s, border-color 0.3s",
          backgroundColor: scrolled ? "#1e0f1a" : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(232,180,205,0.2)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 22,
              fontWeight: 300,
              color: "#c9a97a",
              letterSpacing: "0.12em",
              textDecoration: "none",
            }}
          >
            B LUXE Collection
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    fontWeight: 400,
                    color: active ? "#c9a97a" : "#f9f0f5",
                    textDecoration: active ? "underline" : "none",
                    textDecorationColor: "#c9a97a",
                    textUnderlineOffset: 4,
                    letterSpacing: "0.04em",
                    transition: "color 0.2s",
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <button
            className="flex md:hidden flex-col gap-1.5 p-2 border-none bg-transparent cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  backgroundColor: "#f9f0f5",
                  borderRadius: 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "#1e0f1a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              color: "#f9f0f5",
              background: "none",
              border: "none",
              fontSize: 32,
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Close menu"
          >
            ×
          </button>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 36,
                fontWeight: 300,
                color: pathname === l.href ? "#c9a97a" : "#f9f0f5",
                textDecoration: "none",
                letterSpacing: "0.08em",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
