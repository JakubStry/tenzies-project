import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die';
function App() {
  const [dice, setDice] = useState(() => {
    const savedDice = localStorage.getItem('dice');
    return savedDice ? JSON.parse(savedDice) : generateAllNewDice();
  });

  const [attempts, setAttempts] = useState(() => {
    const savedAttempts = localStorage.getItem('attempts');
    return savedAttempts ? JSON.parse(savedAttempts) : 0;
  });

  const isGameWin = dice.every(
    (die) => die.isHeld && die.value === dice[0].value
  );

  const buttonRef = useRef(null);

  useEffect(() => {
    if (isGameWin) {
      buttonRef.current.focus();
    }
  }, [isGameWin]);

  useEffect(() => {
    localStorage.setItem('dice', JSON.stringify(dice));
    localStorage.setItem('attempts', JSON.stringify(attempts));
  }, [dice, attempts]);

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
      localStorage.removeItem('dice');
      localStorage.removeItem('attempts');
      setDice(generateAllNewDice());
      setAttempts(0);
      return;
    }

    setAttempts((prevAttempts) => prevAttempts + 1);

    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : { ...die, value: getRandomValue() };
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
      {isGameWin && (
        <Confetti
          numberOfPieces={300}
          recycle={false}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 999,
          }}
        />
      )}
      {/* screen reader only */}
      <div aria-live="polite" className="sr-only">
        {isGameWin && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className={isGameWin ? 'win-text' : 'instructions'}>
        {isGameWin
          ? `Congrats!🎉🎉🎉 You won in ${attempts} attempts. Click New Game to play again.`
          : 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}
      </p>
      <div className="dice-container">
        {dice.map((die) => (
          <Die key={die.id} die={die} toggleHold={toggleHold} />
        ))}
      </div>
      <p className="attempts">Attempts: {attempts}</p>
      <button className="roll-btn" ref={buttonRef} onClick={rollDice}>
        {isGameWin ? 'New Game' : 'Roll dice'}
      </button>
    </main>
  );
}

export default App;
