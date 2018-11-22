import React from 'react'

function Post(props) {
  let { userId, id, title, body} = props.info

  return ( 
    <div className="card text-white bg-info mb-3 mt-5">
      <div className="card-header">Author {userId} / Post id : {id}</div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
      </div>
    </div>
  )
}
 
export default Post;