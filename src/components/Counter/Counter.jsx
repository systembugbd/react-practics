import React, { useReducer } from "react";
import "./Counter.css";

const Counter = () => {
  const [counts, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="counter">
        <h1>Counter App project using useReducer React Hook</h1>

        <span className="count">{counts.count}</span>
        <div className="buttons">
          <button
            className="decrement btns"
            onClick={() => dispatch({ type: "decrease" })}
            title="Decrease"
          >
            -
          </button>
          <button
            className="increment btns"
            onClick={() => dispatch({ type: "increase" })}
            title="Increase"
          >
            +
          </button>
        </div>
        <button
          className="btns"
          onClick={() => dispatch({ type: "reset" })}
          title="Reset"
        >
          0
        </button>
      </div>
    </>
  );
};

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "increase":
      return {
        ...state,
        count: state.count + 1,
      };

    case "decrease":
      return {
        ...state,
        count: state.count <= 0 ? 0 : state.count - 1,
      };
    case "reset":
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

export default Counter;
