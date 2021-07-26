import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
// import TaskInTeam from './TaskInTeam'
import '../Styles/teams.css'
//import member from '../../server/models/member';

const GET_TEAMS = gql`
  {
    teams {
      _id
      Name
      members
      project
      task
      description
    }
  }
`;


const GET_MEMBERS = gql`
    {
      members1 {
        _id
        Name
      }
    }
`;

const GET_MEMBERS1 = gql`
     {
        members {
            _id
            Name
        }
    }
`;


const Teams = () => {
  let teamid;

    const [ teams, setTeams ] = useState(
        [
            {
                teamId:1,
                teamName: "App Developer",
                projectName: "Music App",
                projectDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ab hic accusantium vitae unde quas tempora! Eaque neque officiis, doloremque laborum veniam non nam illo reprehenderit hic repellat quam quasi autem nemo consequatur dignissimos assumenda! Aut facere perferendis velit dolore eaque, necessitatibus sed similique! Quae odit quibusdam ut fugiat maiores.",
                teamMembers: 5,
                listId:1,
                list: [{
                    
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
                ]
            },
            {
                teamId:2,
                teamName: "App Developer",
                projectName: "Music App",
                projectDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ab hic accusantium vitae unde quas tempora! Eaque neque officiis, doloremque laborum veniam non nam illo reprehenderit hic repellat quam quasi autem nemo consequatur dignissimos assumenda! Aut facere perferendis velit dolore eaque, necessitatibus sed similique! Quae odit quibusdam ut fugiat maiores.",
                teamMembers: 5,
                listId:2,
                list: [{
                    
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
                ]
            }
        ]    
    )

   

    function randomColor(){
        const colors = ['#e5a7e1','#a7d6e5','#cae5a7','#e5dfA7']
          return colors[Math.floor(Math.random() * colors.length)]
        }
        
      function len(task){
        return `${task.length + 2}ch`
        }
  
      const  markAsComplete = (e)=>{
        if (e.target.style.fill != '#6EFF3A'){
          e.target.style.fill = '#6EFF3A'
        }
      }  
  
      const deleteTask = (e) => {
        e.nativeEvent.path[5].style.display = 'none'
        console.log(e)
      }

      const showTask = (e) => {
          console.log(e)
        console.log(e.target.id)
        const id = e.target.id
        const list = document.getElementById(`${id}`)
        if (list.getAttribute('style') == 'display: flex;') {
            list.setAttribute('style','display: none;') 
        }
        else {
            list.setAttribute('style','display: flex;') 
        }
        console.log(list.getAttribute('style'))
      }

      
    return (
      <Query pollInterval={500} query={GET_TEAMS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return(
          <div className="teams">
          {data.teams.map((team) => (
              <div className="team" >
                {console.log(team._id)}
              <h4 className="team-name">{team.Name}</h4>
              <h5 className="project-name">{team.project}</h5>
              <p className="project-description">{team.description}</p>
              <div className="team-members">
                <h5 className="total-members">
                  Total Members <span className="number">{team.members}</span>
                </h5>
                <div className="add-btn"
                >
                  <Link style={{textDecoration: 'none'}} to='/taskinteam'>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM18 13H13V18H11V13H6V11H11V6H13V11H18V13Z"
                      fill="#BAC8DF"
                    />
                  </svg></Link>
                </div>
              </div>
            </div>
          ))}
      </div>)
        }}</Query>   
    )
}

export default Teams



/*<div className="list" style={{display:'none'}} id={team.listId}>
                  {team.list.map((item,{col = randomColor()}) => (
                <div className="item">
                  <div className="top-section">
                    <h5 className="tagline" style={{color:`${col}`,backgroundColor:`${col}33`, width:`${len(item.tagline)}`}}>{item.tagline}</h5>
                    <div className="options">
            <div className="edit">
              <svg
                className="editOption"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M19.769 9.923L7.127 22.562L0 24L1.438 16.872L14.079 4.232L19.769 9.923V9.923ZM21.183 8.509L24 5.689L18.309 0L15.493 2.817L21.183 8.509V8.509Z"
                    fill="#bac8df"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="completed">
              <svg
                className="completedOption"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  onClick= { markAsComplete }
                  className="completedOptionPath"
                  d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM10.75 17.292L6.25 12.928L8.107 11.07L10.75 13.576L16.393 7.792L18.25 9.649L10.75 17.292Z"
                />
              </svg>
            </div>
            <div className="delete">
              <svg
              onClick = {deleteTask}
                className="deleteOption"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z"
                  fill="#FF3A3A"
                />
              </svg>
            </div>
          </div>
                  </div>
                  <h5 className="description">
                    {item.description}
                  </h5>
                  <div className="bottom-section">
                    <div className="duration">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 24H2V0H4V24ZM22 2.613C22 2.613 20.379 4.043 18.246 4.043C14.886 4.043 14.81 1.148 10.909 1.148C8.801 1.148 6.834 2.128 6 2.842V14.927C7.184 14.108 8.979 13.246 10.923 13.246C14.607 13.246 15.124 16 18.407 16C20.529 16 22 14.641 22 14.641V2.613V2.613Z"
                          fill="#BAC8DF"
                        />
                      </svg>
                      <h5 className="date">{item.date}</h5>
                    </div>
                    <div className="profile">
                      <h5 className="name">{item.name}</h5>
                      <p className="domain">{item.domain}</p>
                    </div>
                  </div>
                </div>
                  ))}
                
              </div>
              <div className="drop-down-btn">*/
/*
 {team.list.map((item,{col = randomColor()}) => (
                  <div className="item">
                    <div className="top-section">
                      <h5 className="tagline" style={{color:`${col}`,backgroundColor:`${col}33`, width:`${len(item.tagline)}`}}>{item.tagline}</h5>
                      <div className="options">
              <div className="edit">
                <svg
                  className="editOption"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M19.769 9.923L7.127 22.562L0 24L1.438 16.872L14.079 4.232L19.769 9.923V9.923ZM21.183 8.509L24 5.689L18.309 0L15.493 2.817L21.183 8.509V8.509Z"
                      fill="#bac8df"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="completed">
                <svg
                  className="completedOption"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                    onClick= { markAsComplete }
                    className="completedOptionPath"
                    d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM10.75 17.292L6.25 12.928L8.107 11.07L10.75 13.576L16.393 7.792L18.25 9.649L10.75 17.292Z"
                  />
                </svg>
              </div>
              <div className="delete">
                <svg
                onClick = {deleteTask}
                  className="deleteOption"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z"
                    fill="#FF3A3A"
                  />
                </svg>
              </div>
            </div>
                    </div>
                    <h5 className="description">
                      
                    </h5>
                    <div className="bottom-section">
                      <div className="duration">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 24H2V0H4V24ZM22 2.613C22 2.613 20.379 4.043 18.246 4.043C14.886 4.043 14.81 1.148 10.909 1.148C8.801 1.148 6.834 2.128 6 2.842V14.927C7.184 14.108 8.979 13.246 10.923 13.246C14.607 13.246 15.124 16 18.407 16C20.529 16 22 14.641 22 14.641V2.613V2.613Z"
                            fill="#BAC8DF"
                          />
                        </svg>
                        
                      </div>
                      <div className="profile">
                        
                      </div>
                    </div>
                  </div>
                    ))}*/