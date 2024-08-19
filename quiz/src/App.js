import { useEffect, useReducer } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader";
import Error from "./component/Error";
import StartScreen from "./component/StartScreen";
import Question from "./component/Question";
import NextButton from "./component/NextButton";
import Progress from "./component/Progress";
import FinishScreen from "./component/FinishScreen";
import Footer from "./component/Footer";
import Timer from "./component/Timer";

// | "error" | "ready" | "active" | "finished"
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secoundsRemaining: null,
};
const SECS_PER_QUESTION = 20;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecievid":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFial":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secoundsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state?.questions?.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question?.points
            : state.points,
      };
    case "nextQuestions":
      return { ...state, index: state.index + 1, answer: null };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secoundsRemaining: state.secoundsRemaining - 1,
        status: state.secoundsRemaining === 0 ? "finished" : state.status,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw Error("Action unknow");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secoundsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecievid", payload: data }))
      .catch((err) => dispatch({ type: "dataFial" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer
                dispatch={dispatch}
                secoundsRemaining={secoundsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestions={numOfQuestions}
              />{" "}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            ponits={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
