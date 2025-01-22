import { useEffect } from "react";
import Matter from "matter-js";

export const Ground: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  engine: Matter.Engine;
  label: string;
}> = ({ x, y, width, height, angle, engine, label }) => {
  useEffect(() => {
    const { World, Bodies } = Matter;

    const ground = Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      angle: angle,
      label: label,
    });

    World.add(engine.world, ground);

    return () => {
      World.remove(engine.world, ground);
    };
  }, [engine, x, y, width, height]);

  return null;
};
