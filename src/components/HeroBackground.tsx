"use client";

import { useEffect, useRef } from "react";

type Props = {
  height?: "100vh" | "60vh";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HeroBackground({ height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;

    const lines: {
      x: number;
      y: number;
      angle: number;
      length: number;
      opacity: number;
      speed: number;
    }[] = [];

    const glows: { x: number; y: number; r: number; color: string; opacity: number }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      if (!canvas) return;
      lines.length = 0;
      glows.length = 0;

      for (let i = 0; i < 60; i++) {
        lines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
          length: 80 + Math.random() * 220,
          opacity: 0.03 + Math.random() * 0.07,
          speed: 0.2 + Math.random() * 0.6,
        });
      }

      const glowColors = ["#e8b4cd", "#c9a97a", "#e8b4cd", "#c9a97a", "#e8b4cd", "#c9a97a"];
      for (let i = 0; i < 6; i++) {
        glows.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 150 + Math.random() * 200,
          color: glowColors[i],
          opacity: 0.03 + Math.random() * 0.05,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Base
      ctx.fillStyle = "#1e0f1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glows
      glows.forEach((g) => {
        const gradient = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        gradient.addColorStop(0, g.color + Math.floor(g.opacity * 255).toString(16).padStart(2, "0"));
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Lines
      lines.forEach((line, i) => {
        const drift = Math.sin(phase * line.speed + i * 0.3) * 15;
        const x1 = line.x + drift;
        const y1 = line.y + drift * 0.5;
        const x2 = x1 + Math.cos(line.angle) * line.length;
        const y2 = y1 + Math.sin(line.angle) * line.length;

        ctx.strokeStyle = `rgba(232,180,205,${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      phase += 0.0003;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
