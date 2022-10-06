import { useState } from 'react';

const Anecdote = (props) => {
  const { text, vote, randomAnecdote, handleVote } = props;
  return (
    <>
      <p>{text}</p>
      <p>has {vote} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>
    </>
  );
};

const TheMostAnecdote = (props) => {
  const { text, vote } = props;
  return (
    <>
      <p>{text}</p>
      <p>has {vote} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);
  const [voteArray, setVoteArray] = useState(Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const newVoteArr = [...voteArray];
    newVoteArr[selected]++;
    setVoteArray(newVoteArr);
  };

  const randomAnecdote = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  };

  const maxVote = Math.max(...voteArray);
  const indexOfMaxVote = voteArray.indexOf(maxVote);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote
        text={anecdotes[selected]}
        vote={voteArray[selected]}
        handleVote={handleVote}
        randomAnecdote={randomAnecdote}
      />
      <br />
      <h1>Anecdote with most votes</h1>
      <TheMostAnecdote
        text={anecdotes[indexOfMaxVote]}
        vote={voteArray[indexOfMaxVote]}
      />
    </div>
  );
};

export default App;
