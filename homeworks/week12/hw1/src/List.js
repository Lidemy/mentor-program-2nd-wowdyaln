import React from "react"
import Button from "./Button"

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDone: false
    }

    this.handleClickFinish = this.handleClickFinish.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleClickFinish() {
    if (this.state.isDone) {
      this.setState({
        isDone: false
      })
    } else {
      this.setState({
        isDone: true
      })
    }
  }

  handleDelete() {
    let { todo, removeTodo } = this.props
    removeTodo(todo)
  }

  render() {
    const { todo } = this.props
    return (
      <Button
        todo={todo}
        isDone={this.state.isDone}
        markFinish={this.handleClickFinish}
        removeTodo={this.handleDelete}
      />
    )
  }
}
