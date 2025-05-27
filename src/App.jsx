import Die from './components/Die';
function App() {
  const diceElements = Array.from({ length: 10 }).map((_, index) => {
    const randomValue = Math.floor(Math.random() * 6 + 1);
    return <Die key={index} value={randomValue} />;
  });

  return (
    <main>
      <div className="buttons">{diceElements}</div>
    </main>
  );
}

export default App;
