import type { ReactNode } from "react";

export default function Marquee({
  items,
  className = "",
}: {
  items: ReactNode[];
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        {doubled.map((item, index) => (
          <div key={index} className="flex shrink-0 items-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
