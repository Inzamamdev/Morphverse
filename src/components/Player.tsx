import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useEngine } from "../context/EngineProvider";
import { PlayerControls } from "./PlayerControls";

interface Props {
  shape: string;
}

export const Player = ({ shape }: Props) => {
  const engine = useEngine();
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerBodyRef = useRef<Matter.Body | null>(null);
  const triangleVertices = [
    { x: 0, y: 0 },
    { x: 15, y: 30 },
    { x: -15, y: 30 },
  ];
  useEffect(() => {
    const { World, Bodies } = Matter;

    let playerBody: Matter.Body;

    if (shape == 'plank') {
      playerBody = Bodies.rectangle(100, 100, 15, 40, {
        friction: 1,
      });
    } else if (shape == 'circle') {
      playerBody = Bodies.circle(100, 100, 20, {
        friction: 1,
      });
    }
    else {
      playerBody = Matter.Bodies.fromVertices(
        200, // x position
        200, // y position
        [triangleVertices], // Vertices array
        {
          isStatic: false, // Make it dynamic
          render: {
            fillStyle: "blue", // Optional: Set a fill color for rendering
          },
        }
      );
    }

    playerBodyRef.current = playerBody;

    World.add(engine.world, playerBody);

    return () => {
      World.remove(engine.world, playerBody);
    };
  }, [engine, shape]);

  useEffect(() => {
    const { Events } = Matter;

    const playerBody = playerBodyRef.current;

    if (!playerBody) return;

    const updatePosition = () => {
      if (playerRef.current) {
        playerRef.current.style.transform = `translate(${playerBody.position.x - 20}px, ${playerBody.position.y - 20}px)`;
      }
    };

    Events.on(engine, "afterUpdate", updatePosition);

    return () => {
      Events.off(engine, "afterUpdate", updatePosition);
    };
  }, [engine]);
  return (
    <div
      ref={playerRef}
    >
      <PlayerControls playerBodyRef={playerBodyRef} />
    </div>
  );
};
