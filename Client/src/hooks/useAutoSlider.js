import { useEffect, useState } from "react";

export const useAutoSlider = (
  items,
  delay = 5000,
  transitionDuration = 700,
) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    if (!items?.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, delay);

    return () => clearInterval(interval);
  }, [items, delay]);

  useEffect(() => {
    if (!items?.length) return;

    if (activeIndex >= items.length) {
      const timeout = setTimeout(() => {
        setTransition(false);
        setActiveIndex(0);
      }, transitionDuration);

      return () => clearTimeout(timeout);
    } else {
      setTransition(true);
    }
  }, [activeIndex, items, transitionDuration]);

  return { activeIndex, transition };
};
