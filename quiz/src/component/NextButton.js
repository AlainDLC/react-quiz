import React from "react";

export default function NextButton({
  dispatch,
  answer,
  index,
  numOfQuestions,
}) {
  // Do not render the button if there is no answer
  if (answer === null) return null;

  // If it's not the last question, show the NEXT button
  if (index < numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestions" })}
      >
        NEXT
      </button>
    );
  }

  if (index === numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        FINISH
      </button>
    );
  }
}
