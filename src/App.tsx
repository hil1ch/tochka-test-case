import "./App.css";
import { Board } from "./components/Board/Board";
import { RightPanel } from "./components/RightPanel/RightPanel";

function App() {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Board />
      <RightPanel />
    </div>
  );
}

export default App;
