import React from "react"

export default function Square(props) {
  let { id, handleClick, value, winner, series } = props

  if (!value) {
    return <button className="square" onClick={handleClick} />
  } else {
    if (winner && series.includes(id)) {
      return (
        <button className="square win" onClick={handleClick}>
          {value}
        </button>
      )
    } else {
      return (
        <button className="square placed" onClick={handleClick}>
          {value}
        </button>
      )
    }
  }
}
