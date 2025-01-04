import { EngineProvider } from "../context/EngineProvider";
import { Ground } from "./Ground";
import { Player } from "./Player";

interface Props {
  shape: string;
}

export default function Scene({ shape }: Props) {
  return (
    <EngineProvider>
      <Player shape={shape} />
      <Ground x={400} y={202} width={700} height={20} angle={Math.PI / 6} />
      <Ground x={400} y={408} width={1000} height={20} angle={0} />
    </EngineProvider>
  );
}
