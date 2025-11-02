import { useState } from "react";

export default function SaveGameModal({ isOpen, onClose, onSave, boardSize }) {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!playerX || !playerO) {
      alert("กรุณากรอกชื่อผู้เล่นทั้งสองคน");
      return;
    }
    onSave({ playerX, playerO, boardSize });
    setPlayerX("");
    setPlayerO("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Save Game</h2>

        <div className="flex flex-col gap-3 mb-4">
          <input
            type="text"
            placeholder="Player X"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Player O"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
    