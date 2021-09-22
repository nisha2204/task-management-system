import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import '../Styles/form.css'

const GET_TASK = gql`
    query task($taskId: String) {
        task(id: $taskId) {
            _id
            Name
            domain
            task
            description
            deadline
        }
    }
`;

const UPDATE_TASK = gql`
    mutation updateTask(
        $id: String!,
        $Name: String!,
        $domain: String!,
        $task: String!,
        $description: String!,
        $deadline: Date!,
        ) {
        updateTask(
        id: $id,
        Name: $Name,
        domain: $domain,
        task: $task,
        description: $description,
        deadline:$deadline) {
            _id
        }
    }
`;

class Edit extends Component {

  render() {

    const scrollHeight = (e)=>{ 
      const textarea = document.querySelector(
        ".container .form .input-container textarea")
          // textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";
    } 
    let Name, domain, task, description, deadline;
    return (
        <Query query={GET_TASK} variables={{ taskId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={UPDATE_TASK} key={data.task._id} onCompleted={() => this.props.history.push(`/tasks`)}>
                        {(updateTask, { loading, error }) => (
                            <div className="container">
                            <h4 className="heading">Assing Task</h4>
                            <form className="form" onSubmit={e => {
                                            e.preventDefault();
                                            updateTask({ variables: { id: data.task._id, Name: Name.value, domain: domain.value, task: task.value, description: description.value, deadline: deadline.value } });
                                            Name.value = "";
                                            domain.value = "";
                                            task.value = "";
                                            description.value = "";
                                            deadline.value = null;
                                            
                                        }}>
                              <div className="row-1">
                                <div className="input-container">
                                  <input id="Name" type="text" ref={node => {Name = node;}} placeholder="Name" defaultValue={data.task.Name} required />
                                </div>
                                <div class="input-container" >
                                <select name="Domain" id="domain" ref={node => {domain = node;}} defaultValue={data.task.domain} required>
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
                                <input id="task" type="text" ref={node => {task = node;}} placeholder="Task" defaultValue={data.task.task} required />
                              </div>
                              <div className="input-container">
                              <textarea onChange = {scrollHeight} placeholder="Description" id="description" ref={node => {description = node;}} defaultValue={data.task.description} required></textarea>
                              </div>
                              <div className="input-container">
                                <input id="deadline" type="date" ref={node => {deadline = node;}} defaultValue={data.task.deadline} required/>
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

export default Edit;