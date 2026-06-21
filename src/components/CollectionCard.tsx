import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      style={{ textDecoration: "none", display: "block" }}
      className="group"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "100%",
          overflow: "hidden",
          borderRadius: 8,
          backgroundColor: "#3d1f30",
        }}
      >
        {collection.cover_image ? (
          <Image
            src={collection.cover_image}
            alt={collection.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
            className="group-hover:scale-105"
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#3d1f30",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 64,
                fontWeight: 300,
                color: "#c9a97a",
                letterSpacing: "0.1em",
              }}
            >
              BC
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(30,15,26,0.85) 0%, transparent 50%)",
          }}
        />

        {/* "View Collection" hover text */}
        <div
          className="group-hover:opacity-100"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(30,15,26,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 500,
              color: "#f9f0f5",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            View Collection
          </span>
        </div>

        {/* Collection name */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 22,
              fontWeight: 300,
              color: "#f9f0f5",
              letterSpacing: "0.06em",
            }}
          >
            {collection.name}
          </div>
        </div>
      </div>
    </Link>
  );
}
