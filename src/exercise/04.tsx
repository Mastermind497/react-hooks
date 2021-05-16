// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from '../tic-tac-toe-utils'
import type {Squares} from '../tic-tac-toe-utils'
import {useLocalStorageState} from '../utils'

function Board({squares, onClick}) {
  function renderSquare(i: number) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function App() {
  const [moves, setMoves] = useLocalStorageState<Array<Squares>>(
    'tic-tac-toe:history',
    [Array(9).fill(null)],
  )
  const [current, setCurrent] = useLocalStorageState<number>(
    'tic-tac-toe:current',
    0,
  )

  const currentSquares = moves[current]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(index: number) {
    if (winner || moves[current][index]) {
      return
    }
    const squaresCopy = [...moves[current]]
    squaresCopy[index] = nextValue
    moves.slice(0, current + 1)
    setCurrent(current + 1)
    setMoves([...moves, squaresCopy])
  }

  function restart() {
    setCurrent(0)
    setMoves([Array(9).fill(null)])
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={moves[current]} onClick={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <div className="history"></div>
      </div>
    </div>
  )
}

export default App

/*
eslint
  @typescript-eslint/no-unused-vars: "off",
*/
