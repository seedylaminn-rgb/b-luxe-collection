"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cloudinaryUpload } from "@/lib/cloudinary";

type Props = {
  onUpload: (url: string) => void;
  currentImage?: string;
};

export default function ImageUpload({ onUpload, currentImage }: Props) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = await cloudinaryUpload(file);
      setPreview(url);
      onUpload(url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      {preview ? (
        <div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 200,
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 8,
            }}
          >
            <Image
              src={preview}
              alt="Preview"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "#6b7280",
              background: "none",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            Change photo
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "#c9a97a" : "#e8b4cd"}`,
            borderRadius: 8,
            padding: "40px 24px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: dragging ? "rgba(201,169,122,0.05)" : "transparent",
            transition: "border-color 0.2s, background 0.2s",
          }}
        >
          {loading ? (
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              Uploading…
            </div>
          ) : (
            <>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📷</div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "#6b7280",
                }}
              >
                Drag photo here or click to upload
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "#ef4444",
            marginTop: 6,
          }}
        >
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
