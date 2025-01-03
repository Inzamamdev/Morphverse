import { EngineProvider } from "../context/EngineProvider";
import { Ground } from "./Ground";
import { Player } from "./Player";

export default function Scene() {
  return (
    <EngineProvider>
      <Player />
      <Ground x={400} y={202} width={700} height={20} />
      <Ground x={400} y={408} width={1000} height={20} />
    </EngineProvider>
  );
}
