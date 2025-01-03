import { useState } from "react";
import "./App.css";
import ButtonsGrid from "./components/ButtonsGrid";
import Scene from "./components/Scene";

function App() {
  const [shape, setShape] = useState('plank')
  return (
    <div className="overflow-x-hidden">
      <div>
        <Scene shape={shape} />
      </div>
      <ButtonsGrid setShape={setShape} />
    </div>
  );
}

export default App;
