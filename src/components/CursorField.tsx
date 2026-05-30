import { useEffect, useRef } from "react";

// Subtle mouse-following particles — lighter version
export default function CursorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01{}[]<>/$#%&*!?";
    type Drop = {
      x: number;
      y: number;
      vy: number;
      ch: string;
      life: number;
      max: number;
      size: number;
    };
    const drops: Drop[] = [];

    const onMove = (e: MouseEvent) => {
      mouse.current.vx = e.clientX - mouse.current.lastX;
      mouse.current.vy = e.clientY - mouse.current.lastY;
      mouse.current.lastX = mouse.current.x === -9999 ? e.clientX : mouse.current.x;
      mouse.current.lastY = mouse.current.y === -9999 ? e.clientY : mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const speed = Math.hypot(mouse.current.vx, mouse.current.vy);
      // Only spawn 1 drop per move, and only when moving fast enough
      if (speed > 8 && Math.random() < 0.4) {
        drops.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vy: 0.8 + Math.random() * 1.2,
          ch: chars[(Math.random() * chars.length) | 0],
          life: 0,
          max: 35 + Math.random() * 25,
          size: 10 + Math.random() * 3,
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    const loop = () => {
      t += 1;
      ctx.fillStyle = "oklch(0.11 0.03 300 / 0.22)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Subtle ring around cursor — smaller and more transparent
      if (mouse.current.x > 0) {
        const r = 50 + Math.sin(t * 0.04) * 10;
        ctx.strokeStyle = "oklch(0.75 0.22 300 / 0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // Tiny center dot
        ctx.fillStyle = "oklch(0.75 0.22 300 / 0.5)";
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Drops — more transparent
      ctx.font = "12px JetBrains Mono, monospace";
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.vy;
        d.life++;
        const alpha = (1 - d.life / d.max) * 0.45;
        ctx.fillStyle = `oklch(0.75 0.22 300 / ${alpha})`;
        ctx.font = `${d.size}px JetBrains Mono, monospace`;
        ctx.fillText(d.ch, d.x, d.y);
        if (d.life > d.max) drops.splice(i, 1);
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />;
}
