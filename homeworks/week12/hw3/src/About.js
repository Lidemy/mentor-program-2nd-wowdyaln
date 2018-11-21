import React from "react"

function About() {
  return (
    <div>
      <h1 className="mt-3">Hello , this is Roro</h1>
      <form>
        <div className="form-group row mt-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail3"
              placeholder="Your Email"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="content" className="col-sm-2 col-form-label">
            I want to say ...
          </label>
          <div className="col-sm-10">
            <textarea
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
              onClick={e => {
                e.preventDefault()
                alert("sorry, this is just a sample page...")
              }}
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

export default About
