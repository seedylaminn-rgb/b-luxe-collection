"use client";

type Props = {
  productName: string;
  price: number;
  selectedSize?: string;
};

export default function WhatsAppButton({ productName, price, selectedSize }: Props) {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2201234567";
  const text = encodeURIComponent(
    `Hi! I'd like to order ${productName}${selectedSize ? ` in size ${selectedSize}` : ""}. Price: GMD ${price.toLocaleString()}`
  );
  const href = `https://wa.me/${waNumber}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#25D366",
        color: "#fff",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        fontWeight: 500,
        padding: "9px 16px",
        borderRadius: 6,
        textDecoration: "none",
        width: "100%",
        justifyContent: "center",
        letterSpacing: "0.02em",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1da851")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.28 7.04L.787 23.787l4.868-1.476A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
      Order on WhatsApp
    </a>
  );
}
