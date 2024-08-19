import React from "react";
export default function Options({ questions, dispatch, answer }) {
  const hasAnwer = answer !== null;

  return (
    <div className="options">
      {questions?.options?.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} 
        ${
          answer !== null
            ? index === questions.correctOption
              ? "correct"
              : "wrong"
            : ""
        }`}
          disabled={hasAnwer}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
