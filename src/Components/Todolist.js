import React from 'react'
import Task from './Task'


const Todolist = ({tasks}) => {

    return (
        <div className="todolist">
           <h3>To Do List</h3>
            <div className="list">
               {tasks.map((task) => (
                   <Task key={task.id} task={task}/>
               ))}
            </div>
        </div>
    )
}

export default Todolist
