import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";

interface Props {
  playerBodyRef: React.RefObject<Matter.Body>;
  shape: string;
}

export const PlayerControls = ({ playerBodyRef, shape }: Props) => {
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});
  const [jumpCount, setJumpCount] = useState(0);
  const [jumpKeyPressed, setJumpKeyPressed] = useState(false);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
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
    const { Body } = Matter;
    const playerBody = playerBodyRef.current;

    if (!playerBody) return;

    if (shape == "triangle") {
      Body.setAngularVelocity(playerBody, 0.2);
    }
    if (shape == "circle") {
      Body.setAngularVelocity(playerBody, 0.5);
    }

    const gameLoop = () => {
      // Continuous left and right movement

      if (keysPressed["ArrowLeft"]) {
        Body.setVelocity(playerBody, { x: -1, y: playerBody.velocity.y });
      }
      if (keysPressed["ArrowRight"]) {
        Body.setVelocity(playerBody, { x: 1, y: playerBody.velocity.y });
      }

      // Jump logic
      if (keysPressed[" "] && !jumpKeyPressed) {
        if (jumpCount < 2) {
          Body.applyForce(playerBody, playerBody.position, {
            x: 0,
            y: -0.023 * playerBody.mass,
          });
          setJumpCount((prev) => prev + 1);
        }
        setJumpKeyPressed(true);
      }

      if (!keysPressed[" "]) {
        setJumpKeyPressed(false);
      }

      // Reset jump count when on the ground
      if (Math.abs(playerBody.velocity.y) < 0.01 && jumpCount > 0) {
        setJumpCount(0);
      }

      // Continue the animation loop
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [keysPressed, playerBodyRef, jumpKeyPressed, jumpCount]);

  return <></>;
};
