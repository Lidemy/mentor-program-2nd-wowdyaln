import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'

class Nav extends Component {
  
  render() {
    // let {location} = this.props
    // console.log(location);
    return (

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/reactRouter/posts">
            SPA-Blog
          </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/reactRouter/posts">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reactRouter/postForm">
              send a Post
            </Link>
          </li>
        </ul>
      </nav>
     
    )
  }
}


export default  withRouter(Nav)