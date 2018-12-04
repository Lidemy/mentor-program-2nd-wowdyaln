import React, { Component } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom'
import Loading from "./Loading"


class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: {},
      loading: false
    }
  }

  componentDidMount() {
    let postId = this.props.match.params.id
    console.log("componentDidMount ! -> ajax request")
    axios
      // .get(`http://localhost:3001/posts/${postId}`)
      .get(`http://45.55.26.18:3310/posts/${postId}`)
      .then(post => {
        this.setState({ 
          post: post.data,
          loading: true
         })

      })
      .catch(error => {
        console.log(error)
      })
  }
  
  render() {
    let { author, id, title, body } = this.state.post
    let { loading } = this.state

    if (!loading) {
      return (
        <Loading type="bubbles" color="black"/>
      )
    }

    return ( 
      <div>
        <Link to="/reactRouter/posts">
          <button className="btn btn-primary mt-5">
              Back
          </button>
        </Link>
  
        <div className="card text-white bg-info mb-3 mt-5">
          <div className="card-header">Author {author} / Post id : {id}</div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
          </div>
        </div>
      </div>
    )
  }
}
 
export default Post;