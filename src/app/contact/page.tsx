import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroBackground from "@/components/HeroBackground";

export default function ContactPage() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2201234567";

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
            We&apos;d love to hear from you
          </p>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 300,
              color: "#f9f0f5",
              letterSpacing: "0.08em",
            }}
          >
            Get in Touch
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: "#f9f0f5", padding: "80px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 60,
          }}
        >
          {/* WhatsApp */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 32,
                fontWeight: 300,
                color: "#2a1a24",
                marginBottom: 16,
                letterSpacing: "0.04em",
              }}
            >
              Order via WhatsApp
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "rgba(42,26,36,0.7)",
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              The fastest way to order. Send us a message and we&apos;ll get back to you right away.
            </p>

            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#25D366",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: 6,
                textDecoration: "none",
                letterSpacing: "0.04em",
                marginBottom: 24,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.28 7.04L.787 23.787l4.868-1.476A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
              </svg>
              Chat with us on WhatsApp
            </a>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "#2a1a24",
                  fontWeight: 500,
                }}
              >
                +{wa}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: "rgba(42,26,36,0.7)",
                }}
              >
                📍 The Gambia
              </span>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 32,
                fontWeight: 300,
                color: "#2a1a24",
                marginBottom: 24,
                letterSpacing: "0.04em",
              }}
            >
              Send a Message
            </h2>

            <form
              action={`mailto:info@bintoucollections.gm`}
              method="GET"
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#2a1a24",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Your name"
                  required
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "#2a1a24",
                    backgroundColor: "#f9f0f5",
                    border: "1px solid #e8b4cd",
                    borderRadius: 6,
                    padding: "12px 16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#2a1a24",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "#2a1a24",
                    backgroundColor: "#f9f0f5",
                    border: "1px solid #e8b4cd",
                    borderRadius: 6,
                    padding: "12px 16px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#2a1a24",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Message
                </label>
                <textarea
                  name="body"
                  placeholder="Tell us what you're looking for…"
                  rows={5}
                  required
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "#2a1a24",
                    backgroundColor: "#f9f0f5",
                    border: "1px solid #e8b4cd",
                    borderRadius: 6,
                    padding: "12px 16px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#1e0f1a",
                  backgroundColor: "#c9a97a",
                  border: "none",
                  padding: "14px 32px",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  alignSelf: "flex-start",
                }}
                className="btn-gold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
