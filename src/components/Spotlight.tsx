import { useEffect, useRef, type ReactNode } from "react";

// Card that reveals an encrypted overlay layer; cursor acts as a "flashlight"
export default function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg border border-border bg-surface/70 backdrop-blur-sm transition-colors hover:border-primary/60 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(280px circle at var(--mx) var(--my), oklch(0.85 0.22 145 / 0.12), transparent 60%)",
      }}
    >
      {children}
    </div>
  );
}
