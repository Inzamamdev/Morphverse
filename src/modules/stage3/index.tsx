import { useEffect } from "react";
import { Player } from "../../components/gameComponents/Player";
import { Ground } from "../../components/gameComponents/Ground";
import useMatterEngine from "../../hooks/useMatterEngine";
import Matter, { Composite, Body, Vector } from "matter-js";

interface Props {
  shape: string;
}

export default function Stage3({ shape }: Props) {
  const engine = useMatterEngine({}); // Custom hook to initialize Matter.js engine

  useEffect(() => {
    const world = engine.world;
    const windStrength = 0.0001;

    const applyWindForce = (body: Body, windStrength: number) => {
      const wind = Vector.create(-windStrength, 0);
      Body.applyForce(body, body.position, wind);
    };

    Matter.Events.on(engine, "afterUpdate", () => {
      Composite.allBodies(world).forEach((body) => {
        if (!body.isStatic) {
          applyWindForce(body, windStrength);
        }
      });
    });

    // Cleanup listener on component unmount
    return () => {
      Matter.Events.off(engine, "afterUpdate");
    };
  }, [engine]);

  return (
    <div>
      <Player engine={engine} shape={shape} />
      <Ground
        engine={engine}
        width={420}
        height={10}
        angle={0}
        x={450}
        y={180}
        label={"stage3-ground"}
      />
    </div>
  );
}
