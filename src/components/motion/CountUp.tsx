"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, useInView } from "framer-motion";

interface CountUpProps {
  value: number;
  delay?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function CountUp({
  value,
  delay = 0,
  duration = 1.1,
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const digitWidth = Math.max(2, String(value).length);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, value, delay, duration]);

  const style: CSSProperties = {
    display: "inline-block",
    minWidth: `${digitWidth}ch`,
    fontVariantNumeric: "tabular-nums",
  };

  return (
    <span ref={ref} className={className} style={style}>
      {display}
      {suffix}
    </span>
  );
}
