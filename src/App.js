import React, { useState, useEffect } from "react";
import Die from "./components/Die";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [digit, setDigit] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = digit.every((die) => die.isHeld);
    const firstValue = digit[0].value;
    const allSameValue = digit.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      alert("Congratulations, You won!");
    }
  }, [digit]);

  function getNewDice() {
    return {
      value: Math.round(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(getNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDigit((rolledDice) =>
        rolledDice.map((die) => {
          return die.isHeld ? die : getNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDigit(allNewDice());
    }
  }

  function holdDice(id) {
    setDigit((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElem = digit.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="keys">{diceElem}</div>

      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
