import { useEffect, useState } from "react";

function QuizScreen({ setGameState, score, setScore }) {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timer, setTimer] = useState(15);

  const category = localStorage.getItem("category");
  const difficulty = localStorage.getItem("difficulty");

  useEffect(() => {
  fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(res => res.json())
    .then(data => {
      if (!data.results) {
        console.error("API returned no results:", data);
        return;
      }

      const formatted = data.results.map(q => {
        const answers = [...q.incorrect_answers, q.correct_answer];
        return {
          question: q.question,
          correct: q.correct_answer,
          answers: shuffleArray(answers),
        };
      });

      setQuestions(formatted);
    })
    .catch(err => console.error("Fetch error:", err));
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) nextQuestion();
  }, [timer]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQ].correct) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setTimer(15);
    } else {
      setGameState("RESULTS_SCREEN");
    }
  };

  if (!questions.length) return <h2>Loading...</h2>;

  return (
    <div className="card">
      <h2 dangerouslySetInnerHTML={{ __html: questions[currentQ].question }} />
      <div className="timer">Time: {timer}</div>

      <div className="answers">
        {questions[currentQ].answers.map((a, i) => (
          <button
            key={i}
            className="btn answer-btn"
            onClick={() => handleAnswer(a)}
            dangerouslySetInnerHTML={{ __html: a }}
          />
        ))}
      </div>
    </div>
  );
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export default QuizScreen;