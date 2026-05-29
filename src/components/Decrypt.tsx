import { useEffect, useRef, useState } from "react";

const SCRAMBLE = "!<>-_\\/[]{}—=+*^?#01ABCDEF$%";

export function Decrypt({
  text,
  className,
  speed = 35,
  trigger = true,
}: {
  text: string;
  className?: string;
  speed?: number;
  trigger?: boolean;
}) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const queue = text.split("").map((ch, i) => ({
      from: SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0],
      to: ch,
      start: (Math.random() * 20) | 0,
      end: ((Math.random() * 30) | 0) + 20 + i,
      char: "",
    }));
    let id = 0;
    const tick = () => {
      let done = 0;
      const s = queue
        .map((q) => {
          if (frame >= q.end) {
            done++;
            return q.to;
          }
          if (frame >= q.start) {
            if (!q.char || Math.random() < 0.28)
              q.char = SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
            return q.char;
          }
          return q.from;
        })
        .join("");
      setOut(s);
      frame++;
      if (done < queue.length) id = window.setTimeout(tick, 1000 / speed);
    };
    tick();
    return () => clearTimeout(id);
  }, [text, trigger, speed]);
  return <span className={className}>{out}</span>;
}
