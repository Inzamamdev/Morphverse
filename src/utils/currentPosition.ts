import Matter from "matter-js";
import { createBody } from "./createBody";
import { MutableRefObject } from "react";

export const CurrrentPosition = (
  shape: string,
  engine: Matter.Engine,
  playerBodyRef: MutableRefObject<Matter.Body | null>
) => {
  const { World } = Matter;
  const oldBody = playerBodyRef.current;

  // Get the current position or default to (100, 100)
  const x = oldBody ? oldBody.position.x : 100;
  const y = oldBody ? oldBody.position.y : 100;

  // Remove the old body if it exists
  if (oldBody) {
    World.remove(engine.world, oldBody);
  }

  // Create the new body at the same position
  const newBody = createBody(x, y, shape);

  // Update the reference
  playerBodyRef.current = newBody;

  // Add the new body to the world
  World.add(engine.world, newBody);
};
