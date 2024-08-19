import React from "react";

export default function FinishScreen({
  ponits,
  maxPossiblePoints,
  highscore,
  dispatch,
}) {
  const percent = (ponits / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You Score <strong>{ponits}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percent)}%) 😎
      </p>

      <p className="highscore">(Highscore: {highscore} ponits)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        RESTART QUIZ
      </button>
    </>
  );
}
