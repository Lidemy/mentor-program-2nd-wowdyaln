import React from "react"

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { todo, isDone, markFinish, removeTodo } = this.props
    if (isDone) {
      return (
        <li className="list-group-item d-flex justify-content-between align-items-center bg-light">
          <h5><del>{todo.text}</del></h5>
          <p className="mr-auto" />
          <button
            onClick={removeTodo}
            type="button"
            className="btn__delete btn p-2 mr-3 btn-outline-danger"
          >
            DELETE
          </button>
          <button
            onClick={markFinish}
            type="button"
            className="btn__finish btn p-2 btn-outline-warning"
          >
            REDO
          </button>
        </li>
      )
    } else {
      return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <h5>{todo.text}</h5>
          <p className="mr-auto" />
          <button
            onClick={removeTodo}
            type="button"
            className="btn__delete btn btn-outline-secondary p-2 mr-3"
          >
            DELETE
          </button>
          <button
            onClick={markFinish}
            type="button"
            className="btn__finish btn btn-outline-success p-2"
          >
            Finish
          </button>
        </li>
      )
    }
  }
}
