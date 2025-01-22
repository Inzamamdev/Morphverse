import { useState } from "react";
import "./App.css";
import ButtonsGrid from "./components/ButtonsGrid";
import Scene from "./components/Scene";
import Stage1 from "./modules/stage1";
import Stage2 from "./modules/stage2";
import Stage3 from "./modules/stage3";

function App() {
  const [shape, setShape] = useState("plank");
  const [stage, setStage] = useState(0);
  return (
    <div className="overflow-x-hidden">
      {stage == 0 && <Scene shape={shape} />}
      {stage == 1 && <Stage1 shape={shape} />}
      {stage == 2 && <Stage2 shape={shape} />}
      {stage == 3 && <Stage3 shape={shape} />}
      <ButtonsGrid setShape={setShape} setStage={setStage} />
    </div>
  );
}

export default App;
