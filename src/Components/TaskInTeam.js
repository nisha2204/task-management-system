import React from 'react'
import { useState } from 'react'
import '../Styles/taskinteam.css'

const TaskInTeam = () => {

    return (
        <div className="overlay">
                <div className="container">
      <h4 className="heading">Team Name</h4>
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
            placeholder="Deadline"
            required
          />
        </div>
      </form>
      <h4 style={{textDecoration: 'none'}} className="btn">Assign Task</h4>
      </div>
        </div>
    )
}

export default TaskInTeam
