import useMatterEngine from "../hooks/useMatterEngine";
import { Ground } from "./gameComponents/Ground";
import { Player } from "./gameComponents/Player";

interface Props {
  shape: string;
}

export default function Scene({ shape }: Props) {
  const engine = useMatterEngine({});
  return (
    <>
      <Player shape={shape} engine={engine} />
      <Ground
        engine={engine}
        x={400}
        y={408}
        width={10000}
        height={20}
        angle={0}
        label={"ground"}
      />
      <Ground
        engine={engine}
        x={400}
        y={202}
        width={700}
        height={20}
        angle={Math.PI / 6}
        label={"ground"}
      />
    </>
  );
}
