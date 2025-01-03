import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useEngine } from "../context/EngineProvider";
import { PlayerControls } from "./PlayerControls";

export const Player: React.FC = () => {
  const engine = useEngine();
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerBodyRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    const { World, Bodies } = Matter;

    const playerBody = Bodies.rectangle(100, 100, 40, 40, {
      friction: 1,
    });
    playerBodyRef.current = playerBody;

    World.add(engine.world, playerBody);

    return () => {
      World.remove(engine.world, playerBody);
    };
  }, [engine]);

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
