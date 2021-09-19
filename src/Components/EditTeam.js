import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import '../Styles/form.css'
import moment from 'moment'

const GET_TEAM = gql`
    query team($teamId: String) {
        team(id: $teamId) {
            _id
            Name
            members
            member{Mname}
            project
            description
        }
    }
`;

const UPDATE_TEAM = gql`
    mutation updateTeam(
        $id: String!,
        $Name: String!,
        $members:Int!
        $project: String!,
        $description: String!,
        
        ) {
        updateTeam(
        id: $id,
        Name: $Name,
        members:$members,
        project: $project,
        description: $description,
        ) {
            _id
        }
    }
`;

class EditTeam extends Component {

  render() {

    const scrollHeight = (e)=>{ 
      const textarea = document.querySelector(
        ".container .form .input-container textarea")
          // textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";
    } 
    let Name, domain, members, project, description;
    return (
        <Query query={GET_TEAM} variables={{ teamId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={UPDATE_TEAM} key={data.team._id} onCompleted={() => this.props.history.push(`/teams`)}>
                        {(updateTeam, { loading, error }) => (
                            <div className="container">
                            <h4 className="heading">Assing Task</h4>
                            <form className="form" onSubmit={e => {
                                            e.preventDefault();
                                            updateTeam({ variables: { id: data.team._id, Name: Name.value, members: parseInt(members.value), project: project.value, description: description.value} });
                                            Name.value = "";
                                            members.value = "";
                                            project.value = "";
                                            description.value = ""; 
                                            
                                        }}>
                                            <div className="input-container">
          <input id="team-name" type="text" ref={node => {Name = node;}} defaultValue={data.team.Name} placeholder="Team Name" required />
        </div>
                              <div className="row-1">
          <div className="input-container">
            <input
              //onChange={membersList}
              id="total"
              type="number"
              ref={node => {members = node;}}
              defaultValue={data.team.members}
              placeholder="Total Members"
              required
            />
          </div>
          <div className="input-container">
             {/* <input id="domain" type="text" placeholder="Domain" required />  */}
            <select name="Domain" id="domain" ref={node => {domain = node;}} defaultValue={data.team.domain} required>
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
                                <input id="project" type="text" ref={node => {project = node;}} placeholder="Task" defaultValue={data.team.project} required />
                              </div>
                              <div className="input-container">
                              <textarea onChange = {scrollHeight} placeholder="Description" id="description" ref={node => {description = node;}} defaultValue={data.team.description} required></textarea>
                              </div>
                              
                              
                              <button style={{textDecoration: 'none', border:'none'}} type="submit" className="btn">Assign Task</button>
                            </form>
                            
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                          </div>
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
  }
}

export default EditTeam;