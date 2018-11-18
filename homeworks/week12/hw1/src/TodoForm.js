import React from "react"
import List from "./List"

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [{
        text: "week12: homework 1",
        id: 0
      }],
      value: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleClickDelete = this.handleClickDelete.bind(this)
    this.listId = 1
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleKeyUp(e) {
    if (e.which === 13 && this.state.value !== "") {
      e.target.value = ""
      this.setState({
        todos: [
          ...this.state.todos,
          {
            text: this.state.value,
            id: this.listId++
          }
        ],
        value: ""
      })
    }
  }

  handleClickDelete(todo) {
    this.setState({
      todos: this.state.todos.filter(item => item.id !== todo.id)
    })
  }

  render() {
    return [
      <div className="form-group" key="form">
        <label
          className="col-form-label col-form-label-lg"
          htmlFor="inputLarge"
        />
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="typing here and press Enter."
          id="inputLarge"
          required
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
      </div>,

      <div key="list">
        <ul className="list-group">
          {this.state.todos.map(item => (
            <List
              key={item.id}
              todo={item}
              removeTodo={this.handleClickDelete}
            />
          ))}
        </ul>
      </div>
    ]
  }
}
