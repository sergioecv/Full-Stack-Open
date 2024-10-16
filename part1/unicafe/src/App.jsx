import { useState } from 'react'

const Display = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (  <button onClick={handleClick}>{text}</button>)

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
    return (
      <p> No feedback has been given</p>
    )
  }
  const total = good+neutral+bad

  const average = (good - bad)/total

  const positive = good / total * 100

  return (
    <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={total} />
          <StatisticLine text={'average'} value={average} />
          <StatisticLine text={'positive'} value={positive} />
        </tbody>
      </table>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive'){
    value = value.toString() + ' %'
  }
  return (
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodFeedback = () => {
    setGood(good+1)
  }
  const setNeutralFeedback = () => {
    setNeutral(neutral+1)
  }
  const setBadFeedback = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <Display text='Give feedback' />
      <Button handleClick={setGoodFeedback} text='good' />
      <Button handleClick={setNeutralFeedback} text='neutral' />
      <Button handleClick={setBadFeedback} text='bad' />      

      <Display text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
