import { useEffect, useState } from "react";
import { getAllGames } from "../api/gameApi";
import ReplayBoard from "./ReplayBoard";

export default function History({ refreshFlag }) {
  const [games, setGames] = useState([]);
  const [replay, setReplay] = useState(null);

  useEffect(() => {
    fetchGames();
  }, [refreshFlag]);

  const fetchGames = async () => {
    try {
      const res = await getAllGames();
      setGames(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplay = (id) => {
    const game = games.find(g => g.id === id);
    if (game) {
      const moves = JSON.parse(game.movesJson);
      setReplay({ moves, info: game });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="bg-white p-4 rounded shadow-md flex-1">
        <h3 className="text-xl font-bold mb-4">Game History</h3>

        {games.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีเกม</p>
        ) : (
          <ul className="space-y-2">
            {games.map((g) => (
              <li key={g.id} className="flex justify-between items-center">
                <span>
                  Game {g.id}: {g.playerX} vs {g.playerO} ({g.boardSize}x{g.boardSize})
                </span>
                <button
                  onClick={() => handleReplay(g.id)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Replay
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {replay && (
        <div className="bg-white p-4 rounded shadow-md flex-1">
          <h4 className="text-lg font-semibold mb-2">
            Replay: Game {replay.info.id} ({replay.info.boardSize}x{replay.info.boardSize})
          </h4>
          <ReplayBoard boardHistory={replay.moves} />
        </div>
      )}
    </div>
  );
}
