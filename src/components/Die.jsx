export default function Die({ die, toggleHold }) {
  return (
    <button
      style={{
        backgroundColor: die.isHeld ? 'rgb(95, 230, 95)' : 'white',
      }}
      onClick={() => toggleHold(die.id)}
      aria-pressed={die.isHeld}
      aria-label={`Die with value of ${die.value}, ${
        die.isHeld ? 'held' : 'not held'
      }`}
    >
      {die.value}
    </button>
  );
}
