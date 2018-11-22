import React from 'react'
import TodoForm from './TodoForm'
import {hot} from 'react-hot-loader'


class App extends React.Component {
  render () {
    return (
      <div className="container col-lg-10 col-md-10">
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h4 className="card-title">To Do List ( React )</h4>
            <p className="card-text">try it !</p>
          </div>
        </div>
  
        <TodoForm />
  
      </div> 
    )
  }
}

export default hot(module)(App)