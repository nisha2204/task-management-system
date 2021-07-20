import React from 'react'
import { useState } from 'react'
import Flag from '../Assets/flag.png'
import '../Styles/tasks.css'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_TASKS = gql`
  {
    tasks {
      _id
      Name
      domain
      task
      description
      deadline
    }
  }
`;

function len(tagline){
    let l
    l = tagline.lenght + 2
    l = l.toString()
    return l
}

// console.log(colors[Math.floor(Math.random() * colors.length)])


const Tasks = () => {

    function randomColor(){
        const colors = ['#e5a7e1','#a7d6e5','#cae5a7','#e5dfA7']
        return colors[Math.floor(Math.random() * colors.length)]
    }
    



    return (
        <Query pollInterval={500} query={GET_TASKS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
    
          return (
            <div className="tasks">
            <h2 className="heading">Tasks</h2>
            <div className="lists">
                {data.tasks.map((task,col=randomColor()) => (
                <div className="item" key={task._id}>
                    <h5 className="tagline" style={{color:`${randomColor()}`,backgroundColor:`${randomColor()}33`}}>{task.task}</h5>
                    <h5 className="description"style={{width:`len(task.description))}+'ch'`}}>{task.description}</h5>
                    <div className="bottom-section">
                        <div className="duration">
                        <img src={Flag} alt="flag" className="flag" />
                            <h5 className="date">{task.deadline}</h5>
                        </div>
                        <div className="profile">
                            <h5 className="name">{task.Name}</h5>
                            <p className="domain">{task.domain}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
          );
        }}
      </Query>
    )
}

export default Tasks
