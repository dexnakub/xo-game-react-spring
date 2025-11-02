import { useState } from "react";
import Board from "./components/Board";
import History from "./components/History";

export default function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [refreshHistoryFlag, setRefreshHistoryFlag] = useState(0); 

  const handleChange = (e) => {
    setBoardSize(parseInt(e.target.value));
  };

  const refreshHistory = () => {
    setRefreshHistoryFlag(prev => prev + 1);
  };

  return (
    <div className="container">
      <h1 className="mb-4 text-3xl font-bold">XO Game</h1>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="board-size" style={{ marginRight: "10px" }}>
          Select Board Size:
        </label>
        <select id="board-size" value={boardSize} onChange={handleChange}>
          {[3, 4, 5, 6].map(size => (
            <option key={size} value={size}>{size} x {size}</option>
          ))}
        </select>
      </div>

      <Board size={boardSize} refreshHistory={refreshHistory} />

      <History refreshFlag={refreshHistoryFlag} />
    </div>
  );
}
