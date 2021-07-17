import React from 'react'
import { useState } from 'react'
import Flag from '../Assets/flag.png'
import '../Styles/tasks.css'

function len(tagline){
    let l
    l = tagline.lenght + 2
    l = l.toString()
    return l
}

// console.log(colors[Math.floor(Math.random() * colors.length)])



const Tasks = () => {
    const [tasks, setTasks]= useState([
        {
            id:1,
            tagline:'Copyright',
            description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, quaerat?',
            date:'24 Nov',
            name:'Ross',
            domain:'Web Developer'
        },
        {
            id:2,
            tagline:'illustration',
            description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, quaerat?',
            date:'11 Jul',
            name:'Monica',
            domain:'Content'
        },
        {
            id:3,
            tagline:'Timer App',
            description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, quaerat?',
            date:'5 Dec',
            name:'Joey',
            domain:'App Developer'
        },
        {
            id:4,
            tagline:'Quiz',
            description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, quaerat?',
            date:'14 May',
            name:'Racheal',
            domain:'Content'
        }
    ])

    function randomColor(){
        const colors = ['#e5a7e1','#a7d6e5','#cae5a7','#e5dfA7']
        return colors[Math.floor(Math.random() * colors.length)]
    }
    tasks.map((task)=>{
        task.color = `${randomColor()}`
    })



    return (
        <div className="tasks">
            <h2 className="heading">Tasks</h2>
            <div className="lists">
                {tasks.map((task,col=randomColor()) => (
                <div className="item" key={task.id}>
                    <h5 className="tagline" style={{color:`${task.color}`,backgroundColor:`${task.color}33`}}>{task.tagline}</h5>
                    <h5 className="description"style={{width:`len(task.description))}+'ch'`}}>{task.description}</h5>
                    <div className="bottom-section">
                        <div className="duration">
                            <img src={Flag} alt="flag" className="flag" />
                            <h5 className="date">{task.date}</h5>
                        </div>
                        <div className="profile">
                            <h5 className="name">{task.name}</h5>
                            <p className="domain">{task.domain}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    )
}

export default Tasks
