import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import '../Styles/form.css'


const ADD_TASK = gql`
    mutation AddTask(
        $Name: String!,
        $domain: String!,
        $task: String!,
        $description: String!,
        $deadline: Date!,
        $isComplete:Boolean!,) {
        addTask(
            Name: $Name,
            domain: $domain,
            task: $task,
            description: $description,
            deadline: $deadline,
            isComplete:$isComplete
           ) {
            _id
        }
    }
`;
class Create extends Component {
  
    render() {
      let Name, domain, task, description,deadline;
      return (
        <Mutation mutation={ADD_TASK} onCompleted={() => this.props.history.push('/')}>
            {(addTask, { loading, error }) => (
                <div className="container">
      <h4 className="heading">Assing Task</h4>
      <form className="form" onSubmit={e => {
                                e.preventDefault();
                                addTask({ variables: {Name: Name.value, domain: domain.value, task: task.value, description: description.value, deadline: deadline.value, isComplete:false } });
                                Name.value = "";
                                domain.value = "";
                                task.value = "";
                                description.value = "";
                                deadline.value = null;
                               
                            }}>
        <div className="row-1">
          <div className="input-container">
            <input id="Name" type="text" ref={node => {Name = node;}} placeholder="Name" required />
          </div>
          <div className="input-container">
            <input id="domain" type="text" ref={node => {domain = node;}} placeholder="Domain" required />
          </div>
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
        <div className="input-container">
          <input
            id="deadline"
            type="date"
            ref={node => {deadline = node;}}
            placeholder="yyyy-mm-dd"
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
    }
  }
  
  export default Create;