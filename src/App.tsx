import "./App.css";
import { Board } from "./components/Board/Board";
import { Info } from "./components/Info/Info";

function App() {
  return (
    <>
      <Board>Игровое поле</Board>
      <Info />
    </>
  );
}

export default App;
