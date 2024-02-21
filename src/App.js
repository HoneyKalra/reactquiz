import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Main from "./Main"
import Loader from './Loading';
import StartScreen from './StartScreen';
import Questions from './Questions';
import QuizFinished from './QuizFinished';

function App() {
  const initialState = {
    questions: [],
    status: "loading",
    questionNumber: 0,
    points: 0,
    answerChoosen: null,
    timeRemaining: 360,
  }
  function reducer(state, action) {
    if (action.type === "dataRecieved") {
      return { ...state, questions: action.payload, status: "ready" }
    }
    if (action.type === "requestFailed") {
      return { ...state, questions: [], status: "error" }
    }
    if (action.type === "startQuiz") {
      return { ...state, status: "active", questionNumber: state.questionNumber + 1 }
    }
    if (action.type === "answerChoosen") {
      const currentQuestion = state.questions[state.questionNumber]


      return { ...state, answerChoosen: action.payload, points: currentQuestion.correctOption === action.payload ? state.points + currentQuestion.points : state.points }
    }
    if (action.type === "nextClick") {
      if (state.questionNumber >= 14) {
        return { ...state, status: "finished" }
      }
      return { ...state, questionNumber: state.questionNumber + 1, answerChoosen: null }
    }
    if (action.type === "startTimer") {
      return {
        ...state, timeRemaining: state.timeRemaining - 1, status: state.timeRemaining > 0 ? "active" : "finished"
      }

    }
  }
  const [{ status, questions, questionNumber, answerChoosen, timeRemaining }, dispatch] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  console.log(numOfQuestions);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:9000/questions");
        if (response) {
          const data = await response.json();
          dispatch({ type: "dataRecieved", payload: data })
          return;

        }

        throw new Error("FAILED TO FETCH QUESTIONS")
      }
      catch (err) {
        const errorMsg = err.message
        dispatch({ type: "requestFailed", payload: errorMsg })

      }

    }
    fetchQuestions()
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && <StartScreen numOfQuestions={numOfQuestions} onStartQuiz={dispatch} />}
        {status === "finished" && <QuizFinished />}
        {status === "active" && <Questions question={questions[questionNumber]} answerChoosen={answerChoosen} dispatch={dispatch} questionNumber={questionNumber} timeRemaining={timeRemaining} />}
      </Main>
    </div>
  );
}
export default App;
