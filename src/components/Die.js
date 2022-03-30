import React from "react";

export default function Die(props) {
  const bgStyle = {
    backgroundColor: props.isHeld ? "#59e391" : "#fff",
  };

  return (
    <button onClick={props.holdDice} style={bgStyle} className="die">
      {props.value}
    </button>
  );
}
