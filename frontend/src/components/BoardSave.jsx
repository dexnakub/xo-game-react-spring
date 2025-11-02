import { useState } from "react";
import SaveGameModal from "./SaveGameModal";
import { saveGame } from "../api/gameApi";

export default function BoardSave({ boardHistory, size, winner }) {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveResultModal, setSaveResultModal] = useState(null); 

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
    } catch (err) {
      console.error(err);
      setSaveResultModal("fail");     
    } finally {
      setIsSaveModalOpen(false);      
    }
  };

  return (
    <div>
      {/* ปุ่มเปิด modal input */}
      <button
        onClick={() => setIsSaveModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Game
      </button>

      {/* Modal กรอกชื่อผู้เล่น */}
      <SaveGameModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveGame}
        boardSize={size}
      />

      {/* Modal แสดงผล save success/fail */}
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
    </div>
  );
}
