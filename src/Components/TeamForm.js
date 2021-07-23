import React from 'react'
import '../Styles/form.css'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";


const ADD_TEAM = gql`
    mutation AddTeam(
        $Name: String!,
        $members: Number!,
        $project:String!
        $task: String!,
        $description: String!,
        ) {
        addTeam(
            Name: $Name,
            members:$members
            project: $project,
            task: $task,
            description: $description,
           ) {
            _id
        }
    }
`;

const TeamForm = () => {
  let Name, members, project, task, description;
    return (
       /* <div className="container">
      <h4 className="heading">Create Team</h4>
      <form className="form">
        <div className="row-1">
          <div className="input-container">
            <input id="name" type="text" placeholder="Team Name" required />
          </div>
          <div className="input-container">
            <input id="domain" type="text" placeholder="Total Members" required />
          </div>
        </div>
        <div className="input-container">
          <input id="task" type="text" placeholder="Project Title" required />
        </div>
        <div className="input-container">
          <input
            id="date"
            type="text"
            value=""
            placeholder="Task"
            required
          />
        </div>
        <div className="input-container">
          <input
            id="description"
            type="text"
            placeholder="Description"
            required
          />
        </div>
      </form>
      <h4 style={{textDecoration: 'none'}} className="btn">Create a Team</h4>
    </div>*/
    <Mutation mutation={ADD_TEAM} onCompleted={() => this.props.history.push('/')}>
    {(addTeam, { loading, error }) => (
        <div className="container">
        <h4 className="heading">Create Team</h4>
        <form className="form" onSubmit={e => {
                        e.preventDefault();
                        addTeam({ variables: {Name: Name.value, members:members.value, project: project.value, task: task.value, description: description.value} });
                        Name.value = "";
                        members.value=null;
                        project.value = "";
                        task.value = "";
                        description.value = ""; 
                    }}>
<div className="row-1">
  <div className="input-container">
    <input id="Name" type="text" ref={node => {Name = node;}} placeholder="Team Name" required />
  </div>
  <div className="input-container">
    <input id="members" type="int" ref={node => {members = node;}} placeholder="Total members" required />
  </div>
</div>
<div className="input-container">
  <input id="project" type="text" ref={node => {project = node;}} placeholder="Project Title" required />
</div>
<div className="input-container">
  <input id="task" type="text" ref={node => {task = node;}} placeholder="Task" required />
</div>
<div className="input-container">
  <input
    id="description"
    type="text"
    ref={node => {description = node;}}
    placeholder="Description"
    required
  />
</div>


<button style={{textDecoration: 'none', border:'none'}} type="submit" className="btn">Assign Task</button>
</form>

{loading && <p>Loading...</p>}
{error && <p>Error :( Please try again</p>}
</div>
    )}
</Mutation>
    )
}

export default TeamForm
