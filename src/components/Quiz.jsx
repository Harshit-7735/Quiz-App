import { useState } from "react";
import Header from "./Header";
import Question from "./Question";
import { useNavigate } from "react-router";
import NextIcon from "../layout/Nexticons"
import PrevIcon from "../layout/PrevIcon"


const Quiz = () => {
  // storing the index of current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["New York", "London", "Paris", "Dublin"],
      answer: 2,
    },
    {
      id: 2,
      question: "Who is CEO of Tesla?",
      options: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Tony Stark"],
      answer: 0,
    },
    {
      id: 3,
      question: "The iPhone was created by which company?",
      options: ["Apple", "Intel", "Amazon", "Microsoft"],
      answer: 0,
    },
    {
      id: 4,
      question: "How many Harry Potter books are there?",
      options: ["1", "4", "6", "7"],
      answer: 3,
    }
  ]);
  // initially answers is an array of null values with length equal to that of the number of questions
  const [answers, setAnswers] = useState(questions.map((q) => null));
  const navigate = useNavigate();

  const handleAnswer = (selectedAnswer, questionId) => {
    const questionIndex = questions.findIndex((q) => q.id === questionId);
    setAnswers((prev) =>
      prev.map((answer, index) => {
        if (index === questionIndex) {
          return selectedAnswer;
        }
        return answer;
      })
    );
  };
// goNext and goBack functions to navigate through questions
  const goNext = () =>
    setCurrentQuestion((prev) => {
      if (prev < questions.length - 1) {
        return prev + 1;
      }
      return prev;
    });

  const goBack = () =>
    setCurrentQuestion((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
// submitTest function to navigate to the result page
  const submiTest = () => {
    // check if all questions are marked, if not display warning
    navigate("/result", {
      state: {
        answers: answers,
        questions: questions,
      },
    });
  };
// count the number of attempted questions
  const attempted = answers.filter((a) => a !== null).length;
  return (
    <div className="quiz-container">
      <Header answers={answers} />
      <div className="quiz">
        <div style={{ display: "flex", alignItems: "center" }}>
          {currentQuestion > 0 && <PrevIcon goBack={goBack} />}
          <Question
            handleAnswer={handleAnswer}
            // selected answer is the index of the selected option
            selectedAnswer={answers[currentQuestion]}
            data={questions[currentQuestion]}
          />
         {currentQuestion < questions.length - 1 && <NextIcon goNext={goNext} />}
        </div>
        <div className="submit">
          <button onClick={submiTest} class="custom-btn btn-7">
            <span>
              {attempted === questions.length ? "Submit" : "End test"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;