import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Stat = ({type, amount}) => (
  <p>{type} {amount}</p>
)

const Average = ({all}) => {

  const totalPoints = all.good * 1 + all.bad * (-1)

  return (
    <p>average {totalPoints / all.total}</p>
  )
}

const Positive = ({all}) => (
  <p>Positive {(all.good / all.total) * 100} %</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: good + neutral + bad,
  }

  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>

      <h1>statistics</h1>
      <Stat type="good" amount={good} />
      <Stat type="neutral" amount={neutral} />
      <Stat type="bad" amount={bad} />
      <Stat type="all" amount={all.total} />

      <Average all={all} />
      <Positive all={all} />

    </div>
  )
}


export default App