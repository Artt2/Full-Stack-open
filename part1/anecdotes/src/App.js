import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ];

  const votes = new Array(8).fill(0);

  const [selected, setSelected] = useState(0);
  const [selectedVotes, setSelectedVotes] = useState(votes);

  const generateRandom = () => {
    const num = Math.floor(Math.random() * 8); // random number between 0-7
    setSelected(num);
  };

  const addVote = () => {
    const newVotes = [...selectedVotes];
    newVotes[selected] += 1;
    setSelectedVotes(newVotes);
  };

  const getMostVotedIndex = () => {
    let largestIndex = 0;

    for (let i = 0; i < selectedVotes.length; i++) {
      if (selectedVotes[i] > selectedVotes[largestIndex]) {
        largestIndex = i;
      }
    }

    return largestIndex;
  };

  const mostVotedIndex = getMostVotedIndex();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={addVote}>vote</button>
      <button onClick={generateRandom}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {selectedVotes[mostVotedIndex] > 0 ? (
        <p>{anecdotes[mostVotedIndex]}</p>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

export default App;