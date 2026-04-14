import { useEffect, useState } from "react";

function ResultsScreen({ score, setGameState }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("scores")) || [];
    const updated = [...saved, score].sort((a,b)=>b-a).slice(0,5);

    localStorage.setItem("scores", JSON.stringify(updated));
    setScores(updated);
  }, [score]);

  return (
    <div className="card">
      <h1 className="title">Final Score: {score}</h1>

      <ul className="leaderboard">
        {scores.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <button className="btn" onClick={() => setGameState("START_SCREEN")}>
        Play Again
      </button>
    </div>
  );
}

export default ResultsScreen;