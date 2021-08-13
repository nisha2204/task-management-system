import React from 'react'
import '../Styles/team-form.css'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
//import member from '../../server/models/member';


const ADD_TEAM = gql`
    mutation AddTeam(
        $Name: String!,
        $members: Int!,
        $project:String!
        $description: String!,
        ) {
        addTeam(
            Name: $Name,
            members:$members
            project: $project,
            description: $description,
           ) {
            _id
        }
    }
`;

const TeamForm = () => {
  let Name, members, project, task, description;
  const membersList = (e) => {
    const totalMembers = document.getElementById('total')
    const row = document.querySelector('.container .form .row-2')
    // console.log(row)

    totalMembers.addEventListener('input', ()=>{
    let members = parseInt(totalMembers.value)
    console.log(typeof(members))
    for(let j = 0; j< members; j++){
        const member = document.createElement("div")
        member.classList.add("member-field");
        member.innerHTML = `
        <div class="number">
        <h5 class="count">${j+1}</h5>
        </div>
        <div class="input-container">
        <input class="name" id="member-${j+1}" type="text" placeholder="Member-${j+1}" required />
        </div>
        `
        
        row.appendChild(member)
    }
    if(members == ""){
        row.innerHTML = ``
        // console.log(123)
    }
})
  }
    return (
       /* <div classNameName="container">
      <h4 classNameName="heading">Create Team</h4>
      <form classNameName="form">
        <div classNameName="row-1">
          <div classNameName="input-container">
            <input id="name" type="text" placeholder="Team Name" required />
          </div>
          <div classNameName="input-container">
            <input id="domain" type="text" placeholder="Total Members" required />
          </div>
        </div>
        <div classNameName="input-container">
          <input id="task" type="text" placeholder="Project Title" required />
        </div>
        <div classNameName="input-container">
          <input
            id="date"
            type="text"
            value=""
            placeholder="Task"
            required
          />
        </div>
        <div classNameName="input-container">
          <input
            id="description"
            type="text"
            placeholder="Description"
            required
          />
        </div>
      </form>
      <h4 style={{textDecoration: 'none'}} classNameName="btn">Create a Team</h4>
    </div>*/
    <Mutation mutation={ADD_TEAM} onCompleted={() => this.props.history.push('/')}>
    {(addTeam, { loading, error }) => (
      <div className="container">
      <h4 className="heading">Create Team</h4>
      <form className="form" onSubmit={e => {
                                e.preventDefault();
                                addTeam({ variables: {Name: Name.value, members: parseInt(members.value), project: project.value, description: description.value } });
                                Name.value = "";
                                members.value = "";
                                
                                project.value = "";
                                description.value = ""; 
                            }}>
        <div className="input-container">
          <input id="team-name" type="text" ref={node => {Name = node;}} placeholder="Team Name" required />
        </div>
        <div className="row-1">
          <div className="input-container">
            <input
              onChange={membersList}
              id="total"
              type="number"
              ref={node => {members = node;}}
              placeholder="Total Members"
              required
            />
          </div>
          <div className="input-container">
             {/* <input id="domain" type="text" placeholder="Domain" required />  */}
            <select name="Domain" id="domain">
              <option value="Website">Website</option>
              <option value="Android">Android</option>
              <option value="Multimedia">Multimedia</option>
              <option value="Flutter">Flutter</option>
              <option value="Content">Content</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        <div className="row-2">
          {/* <div className="member-field">
            <div className="number">
              <h5 className="count">1</h5>
            </div>
            <div className="input-container">
              <input className="name" type="text" placeholder="Member-1" required />
            </div>
          </div>  */}
        </div>
        <div className="input-container">
          <input id="task" type="text" placeholder="Task" ref={node => {project = node;}} required />
        </div>
        <div className="input-container">
          <textarea placeholder="Description" ref={node => {description = node;}} id="description"></textarea>
        </div>
         {/* <div className="input-container">
          <input
            id="date"
            type="date"
            value=""
            placeholder="Last Date"
            required
          />
        </div>  */}
        <button style={{textDecoration: 'none', border:'none'}} type="submit" className="btn">Assign Task</button>
      </form>
      
    </div>
      
//         <div classNameName="container">
//         <h4 classNameName="heading">Create Team</h4>
//         <form classNameName="form" onSubmit={e => {
//                         e.preventDefault();
//                         addTeam({ variables: {Name: Name.value, members:members.value, project: project.value, task: task.value, description: description.value} });
//                         Name.value = "";
//                         members.value=null;
//                         project.value = "";
//                         task.value = "";
//                         description.value = ""; 
//                     }}>
// <div classNameName="row-1">
//   <div classNameName="input-container">
//     <input id="Name" type="text" ref={node => {Name = node;}} placeholder="Team Name" required />
//   </div>
//   <div classNameName="input-container">
//     <input id="members" type="int" ref={node => {members = node;}} placeholder="Total members" required />
//   </div>
// </div>
// <div classNameName="input-container">
//   <input id="project" type="text" ref={node => {project = node;}} placeholder="Project Title" required />
// </div>
// <div classNameName="input-container">
//   <input id="task" type="text" ref={node => {task = node;}} placeholder="Task" required />
// </div>
// <div classNameName="input-container">
//   <input
//     id="description"
//     type="text"
//     ref={node => {description = node;}}
//     placeholder="Description"
//     required
//   />
// </div>


// <button style={{textDecoration: 'none', border:'none'}} type="submit" classNameName="btn">Assign Task</button>
// </form>

// {loading && <p>Loading...</p>}
// {error && <p>Error :( Please try again</p>}
// </div>
    )}
</Mutation>
    )
}

export default TeamForm
