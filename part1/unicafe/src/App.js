import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <p>{text} {value}</p>
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

const Statistics = ({stats}) => {
  if (stats.total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{stats.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{stats.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{stats.bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{stats.total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(stats.good + stats.bad * -1) / stats.total}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(stats.good / stats.total) * 100} %</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

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
      <Statistics stats={all}/>

    </div>
  )
}


export default App