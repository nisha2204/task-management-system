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

const ADD_MEMBER = gql`
    mutation addMember(
        $id: String!,
        $Mname: String!,
        ) {
        addMember(
        id: $id,
        Mname: $Mname,
        ) {
            Mname
        }
    }
`;

class AddMember extends Component {

  render() {

    let Mname;
   
        
    return (
        <Query query={GET_TEAM} variables={{ teamId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <Mutation mutation={ADD_MEMBER} key={data.team._id} onCompleted={() => this.props.history.push(`/teams`)} >
                        {(addMember, { loading, error }) => (
                            <div className="container">
                            <h4 className="heading">Add Member</h4>
                            <form className="form" onSubmit={e => {
                                            e.preventDefault();
                                            addMember({ variables: { id: data.team._id, Mname:Mname.value} });
                                           Mname.value="";
                                        }}>
                              <div className="row-1">
                                <div className="input-container">
                                  <input id="Mname" type="text"  ref={node => {Mname = node;}} placeholder="Name"  required />
                                </div>
                               
                              </div>
                             
                              
                             
                              
                              <button style={{textDecoration: 'none', border:'none'}} type="submit" className="btn">ADD MEMBER</button>
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
            }}
        
  

export default AddMember;

// member:{Mname:Mname.value}