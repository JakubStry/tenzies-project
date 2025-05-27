import { useState } from 'react';
import Die from './components/Die';
function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  function getRandomValue() {
    return Math.floor(Math.random() * 6 + 1);
  }

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => getRandomValue());
  }

  return (
    <main>
      <div className="dice-container">
        {dice.map((value, index) => (
          <Die key={index} value={value} />
        ))}
      </div>
      <button className="roll-btn" onClick={() => setDice(generateAllNewDice)}>
        Roll dice
      </button>
    </main>
  );
}

export default App;
