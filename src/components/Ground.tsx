import { useEffect } from "react";
import Matter from "matter-js";
import { useEngine } from "../context/EngineProvider";

export const Ground: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
}> = ({ x, y, width, height, angle }) => {
  const engine = useEngine();

  useEffect(() => {
    const { World, Bodies } = Matter;

    const ground = Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      angle: angle,
      label: "ground",
    });

    World.add(engine.world, ground);

    return () => {
      World.remove(engine.world, ground);
    };
  }, [engine, x, y, width, height]);

  return null;
};
