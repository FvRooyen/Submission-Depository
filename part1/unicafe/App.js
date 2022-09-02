import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine =(props) => {
return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
)
}

const Statistics = (props) => {
  const good = props.values[0]
  const neutral = props.values[1]
  const bad = props.values [2]

  const all = () => good+neutral+bad

  if (all() > 0) {

  const averageScore = () => ((good*1)+(bad*-1)+(neutral*0))/all()

  const positive = () => good*100/all()

  return (
      <table>
        <tbody>
      <StatisticLine text="Good" value ={good}/>
      <StatisticLine text="Neutral" value ={neutral} />
      <StatisticLine text="Bad" value ={bad}/>
      <StatisticLine text="Total" value ={all()}/>
      <StatisticLine text="Average score" value ={averageScore()}/>
      <StatisticLine text="Percentage Positive" value ={positive()}/>
      </tbody>
      </table> 
  )
}

else {return (
  <div>No feedback given</div>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <table>
        <tbody>
          <tr>
      <td><Button handleClick={() => setGood(good + 1)} text="Good" /></td>
      <td><Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" /> </td>
      <td><Button handleClick={() => setBad(bad + 1)} text="Bad" /> </td>
          </tr>
        </tbody>
      </table> 
      <h2>Statistics</h2>
      <p></p>
      <Statistics values = {[good,neutral,bad]}/>
    </div>
  )
}

export default App