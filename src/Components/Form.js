import React from 'react'
import '../Styles/form.css'

const Form = () => {
    return (
        <div className="container">
      <h4 className="heading">Assing Task</h4>
      <form className="form">
        <div className="row-1">
          <div className="input-container">
            <input id="name" type="text" placeholder="Name" required />
          </div>
          <div className="input-container">
            <input id="domain" type="text" placeholder="Domain" required />
          </div>
        </div>
        <div className="input-container">
          <input id="task" type="text" placeholder="Task" required />
        </div>
        <div className="input-container">
          <input
            id="description"
            type="text"
            placeholder="Description"
            required
          />
        </div>
        <div className="input-container">
          <input
            id="date"
            type="date"
            value=""
            placeholder="Last Date"
            required
          />
        </div>
      </form>
      <h4 style={{textDecoration: 'none'}} className="btn">Assign Task</h4>
    </div>
    )
}

export default Form
