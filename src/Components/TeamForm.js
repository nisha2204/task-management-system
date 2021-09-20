import React from 'react'
import '../Styles/team-form.css'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
//import member from '../../server/models/member';


const ADD_TEAM = gql`
    mutation AddTeam(
        $Name: String!,
        $domain: String!,
        $project:String!
        $description: String!,
        ) {
        addTeam(
            Name: $Name,
            domain:$domain
            project: $project,
            description: $description,
           ) {
            _id
        }
    }
`;

const TeamForm = () => {
  let Name, domain, project, task, description;
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
      
    <Mutation mutation={ADD_TEAM} >
    {(addTeam, { loading, error }) => (
      <div className="container">
      <h4 className="heading">Create Team</h4>
      <form className="form" onSubmit={e => {
                                e.preventDefault();
                                addTeam({ variables: {Name: Name.value, domain: domain.value, project: project.value, description: description.value } });
                                Name.value = "";
                                domain.value = "";
                                project.value = "";
                                description.value = ""; 
                            }}>
        
        <div className="row-1">
        <div className="input-container">
          <input id="team-name" type="text" ref={node => {Name = node;}} placeholder="Team Name" required />
        </div>
          <div className="input-container">
             {/* <input id="domain" type="text" placeholder="Domain" required />  */}
            <select name="Domain" id="domain" ref={node => {domain = node;}}  required>
              <option value="Website">Website</option>
              <option value="Android">Android</option>
              <option value="Multimedia">Multimedia</option>
              <option value="Flutter">Flutter</option>
              <option value="Content">Content</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        
        <div className="input-container">
          <input id="task" type="text" placeholder="Project Name" ref={node => {project = node;}} required />
        </div>
        <div className="input-container">
          <textarea placeholder="Description" ref={node => {description = node;}} id="description"></textarea>
        </div>
    
        <button style={{textDecoration: 'none', border:'none'}} type="submit" className="btn">Create Team</button>
      </form>
      
    </div>
      

    )}
</Mutation>
    )
}

export default TeamForm
