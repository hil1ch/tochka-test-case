import "./App.css";
import { Board } from "./components/Board/Board";
import { Header } from "./components/Header/Header";
import { Info } from "./components/Info/Info";

function App() {
  return (
    <>
      <Header />
      <Board>Игровое поле</Board>
      <Info />
    </>
  );
}

export default App;
