import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import '../Styles/tasks.css'
import FilterBar from './FilterBar';
import moment from 'moment'

const GET_TASKS = gql`
  {
    tasks {
      _id
      Name
      domain
      task
      description
      deadline
      isComplete
    }
  }
`;

const DELETE_TASK = gql`
  mutation removeTask($id: String!) {
    removeTask(id:$id) {
      _id
    }
  }
`;
const COMPLETE_TASK = gql`
  mutation completeTask($id: String!, $isComplete:Boolean!) {
    completeTask(id:$id, isComplete:$isComplete) {
      _id
      isComplete
    }
  }
`;

// console.log(GET_TASKS)


// console.log(colors[Math.floor(Math.random() * colors.length)])


const Tasks = () => {
  
  
    function randomColor(){
      const colors = ['#E78BE1','#8DD1E7','#BDE787','#E7DD86']
        return colors[Math.floor(Math.random() * colors.length)]
      }
      
    function len(task){
      return `${task.length + 2}ch`
      }

    return (
        <Query pollInterval={500} query={GET_TASKS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          

          const renderAuthButton = (abc) => {
            if (abc===true) {
              return <svg
              className="completedOption1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#6EFF3A"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
                d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM10.75 17.292L6.25 12.928L8.107 11.07L10.75 13.576L16.393 7.792L18.25 9.649L10.75 17.292Z"
              />
            </svg>;
            } else {
              return <svg
              className="completedOption2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#808080"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path 
                d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM10.75 17.292L6.25 12.928L8.107 11.07L10.75 13.576L16.393 7.792L18.25 9.649L10.75 17.292Z"
              />
            </svg>;
            }
          }
    
          return (
            <div className="tasks">
            <h2 className="heading">Tasks</h2>
            <div className="search-bar">{<FilterBar></FilterBar>}</div>
            <div className="lists">
                {data.tasks.map((task,{col = randomColor()}) => (
                  
                <div className="item" id={task._id} key={task._id} data-status ={task.isComplete} >
                  <div className="top-section">
                    <h5 className="tagline" style={{color:`${col}`,backgroundColor:`${col}22`, width:`${len(task.task)}`}}>{task.task}</h5>
                    <div className="options">
                      <div className="edit">
                      <Link to={`/edit/${task._id}`} className="btn btn-success"> 
                      <svg
                        className="editOption"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
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
                        </svg>
                        </Link>&nbsp;
                      </div>
                      <div className="completed">
                      <Mutation mutation={COMPLETE_TASK} key={task._id} >
                        {(completeTask, { loading, error }) => (
                            <div>
                                <form
                                  onSubmit={e => {
                                            e.preventDefault();
                                            completeTask({ variables: { id: task._id, isComplete:true } });
                                            }}>
                                  <button type="submit" style={{background:'none',outline:'none',border:'none'}}>{renderAuthButton(task.isComplete)}</button>
                                </form>
                            </div>
                        )}
                      </Mutation>
                      </div>
                      <div className="delete">
                      <Mutation mutation={DELETE_TASK} key={task._id} >
                      {(removeTask, { loading, error }) => (
                        <div>
                          <form
                          onSubmit={e => {
                            e.preventDefault();
                            removeTask({ variables: { id: task._id } });
                            }}>
                              <button style={{background:'none',outline:'none',border:'none'}}  image url="http://www.w3.org/2000/svg" type="submit">
                                <svg className="deleteOption"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z" fill="#FF3A3A"/>
                                </svg>
                              </button>
                          </form>
                        </div>
                        )}
                      </Mutation>
                      </div>
                    </div>
                  </div>
                  <h5 className="description">{task.description}</h5>
                  <div className="bottom-section">
                    <div className="duration">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 24H2V0H4V24ZM22 2.613C22 2.613 20.379 4.043 18.246 4.043C14.886 4.043 14.81 1.148 10.909 1.148C8.801 1.148 6.834 2.128 6 2.842V14.927C7.184 14.108 8.979 13.246 10.923 13.246C14.607 13.246 15.124 16 18.407 16C20.529 16 22 14.641 22 14.641V2.613V2.613Z" fill="#BAC8DF"/>
                      </svg>
                      <h5 className="date">{moment(task.deadline).format("DD-MM-YYYY")}</h5>
                    </div>
                    <div className="profile">
                      <h5 className="name">{task.Name}</h5>
                      <p className="domain">{task.domain}</p>
                    </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
      );
      }}
      </Query>
    )
}

export default Tasks

