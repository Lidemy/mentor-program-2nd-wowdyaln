import React from 'react'
import ReactDOM from 'react-dom'
import {hot} from 'react-hot-loader'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>cool</h1>
      </div>
    )
  }
}

export default hot(module)(App)