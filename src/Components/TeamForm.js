import '../Styles/team-form.css'
import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";


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

class TeamForm extends Component  {
  render(){
  let Name, domain, project, description;

    return (
      
    <Mutation mutation={ADD_TEAM} onCompleted={() => this.props.history.push('/teams')} >
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
}

export default TeamForm;
