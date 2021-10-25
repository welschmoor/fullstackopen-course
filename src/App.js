import React, { useState } from "react"




function Button(props) {
  return (
    <button type="text" onClick={props.onClick}>
      {props.children}
    </button>
  )
}

const Statistics = ({values}) => {
  console.log(values)
  const {good, neutral ,bad} = values

  const positiveRating = (good / (good + neutral + bad))

  if ((good + neutral + bad) === 0) return <div>No feedback yet</div>

  return(
    <>
    <div>Total Votes: {good + neutral + bad}</div>
    <div>Average: {((good + neutral + bad) / 3).toFixed(2)}</div>
    <div>Positive Rating: {positiveRating? (positiveRating * 100).toFixed(2) : "0"}%</div>
    </>
  )
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <center>
      <div className="App">
        <h2>Feedback App</h2>
        <header className="App-header">
          <Button onClick={() => setGood((p) => p + 1)}>good</Button>
          <Button onClick={() => setNeutral((p) => p + 1)}>neutral</Button>
          <Button onClick={() => setBad((p) => p + 1)}>bad</Button>
        </header>
        <br />
        <h2>Statistics</h2>

        <Statistics values={{good, neutral, bad}} />
        <br />
      </div>
    </center>
  )
}

export default App
