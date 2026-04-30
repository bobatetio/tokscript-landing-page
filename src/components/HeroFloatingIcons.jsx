"use client";
import React, { useEffect, useState } from "react";

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
const ICONS = [
  `${BP}/hero-creators/c1.png?v=4`,
  `${BP}/hero-creators/c2.png?v=4`,
  `${BP}/hero-creators/c3.png?v=4`,
  `${BP}/hero-creators/c4.png?v=4`,
  `${BP}/hero-creators/c5.png?v=4`,
];

const SLOTS = ["c1", "c2", "c3", "c4", "c5"];
const ROTATION_MS = 4000;

export default function HeroFloatingIcons() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {SLOTS.map((slot, slotIndex) => {
        const activeIcon = (tick + slotIndex) % ICONS.length;
        return (
          <div
            key={slot}
            className={`hero-creator hero-creator--${slot}`}
            aria-hidden
          >
            {ICONS.map((src, iconIndex) => (
              <img
                key={iconIndex}
                src={src}
                alt=""
                className={`hero-creator-img${
                  iconIndex === activeIcon ? " is-active" : ""
                }`}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}
