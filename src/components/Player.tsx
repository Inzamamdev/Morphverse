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
      <PlayerControls playerBodyRef={playerBodyRef} />
    </div>
  );
};
