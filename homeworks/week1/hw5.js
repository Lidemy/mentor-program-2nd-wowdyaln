function join(array, concatStr) {
  let newStr = ""
  let index = 0

  for (let i=1; i <= array.length*2-1; i++){
    if (i%2 !== 0){
      newStr += array[index]
      index++
    }
    if (i%2 === 0){
      newStr += concatStr
    }
  }
  return newStr
}

function repeat(str, times) {
  let newStr = ""
  for ( let i=0; i < times; i++){
    newStr += str
  }
  return newStr
}
