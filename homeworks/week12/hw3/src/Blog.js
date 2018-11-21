import React, { Component } from "react"
import PostList from "./PostList"
import About from "./About"

class Blog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: "home"
    }

    this.handleTab = this.handleTab.bind(this)
  }

  handleTab(e) {
    e.preventDefault()
    this.setState({
      tab: e.target.name
    })
  }

  render() {
    let { tab } = this.state

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a
            className="navbar-brand"
            onClick={this.handleTab}
            name="home"
            href="xxx"
          >
            SPA-Blog
          </a>
          <ul className="navbar-nav">
            <li className={"nav-item " + (tab === "home" ? "active" : "")}>
              <a
                className="nav-link"
                onClick={this.handleTab}
                name="home"
                href="xxx"
              >
                Home
              </a>
            </li>
            <li className={"nav-item " + (tab === "about" ? "active" : "")}>
              <a
                className="nav-link"
                onClick={this.handleTab}
                name="about"
                href="xxx"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
        <div className="container">
          {tab === "home" && <PostList />}
          {tab === "about" && <About />}
        </div>
      </div>
    )
  }
}

export default Blog
