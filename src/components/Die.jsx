export default function Die({ die, toggleHold }) {
  return (
    <button
      style={{
        backgroundColor: die.isHeld ? 'rgb(95, 230, 95)' : 'white',
      }}
      onClick={() => toggleHold(die.id)}
    >
      {die.value}
    </button>
  );
}
