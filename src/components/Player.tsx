import { useEffect, useRef, useState } from "react";

export default function Player() {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Track player position
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({}); // Track keys being held
  const [lastDirection, setLastDirection] = useState<"left" | "right" | null>(null); // Track last horizontal direction

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: true }));

      if (event.key === "ArrowLeft") setLastDirection("left");
      if (event.key === "ArrowRight") setLastDirection("right");
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const movementSpeed = 10; // Speed of movement (in pixels)
    const jumpDistance = 20; // Horizontal jump distance

    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPosition = { ...prev };

        // Handle horizontal movement
        if (keysPressed["ArrowLeft"]) {
          newPosition.x = Math.max(0, prev.x - movementSpeed); // Move left
        }
        if (keysPressed["ArrowRight"]) {
          newPosition.x = prev.x + movementSpeed; // Move right
        }

        // Handle jump logic
        if (keysPressed[" "]) {
          if (prev.y === 0) {
            // Prevent multiple jumps
            newPosition.y = -50; // Jump up
            newPosition.x += lastDirection === "left" ? -jumpDistance : jumpDistance; // Jump in last direction
            setTimeout(() => {
              setPosition((fallPrev) => ({
                ...fallPrev,
                y: 0, // Fall back down
              }));
            }, 200); // Duration at the jump peak
          }
        }

        return newPosition;
      });
    }, 50); // Interval for smooth updates

    return () => clearInterval(interval);
  }, [keysPressed, lastDirection]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  return (
    <div
      className="bg-red-500 h-10 w-10 absolute"
      ref={playerRef}
    />
  );
}
