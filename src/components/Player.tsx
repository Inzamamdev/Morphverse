import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function Player() {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const playerBodyRef = useRef<Matter.Body | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  // State to keep track of pressed keys
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const { Engine, World, Bodies, Runner, Events, Render } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;

    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: innerWidth, // Canvas width in pixels
        height: 400, // Canvas height in pixels
        wireframes: false,
        background: "brown",
      },
    });

    // Create the player body
    const playerBody = Bodies.rectangle(100, 100, 40, 40, {
      friction: 1,
    });
    playerBodyRef.current = playerBody;

    // Create ground
    const ground = Bodies.rectangle(400, 202, 700, 20, { isStatic: true });
    const ground2 = Bodies.rectangle(400, 408, 1000, 20, { isStatic: true });
    World.add(engine.world, [playerBody, ground, ground2]);

    // Sync the player body with the custom `div`
    Events.on(engine, "afterUpdate", () => {
      if (playerRef.current) {
        playerRef.current.style.transform = `translate(${
          playerBody.position.x - 100
        }px, ${playerBody.position.y - 100}px)`;
      }
    });

    // Run the engine
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Handle key events and update the state
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({
        ...prev,
        [event.key]: true,
      }));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prev) => ({
        ...prev,
        [event.key]: false,
      }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  useEffect(() => {
    const { Body } = Matter;

    if (!playerBodyRef.current) return;

    const playerBody = playerBodyRef.current;

    // Horizontal movement
    if (keysPressed["ArrowLeft"]) {
      Body.setVelocity(playerBody, { x: -1, y: playerBody.velocity.y });
    }
    if (keysPressed["ArrowRight"]) {
      Body.setVelocity(playerBody, { x: 1, y: playerBody.velocity.y });
    }

    // Jumping
    if (keysPressed[" "] && Math.abs(playerBody.velocity.y) < 0.01) {
      Body.applyForce(playerBody, playerBody.position, { x: 0, y: -0.05 });
    }
  }, [keysPressed]);

  return (
    <>
      <div></div>
    </>
  );
}
