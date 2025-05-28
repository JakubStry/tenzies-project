import { useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die';
function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const isGameWin = dice.every(
    (die) => die.isHeld && die.value === dice[0].value
  );

  function getRandomValue() {
    return Math.floor(Math.random() * 6 + 1);
  }

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: getRandomValue(),
      isHeld: false,
    }));
  }

  function rollDice() {
    if (isGameWin) {
      setDice(generateAllNewDice());
      return;
    }

    setDice((prevDice) =>
      prevDice.map((die) => {
        if (die.isHeld) {
          return die;
        } else {
          return { ...die, value: getRandomValue() };
        }
      })
    );
  }

  const toggleHold = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {dice.map((die) => (
          <Die key={die.id} die={die} toggleHold={toggleHold} />
        ))}
      </div>
      <button className="roll-btn" onClick={rollDice}>
        {isGameWin ? 'New Game' : 'Roll dice'}
      </button>
      {isGameWin && <Confetti />}
    </main>
  );
}

export default App;
