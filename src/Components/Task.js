import React from 'react'

const Task = ( { task} ) => {
    return (
        <div className="item">
            <div className="text">
                <h5>{task.name}</h5>
                <p>{task.message}</p>
            </div>
            <div class="time-container"></div>
        </div>
    )
}

export default Task
