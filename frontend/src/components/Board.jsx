import { useState, useEffect } from "react";
import Cell from "./Cell";
import SaveGameModal from "./SaveGameModal";
import { saveGame, getAllGames } from "../api/gameApi";

export default function Board({ size = 3, vsBot = true, refreshHistory }) {
  const [board, setBoard] = useState([]);
  const [boardHistory, setBoardHistory] = useState([]);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveResultModal, setSaveResultModal] = useState(null);
  const [gamesHistory, setGamesHistory] = useState([]);

  useEffect(() => resetBoard(), [size]);

  const resetBoard = () => {
    setBoard(Array(size).fill(null).map(() => Array(size).fill(null)));
    setBoardHistory([]);
    setPlayer("X");
    setWinner(null);
  };

  const checkWinner = (b) => {
    for (let row of b) if (row.every(c => c && c === row[0])) return row[0];
    for (let i = 0; i < size; i++) if (b.map(r => r[i]).every(c => c && c === b[0][i])) return b[0][i];
    const diag1 = b.map((r, i) => r[i]); if (diag1.every(c => c && c === diag1[0])) return diag1[0];
    const diag2 = b.map((r, i) => r[size - 1 - i]); if (diag2.every(c => c && c === diag2[0])) return diag2[0];
    return null;
  };

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = player;
    setBoardHistory([...boardHistory, newBoard]);
    setBoard(newBoard);

    const w = checkWinner(newBoard);
    setWinner(w);

    if (!w) {
      const nextPlayer = player === "X" ? "O" : "X";
      setPlayer(nextPlayer);
      if (vsBot && nextPlayer === "O") setTimeout(() => botMove(newBoard), 300);
    }
  };

  const botMove = (b) => {
    const emptyCells = [];
    b.forEach((r, i) => r.forEach((c, j) => { if (!c) emptyCells.push([i, j]); }));
    if (!emptyCells.length) return;
    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = b.map(r => [...r]);
    newBoard[r][c] = "O";
    setBoardHistory([...boardHistory, newBoard]);
    setBoard(newBoard);

    const w = checkWinner(newBoard);
    setWinner(w);
    setPlayer("X");
  };

  const handleSaveGame = async ({ playerX, playerO }) => {
    try {
      await saveGame({
        playerX,
        playerO,
        boardSize: size,
        movesJson: JSON.stringify(boardHistory),
        winner
      });

      setSaveResultModal("success");  
      resetBoard();                   
      if (refreshHistory) refreshHistory();  

    } catch (err) {
      console.error(err);
      setSaveResultModal("fail");     
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">XO Game {size}x{size}</h2>

      <table className="border-collapse border border-gray-700">
        <tbody>
          {board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <Cell key={j} value={cell} onClick={() => handleClick(i, j)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {winner && <h3 className="text-green-600 font-semibold mt-2">Winner: {winner}</h3>}

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => setIsSaveModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Game
        </button>

        <button
          onClick={resetBoard}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset Board
        </button>
      </div>

      <SaveGameModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveGame}
        boardSize={size}
      />

      {saveResultModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            {saveResultModal === "success" ? (
              <p className="text-green-600 font-bold text-lg">✅ Game saved successfully!</p>
            ) : (
              <p className="text-red-600 font-bold text-lg">❌ Failed to save game!</p>
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setSaveResultModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md mt-4">
        <h3 className="text-lg font-semibold mb-2">History ({gamesHistory.length})</h3>
        {gamesHistory.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีเกม</p>
        ) : (
          <ul className="space-y-1">
            {gamesHistory.map((g) => (
              <li key={g.id}>
                Game {g.id}: {g.playerX} vs {g.playerO} ({g.boardSize}x{g.boardSize})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
