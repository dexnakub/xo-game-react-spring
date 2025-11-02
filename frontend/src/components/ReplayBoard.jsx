import { useEffect, useState } from "react";
import Cell from "./Cell";

export default function ReplayBoard({ boardHistory = [] }) {
  const [currentBoard, setCurrentBoard] = useState([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= boardHistory.length) { clearInterval(interval); return; }
      setCurrentBoard(boardHistory[i]);
      i++;
    }, 500);
    return () => clearInterval(interval);
  }, [boardHistory]);

  if (!boardHistory.length) return null;

  return (
    <table>
      <tbody>
        {currentBoard.map((row,i)=>(
          <tr key={i}>{row.map((cell,j)=><Cell key={j} value={cell}/>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
