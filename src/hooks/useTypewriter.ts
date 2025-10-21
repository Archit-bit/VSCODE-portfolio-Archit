import { useState, useEffect } from "react";

/**
 * useTypewriter Hook
 * Simulates typing text character by character.
 *
 * @param text - Full string to animate
 * @param speed - Delay (ms) per character
 */
export function useTypewriter(text: string, speed = 10) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}
