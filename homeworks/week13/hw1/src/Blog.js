import React, { Component } from "react"
import Nav from "./Nav"
import PostList from "./PostList"
import PostForm from "./PostForm"
import Post from "./Post"
import {BrowserRouter as Router, Route } from 'react-router-dom'

class Blog extends Component {
  constructor(props) {
    super(props)

    this.handleTab = this.handleTab.bind(this)
  }

  handleTab(e) {
    e.preventDefault()
    this.setState({
      tab: e.target.name
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />

          <div className="container">
            <Route exact path="/reactRouter/posts" component={PostList}/> 
            <Route exact path="/reactRouter/postForm" component={PostForm}/>
            <Route exact path="/reactRouter/posts/:id" component={Post}/>
          </div>

        </div>
      </Router>
    )
  }
}

export default Blog
