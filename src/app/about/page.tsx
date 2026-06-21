import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBackground from "@/components/HeroBackground";
import Link from "next/link";

const values = [
  {
    icon: "✦",
    title: "Quality Fabrics",
    desc: "We source only the finest materials — every piece is chosen for its feel, durability, and beauty.",
  },
  {
    icon: "✧",
    title: "Unique Styles",
    desc: "Every piece is carefully selected to ensure you stand out, whether it's a special occasion or everyday life.",
  },
  {
    icon: "◇",
    title: "Made for You",
    desc: "Fashion for every woman, every occasion. We celebrate all sizes, all styles, all stories.",
  },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#1e0f1a", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeroBackground height="60vh" />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#e8b4cd",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Our story
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 300,
              color: "#f9f0f5",
              letterSpacing: "0.08em",
            }}
          >
            About Us
          </h1>
        </div>
      </section>

      {/* Story section */}
      <section style={{ backgroundColor: "#f9f0f5", padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 300,
                color: "#2a1a24",
                lineHeight: 1.3,
                marginBottom: 24,
              }}
            >
              The Story Behind B LUXE Collection
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "rgba(42,26,36,0.75)",
                lineHeight: 1.9,
              }}
            >
              B LUXE Collection was born from a love of fashion and a belief that every woman
              deserves to feel confident, beautiful, and seen. Based in The Gambia, we curate
              pieces that blend elegance with everyday wearability — from statement dresses to
              effortless everyday essentials.
            </p>
          </div>

          <div
            style={{
              width: "100%",
              paddingBottom: "80%",
              position: "relative",
              backgroundColor: "#3d1f30",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 96,
                  fontWeight: 300,
                  color: "#c9a97a",
                  letterSpacing: "0.1em",
                }}
              >
                BC
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section style={{ backgroundColor: "#1e0f1a", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 300,
              color: "#f9f0f5",
              textAlign: "center",
              marginBottom: 56,
              letterSpacing: "0.04em",
            }}
          >
            What We Stand For
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  backgroundColor: "#3d1f30",
                  borderRadius: 8,
                  padding: "36px 28px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    color: "#c9a97a",
                    marginBottom: 16,
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "#f9f0f5",
                    marginBottom: 12,
                    letterSpacing: "0.04em",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "rgba(249,240,245,0.65)",
                    lineHeight: 1.7,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          backgroundColor: "#f9f0f5",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(26px, 4vw, 38px)",
            fontWeight: 300,
            color: "#2a1a24",
            marginBottom: 28,
            letterSpacing: "0.04em",
          }}
        >
          Ready to find your style?
        </h2>
        <Link
          href="/shop"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            color: "#1e0f1a",
            backgroundColor: "#c9a97a",
            padding: "14px 40px",
            textDecoration: "none",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "inline-block",
          }}
        >
          Shop Now
        </Link>
      </section>

      <Footer />
    </div>
  );
}
