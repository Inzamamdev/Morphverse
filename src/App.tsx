import "./App.css";
import ButtonsGrid from "./components/ButtonsGrid";
import Scene from "./components/Scene";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Scene />
      <ButtonsGrid />
    </div>
  );
}

export default App;
