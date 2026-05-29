import { useEffect, useRef } from "react";

// Mouse-following matrix rain + radar sweep + decryption particles
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

    const chars = "01アイウエカキクケサシスセタチツテナニヌネ{}[]<>/$#%&*!?";
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
    type Spark = { x: number; y: number; vx: number; vy: number; life: number };
    const sparks: Spark[] = [];

    const onMove = (e: MouseEvent) => {
      mouse.current.vx = e.clientX - mouse.current.lastX;
      mouse.current.vy = e.clientY - mouse.current.lastY;
      mouse.current.lastX = mouse.current.x === -9999 ? e.clientX : mouse.current.x;
      mouse.current.lastY = mouse.current.y === -9999 ? e.clientY : mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const speed = Math.hypot(mouse.current.vx, mouse.current.vy);
      const count = Math.min(3, Math.floor(speed / 6));
      for (let i = 0; i < count; i++) {
        drops.push({
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          vy: 1 + Math.random() * 2,
          ch: chars[(Math.random() * chars.length) | 0],
          life: 0,
          max: 50 + Math.random() * 40,
          size: 11 + Math.random() * 4,
        });
      }
      if (speed > 4) {
        for (let i = 0; i < 2; i++) {
          sparks.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 30,
          });
        }
      }
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    const loop = () => {
      t += 1;
      ctx.fillStyle = "oklch(0.13 0.02 160 / 0.18)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Radar ring around cursor
      if (mouse.current.x > 0) {
        const r = 80 + Math.sin(t * 0.05) * 20;
        ctx.strokeStyle = "oklch(0.85 0.22 145 / 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "oklch(0.78 0.18 195 / 0.4)";
        ctx.beginPath();
        const a = (t * 0.04) % (Math.PI * 2);
        ctx.moveTo(mouse.current.x, mouse.current.y);
        ctx.lineTo(mouse.current.x + Math.cos(a) * r, mouse.current.y + Math.sin(a) * r);
        ctx.stroke();

        ctx.fillStyle = "oklch(0.85 0.22 145 / 0.9)";
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Drops
      ctx.font = "12px JetBrains Mono, monospace";
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.vy;
        d.life++;
        const alpha = 1 - d.life / d.max;
        ctx.fillStyle = `oklch(0.85 0.22 145 / ${alpha * 0.9})`;
        ctx.font = `${d.size}px JetBrains Mono, monospace`;
        ctx.fillText(d.ch, d.x, d.y);
        if (Math.random() < 0.1) d.ch = chars[(Math.random() * chars.length) | 0];
        if (d.life > d.max) drops.splice(i, 1);
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life--;
        ctx.fillStyle = `oklch(0.78 0.18 195 / ${s.life / 30})`;
        ctx.fillRect(s.x, s.y, 2, 2);
        if (s.life <= 0) sparks.splice(i, 1);
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
