import React, { createContext, useContext, useEffect, useRef } from "react";
import Matter from "matter-js";

const EngineContext = createContext<Matter.Engine | null>(null);

export const EngineProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const engineRef = useRef<Matter.Engine>(Matter.Engine.create());
  const renderRef = useRef<Matter.Render | null>(null);

  useEffect(() => {
    const engine = engineRef.current;

    const render = Matter.Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: innerWidth,
        height: 400,
        wireframes: false,
        background: "brown",
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
  }, []);

  return (
    <EngineContext.Provider value={engineRef.current}>
      {children}
    </EngineContext.Provider>
  );
};

export const useEngine = () => {
  const engine = useContext(EngineContext);
  if (!engine) {
    throw new Error("useEngine must be used within an EngineProvider");
  }
  return engine;
};
