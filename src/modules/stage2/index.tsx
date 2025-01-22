import useMatterEngine from "../../hooks/useMatterEngine";
import { Player } from "../../components/gameComponents/Player";
import { Ground } from "../../components/gameComponents/Ground";
import Particles from "../../components/gameComponents/Particles";
import Matter from "matter-js";
import { useEffect } from "react";
interface Props {
  shape: string;
}

export default function Stage2({ shape }: Props) {
  const engine = useMatterEngine({});
  const { Events } = Matter;

  useEffect(() => {
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      pairs.forEach((pair) => {
        const bodyA = pair.bodyA.label;
        const bodyB = pair.bodyB.label;

        if (bodyA != "ground" && bodyB != "ground") {
          if (bodyA == "player" || bodyB == "player") {
            alert("Game Over");
          }
        }
      });
    });
  }, [engine]);
  return (
    <div>
      <Particles engine={engine} count={250} />
      <Player engine={engine} shape={shape} />;
      <Ground
        engine={engine}
        x={400}
        y={202}
        width={700}
        height={20}
        angle={Math.PI / 6}
        label={"ground"}
      />
      <Ground
        engine={engine}
        x={400}
        y={408}
        width={10000}
        height={20}
        angle={0}
        label={"ground"}
      />
    </div>
  );
}
