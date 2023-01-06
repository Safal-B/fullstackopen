import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Header = ({heading}) => <h1>{heading}</h1>

const returnNumericFeedback = (feedbacks) => {
  let numeric_feedbacks = [ ] 

  for (const property in feedbacks) {
    for (let i = 0; i < feedbacks[property]; i++) {
      if (property === 'good') {
        numeric_feedbacks = numeric_feedbacks.concat(1)
      } else if (property === 'neutral') {
        numeric_feedbacks = numeric_feedbacks.concat(0)
      } else {
        numeric_feedbacks = numeric_feedbacks.concat(-1)
      }
    }
  }

  return (numeric_feedbacks)
}

const Average = ({feedbacks}) => {
  let numeric_feedbacks = returnNumericFeedback(feedbacks) 
  let total = 0
  let average = 0

  if (numeric_feedbacks.length > 0) {
    numeric_feedbacks.forEach(value => total += value)
    average = total / numeric_feedbacks.length
  }

  return (
    <StatisticsLine text='Average' value={average} />
  )
}

const PositivePercentage = ({feedbacks}) => {
  let numeric_feedbacks = returnNumericFeedback(feedbacks) 

  let total_positives = 0
  let positives_percentage = 0
  let length = numeric_feedbacks.length

  if (length > 0) {
    numeric_feedbacks.forEach(value => {
      if (value === 1) {
        total_positives += 1
      }
    })

    positives_percentage = `${(total_positives/length) * 100}%`
  }

  return (
    <StatisticsLine text='Positive Percent' value={positives_percentage} />
  )
}

const DisplayStatistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0){
    return (
      <div>
        <p>No feedback given yet.</p>
      </div>
    )
  }

  const feedbacks = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return(
    <div>
      <Header heading='Statistics' />
      <table>
        <tbody>
          <StatisticsLine text="good" value={feedbacks.good} />
          <StatisticsLine text="neutral" value={feedbacks.neutral} />
          <StatisticsLine text="bad" value={feedbacks.bad} />
          <Average feedbacks={feedbacks} />
          <PositivePercentage feedbacks={feedbacks} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header heading='Give Feedback' />
      <Button handleClick={handleGoodFeedback} text='Good'/>
      <Button handleClick={handleNeutralFeedback} text='Neutral'/>
      <Button handleClick={handleBadFeedback} text='Bad'/>
      <DisplayStatistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App