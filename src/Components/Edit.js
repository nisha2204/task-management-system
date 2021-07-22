import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        $deadline: String!,
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
    let Name, domain, task, description, deadline;
    return (
        <Query query={GET_TASK} variables={{ taskId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={UPDATE_TASK} key={data.task._id} onCompleted={() => this.props.history.push(`/`)}>
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
                                            deadline.value = "";
                                            
                                        }}>
                              <div className="row-1">
                                <div className="input-container">
                                  <input id="Name" type="text" ref={node => {Name = node;}} placeholder="Name" defaultValue={data.task.Name} required />
                                </div>
                                <div className="input-container">
                                  <input id="domain" type="text" ref={node => {domain = node;}} placeholder="Domain"  defaultValue={data.task.domain} required />
                                </div>
                              </div>
                              <div className="input-container">
                                <input id="task" type="text" ref={node => {task = node;}} placeholder="Task" defaultValue={data.task.task} required />
                              </div>
                              <div className="input-container">
                                <input
                                  id="description"
                                  type="text"
                                  ref={node => {description = node;}}
                                  placeholder="Description"
                                  defaultValue={data.task.description}
                                  required
                                />
                              </div>
                              <div className="input-container">
                                <input
                                  id="deadline"
                                  type="text"
                                  ref={node => {deadline = node;}}
                                  placeholder="Deadline"
                                  defaultValue={data.task.deadline}
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
                );
            }}
        </Query>
    );
  }
}

export default Edit;