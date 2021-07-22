import React from 'react'
import '../Styles/form.css'

const TeamForm = () => {
    return (
        <div className="container">
      <h4 className="heading">Create Team</h4>
      <form className="form">
        <div className="row-1">
          <div className="input-container">
            <input id="name" type="text" placeholder="Team Name" required />
          </div>
          <div className="input-container">
            <input id="domain" type="text" placeholder="Total Members" required />
          </div>
        </div>
        <div className="input-container">
          <input id="task" type="text" placeholder="Project Title" required />
        </div>
        <div className="input-container">
          <input
            id="date"
            type="text"
            value=""
            placeholder="Task"
            required
          />
        </div>
        <div className="input-container">
          <input
            id="description"
            type="text"
            placeholder="Description"
            required
          />
        </div>
      </form>
      <h4 style={{textDecoration: 'none'}} className="btn">Create a Team</h4>
    </div>
    )
}

export default TeamForm
