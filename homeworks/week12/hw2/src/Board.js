import React from "react"
import Square from "./Square.js"

export default class Board extends React.Component {
  constructor(props) {
    super(props)

    this.renderSquare = this.renderSquare.bind(this)
  }

  renderSquare(i) {
    let { squares, winner, series, onClick } = this.props
    return (
      <Square
        key={i}
        id={i}
        handleClick={() => onClick(i)}
        value={squares[i]}
        winner={winner}
        series={series}
      />
    )
  }

  render() {
    let yIndex = []
    for (let i = 0; i < 19; i++) {
      yIndex.push(i)
    }

    let xIndex = []
    for (let i = 0; i < 19; i++) {
      xIndex.push(i)
    }

    return (
      <div>
        {yIndex.map(y => {
          return (
            <div key={y} className="board-row">
              {xIndex.map(x => {
                return this.renderSquare(y * 19 + x)
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
