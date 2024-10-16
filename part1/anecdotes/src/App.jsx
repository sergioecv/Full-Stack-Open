import { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const DisplayAnecdote = ({anecdote, votes}) => {
  return(
    <div>
        <p>
        {anecdote}
        </p>
        <p> 
          has {votes} votes
        </p>
    </div>
  )
}
const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text} </button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const [mostVoted, setMostVoted] = useState(0)

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    
    const mostVotedIndex = getMostVoted(copy)
    setMostVoted(mostVotedIndex)
  }
  const selectRandomAnecdote = () => {
    setSelected(Math.floor((Math.random() * (anecdotes.length - 0) + 0)))
  }

  const getMostVoted = (anecdotes) => {
    let max = anecdotes[0];
    let maxIndex = 0;
    for (let i = 1; i < anecdotes.length; i++) {
      if (anecdotes[i] > max) {
        maxIndex = i;
        max = anecdotes[i];
      }
    }
    return maxIndex;
  }

  return (
    <div>
      <Display text={'Anecdote of the day'}/>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={points[selected]} />

      <Button handleClick={voteAnecdote} text='vote'/>
      <Button handleClick={selectRandomAnecdote} text='next anecdote'/>

      <Display text={'Anecdote with most votes'}/>
      <DisplayAnecdote anecdote={anecdotes[mostVoted]} votes={points[mostVoted]} />
    </div>
  )
}

export default App