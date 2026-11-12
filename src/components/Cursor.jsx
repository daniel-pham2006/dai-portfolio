import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const follower = useRef(null);
  useEffect(() => {
    if (
      !window.matchMedia("(pointer:fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let x = -100,
      y = -100,
      fx = -100,
      fy = -100,
      frame;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current)
        dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      const target = e.target.closest("a,button,[data-cursor]");
      if (follower.current) {
        follower.current.dataset.label = target?.dataset.cursor || "";
        follower.current.classList.toggle("is-hover", Boolean(target));
      }
    };
    const tick = () => {
      fx += (x - fx) * 0.18;
      fy += (y - fy) * 0.18;
      if (follower.current)
        follower.current.style.transform = `translate3d(${fx}px,${fy}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <span ref={dot} className="cursor-dot" aria-hidden="true" />
      <span ref={follower} className="cursor-follower" aria-hidden="true">
        <span className="cursor-label" />
      </span>
    </>
  );
}
