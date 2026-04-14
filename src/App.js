import { useState } from "react";
import "./styles.css";

import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";

function App() {
  const [gameState, setGameState] = useState("START_SCREEN");
  const [score, setScore] = useState(0);

  return (
    <div className="app">
      {gameState === "START_SCREEN" && (
        <StartScreen setGameState={setGameState} setScore={setScore} />
      )}

      {gameState === "QUIZ_ACTIVE" && (
        <QuizScreen
          setGameState={setGameState}
          score={score}
          setScore={setScore}
        />
      )}

      {gameState === "RESULTS_SCREEN" && (
        <ResultsScreen score={score} setGameState={setGameState} />
      )}
    </div>
  );
}

export default App;