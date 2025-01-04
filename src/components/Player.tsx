import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useEngine } from "../context/EngineProvider";
import { PlayerControls } from "./PlayerControls";

import { CurrrentPosition } from "../utils/currentPosition";
interface Props {
  shape: string;
}

export const Player = ({ shape }: Props) => {
  const engine = useEngine();
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerBodyRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    const { World } = Matter;

    CurrrentPosition(shape, engine, playerBodyRef);

    return () => {
      const oldBody = playerBodyRef.current;
      if (oldBody) {
        World.remove(engine.world, oldBody);
      }
    };
  }, [engine, shape]);

  useEffect(() => {
    const { Events } = Matter;
    const particles = [];
    const particleOptions = {
      friction: 0, // No surface friction
      frictionAir: 0.05, // Simulates drag in air
      restitution: 0.2, // Some bounce to simulate interaction
      render: {
        fillStyle: "blue",
      },
    };

    // Generate particles
    for (let i = 0; i < 500; i++) {
      const particle = Matter.Bodies.circle(
        200 + Math.random() * 50 - 50, // Random x position
        50 + Math.random() * 100, // Random y position
        1, // Radius
        particleOptions
      );
      particles.push(particle);
    }

    Matter.World.add(engine.world, particles);

    const playerBody = playerBodyRef.current;

    if (!playerBody) return;

    const updatePosition = () => {
      if (playerRef.current) {
        playerRef.current.style.transform = `translate(${
          playerBody.position.x - 20
        }px, ${playerBody.position.y - 20}px)`;
      }
    };

    Events.on(engine, "afterUpdate", updatePosition);

    return () => {
      Events.off(engine, "afterUpdate", updatePosition);
    };
  }, [engine]);
  return (
    <div ref={playerRef}>
      <PlayerControls playerBodyRef={playerBodyRef} shape={shape} />
    </div>
  );
};
