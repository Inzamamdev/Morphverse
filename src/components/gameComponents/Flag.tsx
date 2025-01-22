import Matter, { Bodies } from "matter-js";
import { useEffect } from "react";

type Props = {
  type: string;
  engine: Matter.Engine;
  x: number;
  y: number;
};

export default function Flag({ type, engine, x, y }: Props) {
  useEffect(() => {
    const { World } = Matter;
    const world = engine.world;

    // Starting Flag - Positioned at the left side
    const startFlag = Bodies.rectangle(x, y, 20, 60, {
      isStatic: true, // Flag does not move
      render: {
        fillStyle: "green", // Color of the start flag
      },
      label: "flag",
    });

    // Ending Flag - Positioned at the right side
    const endFlag = Bodies.rectangle(x, y, 20, 60, {
      isStatic: true, // Flag does not move
      render: {
        fillStyle: "red", // Color of the end flag
      },
      label: "flag",
    });

    if (type == "Start") {
      World.add(world, startFlag);
    } else {
      World.add(world, endFlag);
    }
  }, []);
  return null;
}
