export default function winnerIs(squares) {
  const fullness = squares
    .map((ele, index) => {
      return [ele, index]
    })
    .filter(ele => {
      return ele[0] !== null
    })

  function winner(squareInfos, symbol) {
    let placed = squareInfos.filter(ele => ele[0] === symbol)
    let positions = placed.map(ele => ele[1])

    if (positions.length < 5) return false

    let axisX = positions.map(id => [id, id + 1, id + 2, id + 3, id + 4])
    let axisY = positions.map(id => [
      id,
      id + 19,
      id + 19 * 2,
      id + 19 * 3,
      id + 19 * 4
    ])
    let axisXY = positions.map(id => [
      id,
      id + 18,
      id + 18 * 2,
      id + 18 * 3,
      id + 18 * 4
    ])
    let axisYX = positions.map(id => [
      id,
      id + 20,
      id + 20 * 2,
      id + 20 * 3,
      id + 20 * 4
    ])

    let axes = [axisX, axisY, axisXY, axisYX]
    let result = false
    let series

    axes.forEach(axis => {
      axis.forEach(ary => {
        if (ary.every(val => positions.includes(val))) {
          result = true
          series = ary
        }
      })
    })
    return result ? [symbol, series] : result
  }

  let white = winner(fullness, "O")
  let black = winner(fullness, "X")

  return white ? white : black
}
