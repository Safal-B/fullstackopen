import { useState } from 'react'

 const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
 }

const Header = ({heading}) => {
    return(
        <h1>{heading}</h1>
    )
}

const DisplayAnecdote = ({anecdotes, votes, selected}) => {
    return (
        <p>{anecdotes[selected]} has {votes[selected]} votes.</p>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
        // Creates a 0 filled index
        new Uint8Array(anecdotes.length)
    )

  const handleNextAnecdote = () => {
    let max = anecdotes.length
    let anecdote_index = Math.floor(Math.random() * max)

    setSelected(anecdote_index)
  }

  const handleVote = () => {
    const updated_votes = [...votes] 
    updated_votes[selected] += 1
    setVotes(updated_votes)
  }

  const getHighestVotedIndex = (votes) => {
    let max = 0
    let max_index = 0
    votes.forEach((value, index) => {
        if (value > max) {
            max = value
            max_index = index
        }
    })

    return max_index
  }

  return (
    <div>
      <Header heading="Anecdote of the day"/>
      <DisplayAnecdote anecdotes={anecdotes} votes={votes} selected={selected} />
      <div>
        <Button handleClick={handleNextAnecdote} text='Next Anecdote'/>
        <Button handleClick={handleVote} text='Vote'/>
      </div>
      <Header heading="Anecdote with most votes"/>
      <DisplayAnecdote anecdotes={anecdotes} votes={votes} selected={getHighestVotedIndex(votes)} />
    </div>
  )
}

export default App