import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

// Result component to display the result of the quiz
const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
// calculate the score based on the answers
  useEffect(() => {
    if (!state) {
      navigate("/");
      return;
    }
// compare the answers with the correct answers
    const { answers, questions } = state;
    console.log("Answers:", answers);
    console.log("Questions:", questions);

    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        calculatedScore++;
      }
    });

    console.log("Calculated Score:", calculatedScore);
    setScore(calculatedScore);
  }, [state, navigate]);

  return (
    <div>
      <h1>Result: {score}</h1>
    </div>
  );
};

export default Result;