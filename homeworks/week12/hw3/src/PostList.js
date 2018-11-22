import React, { Component } from "react"
import axios from "axios"
import Post from "./Post"
import "./PostList.css"

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      post: null
    }

    this.showPost = this.showPost.bind(this)
    this.showPostList = this.showPostList.bind(this)
  }

  componentDidMount() {
    console.log("componentDidMount ! -> ajax request")
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        const postAry = response.data
        this.setState({ posts: postAry })
      })
      .catch(error => {
        console.log(error)
      })
  }

  showPost(e) {
    console.log("showPost ! -> ajax request")
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${e.target.id}`)
      .then(post => {
        this.setState({ post: post.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  showPostList() {
    this.setState({
      post: null
    })
  }

  render() {
    let { posts, post } = this.state

    if (post) {
      return (
        <div className="container mt-5 mb-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.showPostList}
          >
            Back
          </button>
          <Post info={post} />
        </div>
      )
    } else {
      return (
        <div className="container mt-5 mb-5">
          <ul className="list-group">
            {posts.map(post => {
              return (
                <li
                  className="list-group-item"
                  id={post.id}
                  key={post.id}
                  onClick={this.showPost}
                >
                  {post.id} .{post.title}
                </li>
              )
            })}
          </ul>
        </div>
      )
    }
  }
}

export default PostList
