import { useEffect, useRef } from "react";
import Matter from "matter-js";

interface EngineOptions {
  width?: number;
  height?: number;
  background?: string;
}

const useMatterEngine = ({ width = window.innerWidth, height = 400, background = "skyblue" }: EngineOptions) => {
  const engineRef = useRef<Matter.Engine>(Matter.Engine.create());
  const renderRef = useRef<Matter.Render | null>(null);

  useEffect(() => {
    const engine = engineRef.current;

    const render = Matter.Render.create({
      element: document.body, // Or a specific div you can pass via props
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background,
      },
    });
    renderRef.current = render;

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [width, height, background]);

  return engineRef.current;
};

export default useMatterEngine;