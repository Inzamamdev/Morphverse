import { useState } from "react";
import "./App.css";
import ButtonsGrid from "./components/ButtonsGrid";
import Scene from "./components/Scene";
import Stage1 from "./modules/stage1";

function App() {
  const [shape, setShape] = useState('plank')
  const [stage, setStage] = useState(0);
  return (
    <div className="overflow-x-hidden">
      {stage == 0 && <Scene shape={shape} />}
      {stage == 1 && <Stage1 shape={shape} />}
      <ButtonsGrid setShape={setShape} setStage={setStage} />
    </div>
  );
}

export default App;
