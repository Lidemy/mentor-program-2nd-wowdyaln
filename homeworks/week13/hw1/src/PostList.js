import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import "./PostList.css"
import Loading from "./Loading"

class PostList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      loading: false
    }
  }

  componentDidMount() {
    console.log("componentDidMount ! -> ajax request")
    axios
      .get("http://45.55.26.18:3310/posts?_sort=id&_order=DESC")
      // .get("http://localhost:3001/posts?_sort=id&_order=DESC")
      .then(response => {
        // console.log(response.data);
        const postAry = response.data
        this.setState({ 
          posts: postAry,
          loading: true
         })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    let { posts, loading } = this.state

    if (!loading) {
      return (
        <Loading type="cylon" color="black"/>
      )
    }

    return (
      <div className="container mt-5 mb-5">
        <ul className="list-group">
          {posts.map(post => {
            return (
              <Link 
                to={`/reactRouter/posts/${post.id}`}
                className="list-group-item"
                key={post.id}
              >
                {post.id} .{post.title}
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default PostList
