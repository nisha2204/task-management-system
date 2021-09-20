import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
// import TaskInTeam from './TaskInTeam'
import '../Styles/teams.css'
import avatar_1 from '../Assets/Group.png'
import avatar_2 from '../Assets/Group-1.png'
import avatar_3 from '../Assets/Group-2.png'
import avatar_4 from '../Assets/Group-3.png'
import avatar_5 from '../Assets/Group-4.png'
import avatar_6 from '../Assets/Group-5.png'
import avatar_7 from '../Assets/Group-6.png'
import avatar_8 from '../Assets/Group-7.png'
//import member from '../../server/models/member';

const GET_TEAMS = gql`
{
  teams{
    _id,
  Name,
  domain,
  member {
    Mname
    Emailid
  },
  project,
  description 
}
}
`;

const DELETE_TEAM = gql`
  mutation removeTeam($id: String!) {
    removeTeam(id:$id) {
      _id
    }
  }
`;

const DELETE_MEMBER = gql`
  mutation removeMember($id: String!, $Emailid: String!) {
    removeMember(id:$id, Emailid:$Emailid) {
      _id
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

    function randomAvatar(){
        const avatars = [avatar_1,avatar_2,avatar_3,avatar_4,avatar_5,avatar_6,avatar_7,avatar_8]
          return avatars[Math.floor(Math.random() * avatars.length)]
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

      
      
    return (
    <Query pollInterval={500} query={GET_TEAMS}>
      {({ loading, error, data }) => {
      if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
         return(
          <div className="teams">
            <h2 className="heading">Teams</h2>
            <div className="list">
          {data.teams.map((team, {col = randomColor()}) => (
            // <div className="teams">
              <div className="item" >
                <div className="head">
                  <h4 className="team-name">{team.Name}</h4>
                  <p className="team-members">Total Members: {team.members}</p>
                </div>
                <div className="mid">
                  <div className="top">
                    <h5 className="project-name" style={{color:`${col}`,backgroundColor:`${col}22`, width:`${len(team.project)}`}}>{team.project}</h5>
                    <div className="options">

                      <div className="edit" >

                      <Link to={`/editTeam/${team._id}`} className="btn btn-success"> <svg
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
                </svg></Link>&nbsp;
                      </div>
                      <div className="edit" >
              <Link to={`/addMember/${team._id}`} className="btn btn-success">
              <svg className="editOption"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
<path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM18 13H13V18H11V13H6V11H11V6H13V11H18V13Z" fill="#BAC8DF"/>
</svg>
</Link>&nbsp;
                
              </div>
                      <Mutation mutation={DELETE_TEAM} key={team._id} >
                                    {(removeTeam, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeTeam({ variables: { id: team._id } });
                                                }}>
                                                <button style={{background:'none',outline:'none',border:'none'}}  image url="http://www.w3.org/2000/svg" type="submit"><svg className="deleteOption"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z" fill="#FF3A3A"/>
                </svg></button>
                                            </form>
                                        
                                        </div>
                                    )}
                                </Mutation>
                    </div>
                  </div>
                  <p className="description">
                  {team.description}
                  </p>
                </div>
                <div className="bottom">
                  <h5 className="tagline">Members</h5>
                  <div className="members">
                    {team.member.map((item, {avatar = randomAvatar()}) => ( 
                    <div className="member">
                      <div className="img-container">
                        <img src={avatar} alt="member" />
                      </div>
                      <div className="info">
                        <h5 className="name">{item.Mname}</h5>
                        <p className="domain">{item.Emailid}</p>
                      </div>
                      <Mutation mutation={DELETE_MEMBER} key={team._id} >
                                    {(removeMember, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeMember({ variables: { id: team._id, Emailid: item.Emailid } });
                                                }}>
                                                <button style={{background:'none',outline:'none',border:'none'}}  image url="http://www.w3.org/2000/svg" type="submit"><svg className="deleteOption"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z" fill="#FF3A3A"/>
                </svg></button>
                                            </form>
                                        
                                        </div>
                                    )}
                                </Mutation>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
              
              
            ))}
            </div>
      </div>)
        }}</Query>   
     )
}

export default Teams