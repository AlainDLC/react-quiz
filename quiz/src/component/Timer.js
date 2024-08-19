import React, { useEffect } from "react";

export default function Timer({ dispatch, secoundsRemaining }) {
  const mins = Math.floor(secoundsRemaining / 60);
  const sec = Math.floor(secoundsRemaining % 60);

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "tick" }), 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}: {sec < 10 && "0"}
      {sec}
    </div>
  );
}
