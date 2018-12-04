import React, { Component } from 'react';
import axios from 'axios'

class PostForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: "",
      body: "",
      author: "Peter"  //todo: 暫時
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.contentChange = this.contentChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let { title, body } = this.state
      axios
      // .post("http://localhost:3001/posts", {
      .post("http://45.55.26.18:3310/posts", {
        title,
        body,
        author: "Peter"
      })
      .then(resp=> {
        // console.log("post 成功！");
        alert("新增成功 !")
        window.location = "/reactRouter/posts" //* redirect 到首頁
        
      })
      .catch(err=> {
        console.log(err);
      })
  }

  
  titleChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  
  contentChange(e) {
    this.setState({
      body: e.target.value
    })
  }


  render() {

    return (
      <div>
        <h1 className="mt-3">write a Post here : </h1>
        
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row mt-3">
            <label htmlFor="inputTitle3" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10">
              <input
                value={this.state.title}
                onChange={this.titleChange}
                type="text"
                className="form-control"
                id="inputTitle3"
                placeholder="post Title"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="content" className="col-sm-2 col-form-label">
              I want to say ...
            </label>
            <div className="col-sm-10">
              <textarea
                value={this.state.body}
                onChange={this.contentChange}
                type="text"
                className="form-control"
                id="content"
                placeholder="say something here"
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button
                type="submit"
                className="btn btn-primary"
              >
                SEND
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default PostForm
