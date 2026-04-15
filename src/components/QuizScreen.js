import React, { useState, useEffect } from "react";

function QuizScreen({ category, difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!category || !difficulty) return;

    const fetchQuestions = async () => {
      setLoading(true);

      try {

        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );

        const data = await response.json();

        setQuestions(data.results || []);
        setCurrentQuestionIndex(0);
        setScore(0);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }

      setLoading(false);
    };

    fetchQuestions();
  }, [category, difficulty]);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };


  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    nextQuestion();
  };

  if (loading) {
    return <h2>Loading questions...</h2>;
  }


  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );
  }


  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <h2>No questions available</h2>;
  }

  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>

      <h3
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />

      <div>
        {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
          .sort()
          .map((answer, index) => (
            <button
              key={index}
              onClick={() =>
                handleAnswer(answer === currentQuestion.correct_answer)
              }
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          ))}
      </div>

      <p>Score: {score}</p>
    </div>
  );
}

export default QuizScreen;
