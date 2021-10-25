import React, { useState } from 'react'

const App2 = () => {
    // prettier-ignore
    const anecdotes = [
          'If it hurts, do it more often',
          'Adding manpower to a late software project makes it later!',
          'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
          'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
          'Premature optimization is the root of all evil.',
          'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
          'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
     ]

    const [selected, setSelected] = useState(0)
    const [votesObj, setVotesObj] = useState({})

    const clickHandler = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length)

        setSelected((p) => randomIndex)
    }

    const voteHandler = () => {
        if (!votesObj[selected]) {
            votesObj[selected] = 0
        }

        setVotesObj({
            ...votesObj,
            [selected]: votesObj[selected] + 1,
        })
    }

    const maxObjValue = (someObj) => {
        let arr = Object.values(someObj)
        let max = Math.max(...arr)
        return max
    }
    
    return (
        <center>
            <div>
                <button onClick={clickHandler}>Next Quote</button>
                <button onClick={voteHandler}>Vote</button>
                <div>{anecdotes[selected]}</div>
                <div>votes: {votesObj[selected] ? votesObj[selected] : '0'} </div>
            </div>
            <br />
            <br />
            <h2>Highest Rated:</h2>
            <div>{Object.keys(votesObj).length !== 0 ? anecdotes[Object.keys(votesObj).reduce((a, b) => votesObj[a] > votesObj[b] ? a : b)] : null}</div>
        </center>
    )
}

export default App2
