import { useState } from 'react';
import { nanoid } from 'nanoid';
import Die from './components/Die';
function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

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
      <div className="dice-container">
        {dice.map((die) => (
          <Die key={die.id} die={die} toggleHold={toggleHold} />
        ))}
      </div>
      <button className="roll-btn" onClick={rollDice}>
        Roll dice
      </button>
    </main>
  );
}

export default App;
