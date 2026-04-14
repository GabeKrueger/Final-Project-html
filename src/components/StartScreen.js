import { useState } from "react";

function StartScreen({ setGameState, setScore }) {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");

  const startQuiz = () => {
    setScore(0);
    localStorage.setItem("category", category);
    localStorage.setItem("difficulty", difficulty);
    setGameState("QUIZ_ACTIVE");
  };

  return (
    <div className="card">
      <h1 className="title">Trivia Game</h1>

      <div className="form-group">
        <label>Category</label>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="9">General Knowledge</option>
          <option value="17">Science</option>
          <option value="23">History</option>
        </select>
      </div>

      <div className="form-group">
        <label>Difficulty</label>
        <select onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button className="btn" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;