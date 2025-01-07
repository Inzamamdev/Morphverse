import { useEffect, useRef } from "react";
import Matter, { Collision } from "matter-js";
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
        fillStyle: "orange",
      },
    };

    // Generate particles
    for (let i = 0; i < 250; i++) {
      const particle = Matter.Bodies.circle(
        200 + Math.random() * 50 - 50, // Random x position
        -100 + Math.random() * 100, // Random y position
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
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      // Iterate through all detected collisions
      pairs.forEach((pair) => {
        const bodyA = pair.bodyA.label;
        const bodyB = pair.bodyB.label;

        if (bodyA != "ground" && bodyB != "ground") {
          if (bodyA == "player" || bodyB == "player") {
            console.log("Collide");
          }
        }
      });
    });
    return () => {
      Events.off(engine, "afterUpdate", updatePosition);
      Events.off(engine, "collisionStart");
    };
  }, [engine]);

  return (
    <div ref={playerRef}>
      <PlayerControls playerBodyRef={playerBodyRef} shape={shape} />
    </div>
  );
};
