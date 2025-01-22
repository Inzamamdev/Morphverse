import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { PlayerControls } from "./PlayerControls";

import { CurrrentPosition } from "../../utils/currentPosition";
interface Props {
  shape: string;
  engine: Matter.Engine;
}

export const Player = ({ shape, engine }: Props) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerBodyRef = useRef<Matter.Body | null>(null);
  const [bodyA, setBodyA] = useState("");
  const [bodyB, setBodyB] = useState("");
  const viewportWidth = window.innerWidth;
  const viewportHeight = 400;

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

    const playerBody = playerBodyRef.current;

    if (!playerBody) return;

    const updatePosition = () => {
      if (playerRef.current) {
        playerRef.current.style.transform = `translate(${
          playerBody.position.x - 20
        }px, ${playerBody.position.y - 20}px)`;

        if (
          playerBody.position.x < 0 ||
          playerBody.position.x > viewportWidth ||
          playerBody.position.y < 0 ||
          playerBody.position.y > viewportHeight
        ) {
          alert("player fell");
          // Add additional logic if needed, e.g., reset player position
        }
      }
    };

    Events.on(engine, "afterUpdate", updatePosition);
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      pairs.forEach((pair) => {
        setBodyA(pair.bodyA.label);
        setBodyB(pair.bodyB.label);

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
      <PlayerControls
        playerBodyRef={playerBodyRef}
        shape={shape}
        engine={engine}
        bodyA={bodyA}
        bodyB={bodyB}
      />
    </div>
  );
};
