import React from "react"
import Board from "./Board"
import winnerIs from "./winnerIs"

const initialState = {
  history: [
    {
      squares: Array(19 * 19).fill(null)
    }
  ],
  xIsNext: true,
  stepNumber: 0,
  winner: null,
  series: null
}

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState

    this.reset = this.reset.bind(this)
  }

  reset() {
    this.setState(initialState)
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winner: null,
      series: null
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]

    const sqs = current.squares.slice() // 使用 .slice() 來建立複本，不直接修改 Board 的 this.state.squares
    // 需要忽略點擊的條件：
    if (sqs[i] || winnerIs(sqs)) return

    sqs[i] = this.state.xIsNext ? "X" : "O"
    this.setState({
      history: history.concat([
        {
          squares: sqs
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
    // * winner : [symbol, series]
    if (winnerIs(sqs)) {
      let [symbol, series] = winnerIs(sqs)
      this.setState({
        winner: symbol,
        series: series
      })
    }
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    // * winner : [symbol, series]
    const winner = winnerIs(current.squares)[0]
    const moves = history.map((step, index) => {
      const desc = index ? "go to move #" + index : "go to start"

      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `${winner} Wins !!`
    } else {
      status = `Next player is : ${this.state.xIsNext ? "X" : "O"}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            xIsNext={this.state.xIsNext}
            winner={this.state.winner}
            series={this.state.series}
            onClick={i => {
              this.handleClick(i)
            }}
          />
          <br />
          <button onClick={this.reset}>
            <h2>reset</h2>
          </button>
        </div>
        <div className="game-info">
          <h1>{status}</h1>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}
