import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import '../Styles/form.css'

const GET_TEAM = gql`
    query team($teamId: String) {
        team(id: $teamId) {
            _id
            Name
            domain
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
        $domain:String!
        $project: String!,
        $description: String!,
        
        ) {
        updateTeam(
        id: $id,
        Name: $Name,
        domain:$domain,
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
    let Name, domain, project, description;
    return (
        <Query query={GET_TEAM} variables={{ teamId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={UPDATE_TEAM} key={data.team._id} onCompleted={() => this.props.history.push(`/teams`)}>
                        {(updateTeam, { loading, error }) => (
                            <div className="container">
                            <h4 className="heading">Update Team</h4>
                            <form className="form" onSubmit={e => {
                                            e.preventDefault();
                                            updateTeam({ variables: { id: data.team._id, Name: Name.value, domain:domain.value, project: project.value, description: description.value} });
                                            Name.value = "";
                                            domain.value = "";
                                            project.value = "";
                                            description.value = ""; 
                                            
                                        }}>                                  
                              <div className="row-1">
                              <div className="input-container">
                              <input id="team-name" type="text" ref={node => {Name = node;}} defaultValue={data.team.Name} placeholder="Team Name" required />
                              </div>
                              <div className="input-container"> 
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
                            <button style={{textDecoration: 'none', border:'none'}} type="submit" className="btn">Update Team</button>
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