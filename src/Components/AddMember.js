import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import '../Styles/form.css'

//query to get the team data with particualr id
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


// mutation to add member provided name and emailid
const ADD_MEMBER = gql`
    mutation addMember(
        $id: String!,
        $Mname: String!,
        $Emailid:String!
        ) {
        addMember(
        id: $id,
        Mname: $Mname,
        Emailid:$Emailid
        ) {
            Mname
            Emailid
        }
    }
`;

class AddMember extends Component {

  render() {
    
    let Mname, Emailid;   
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
                                            addMember({ variables: { id: data.team._id, Mname:Mname.value, Emailid:Emailid.value} });
                                            Mname.value="";
                                            Emailid.value="";
                                        }}>
                              <div className="input-container">
                                <input id="Mname" type="text" ref={node => {Mname = node;}} placeholder="Name"  required />
                              </div>
                              <div className="input-container">
                              <input id="Emailid" type="email" ref={node => {Emailid = node;}} placeholder="Email ID"  required />
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

