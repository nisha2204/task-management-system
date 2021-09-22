import React from 'react'
import {Link} from 'react-router-dom'
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import '../Styles/teams.css'
import avatar_1 from '../Assets/Group.png'
import avatar_2 from '../Assets/Group-1.png'
import avatar_3 from '../Assets/Group-2.png'
import avatar_4 from '../Assets/Group-3.png'
import avatar_5 from '../Assets/Group-4.png'
import avatar_6 from '../Assets/Group-5.png'
import avatar_7 from '../Assets/Group-6.png'
import avatar_8 from '../Assets/Group-7.png'

const GET_TEAMS = gql`
{
  teams{
    _id,
  Name,
  domain,
  member {
    Mname
    Emailid
  },
  project,
  description 
}
}
`;

const DELETE_TEAM = gql`
  mutation removeTeam($id: String!) {
    removeTeam(id:$id) {
      _id
    }
  }
`;

const DELETE_MEMBER = gql`
  mutation removeMember($id: String!, $Emailid: String!) {
    removeMember(id:$id, Emailid:$Emailid) {
      _id
    }
  }
`;



const Teams = () => {
    function randomColor(){
        const colors = ['#e5a7e1','#a7d6e5','#cae5a7','#e5dfA7']
          return colors[Math.floor(Math.random() * colors.length)]
        }

    function randomAvatar(){
        const avatars = [avatar_1,avatar_2,avatar_3,avatar_4,avatar_5,avatar_6,avatar_7,avatar_8]
          return avatars[Math.floor(Math.random() * avatars.length)]
        }
        
      function len(task){
        return `${task.length + 2}ch`
        }


      
      
    return (
    <Query pollInterval={500} query={GET_TEAMS}>
      {({ loading, error, data }) => {
      if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
         return(
          <div className="teams">
            <h2 className="heading">Teams</h2>
            <div className="list">
          {data.teams.map((team, {col = randomColor()}) => (
            // <div className="teams">
              <div className="item" >
                <div className="head">
                  <h4 className="team-name">{team.Name}</h4>
                  <p className="team-members">Total Members: {team.member.length}</p>
                </div>
                <div className="mid">
                  <div className="top">
                    <h5 className="project-name" style={{color:`${col}`,backgroundColor:`${col}22`, width:`${len(team.project)}`}}>{team.project}</h5>
                    <div className="options">

                      <div className="edit" >

                      <Link to={`/editTeam/${team._id}`} className="btn btn-success"> <svg
                  className="editOption"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                </svg></Link>&nbsp;
                      </div>
                      <div className="edit" >
              <Link to={`/addMember/${team._id}`} className="btn btn-success">
              <svg width="160" height="48" viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="159" height="47" rx="23.5" stroke="#BAC8DF"/>
<path d="M19 12C12.373 12 7 17.373 7 24C7 30.627 12.373 36 19 36C25.627 36 31 30.627 31 24C31 17.373 25.627 12 19 12ZM25 25H20V30H18V25H13V23H18V18H20V23H25V25Z" fill="#BAC8DF"/>
<path d="M54.904 27.728H50.248L49.448 30H47.544L51.528 18.864H53.64L57.624 30H55.704L54.904 27.728ZM54.392 26.24L52.584 21.072L50.76 26.24H54.392ZM58.7483 25.552C58.7483 24.6667 58.9296 23.8827 59.2923 23.2C59.6656 22.5173 60.1669 21.9893 60.7963 21.616C61.4363 21.232 62.1456 21.04 62.9243 21.04C63.5003 21.04 64.0656 21.168 64.6203 21.424C65.1856 21.6693 65.6336 22 65.9643 22.416V18.16H67.8043V30H65.9643V28.672C65.6656 29.0987 65.2496 29.4507 64.7163 29.728C64.1936 30.0053 63.5909 30.144 62.9083 30.144C62.1403 30.144 61.4363 29.952 60.7963 29.568C60.1669 29.1733 59.6656 28.6293 59.2923 27.936C58.9296 27.232 58.7483 26.4373 58.7483 25.552ZM65.9643 25.584C65.9643 24.976 65.8363 24.448 65.5803 24C65.3349 23.552 65.0096 23.2107 64.6043 22.976C64.1989 22.7413 63.7616 22.624 63.2923 22.624C62.8229 22.624 62.3856 22.7413 61.9803 22.976C61.5749 23.2 61.2443 23.536 60.9883 23.984C60.7429 24.4213 60.6203 24.944 60.6203 25.552C60.6203 26.16 60.7429 26.6933 60.9883 27.152C61.2443 27.6107 61.5749 27.9627 61.9803 28.208C62.3963 28.4427 62.8336 28.56 63.2923 28.56C63.7616 28.56 64.1989 28.4427 64.6043 28.208C65.0096 27.9733 65.3349 27.632 65.5803 27.184C65.8363 26.7253 65.9643 26.192 65.9643 25.584ZM69.592 25.552C69.592 24.6667 69.7733 23.8827 70.136 23.2C70.5093 22.5173 71.0107 21.9893 71.64 21.616C72.28 21.232 72.9893 21.04 73.768 21.04C74.344 21.04 74.9093 21.168 75.464 21.424C76.0293 21.6693 76.4773 22 76.808 22.416V18.16H78.648V30H76.808V28.672C76.5093 29.0987 76.0933 29.4507 75.56 29.728C75.0373 30.0053 74.4347 30.144 73.752 30.144C72.984 30.144 72.28 29.952 71.64 29.568C71.0107 29.1733 70.5093 28.6293 70.136 27.936C69.7733 27.232 69.592 26.4373 69.592 25.552ZM76.808 25.584C76.808 24.976 76.68 24.448 76.424 24C76.1787 23.552 75.8533 23.2107 75.448 22.976C75.0427 22.7413 74.6053 22.624 74.136 22.624C73.6667 22.624 73.2293 22.7413 72.824 22.976C72.4187 23.2 72.088 23.536 71.832 23.984C71.5867 24.4213 71.464 24.944 71.464 25.552C71.464 26.16 71.5867 26.6933 71.832 27.152C72.088 27.6107 72.4187 27.9627 72.824 28.208C73.24 28.4427 73.6773 28.56 74.136 28.56C74.6053 28.56 75.0427 28.4427 75.448 28.208C75.8533 27.9733 76.1787 27.632 76.424 27.184C76.68 26.7253 76.808 26.192 76.808 25.584ZM96.912 18.88V30H95.088V22.384L91.696 30H90.432L87.024 22.384V30H85.2V18.88H87.168L91.072 27.6L94.96 18.88H96.912ZM107.389 25.376C107.389 25.7067 107.368 26.0053 107.325 26.272H100.589C100.643 26.976 100.904 27.5413 101.373 27.968C101.843 28.3947 102.419 28.608 103.101 28.608C104.083 28.608 104.776 28.1973 105.181 27.376H107.149C106.883 28.1867 106.397 28.8533 105.693 29.376C105 29.888 104.136 30.144 103.101 30.144C102.259 30.144 101.501 29.9573 100.829 29.584C100.168 29.2 99.6454 28.6667 99.2614 27.984C98.888 27.2907 98.7014 26.4907 98.7014 25.584C98.7014 24.6773 98.8827 23.8827 99.2454 23.2C99.6187 22.5067 100.136 21.9733 100.797 21.6C101.469 21.2267 102.237 21.04 103.101 21.04C103.933 21.04 104.675 21.2213 105.325 21.584C105.976 21.9467 106.483 22.4587 106.845 23.12C107.208 23.7707 107.389 24.5227 107.389 25.376ZM105.485 24.8C105.475 24.128 105.235 23.5893 104.765 23.184C104.296 22.7787 103.715 22.576 103.021 22.576C102.392 22.576 101.853 22.7787 101.405 23.184C100.957 23.5787 100.691 24.1173 100.605 24.8H105.485ZM119.856 21.04C120.55 21.04 121.168 21.184 121.712 21.472C122.267 21.76 122.699 22.1867 123.008 22.752C123.328 23.3173 123.488 24 123.488 24.8V30H121.68V25.072C121.68 24.2827 121.483 23.68 121.088 23.264C120.694 22.8373 120.155 22.624 119.472 22.624C118.79 22.624 118.246 22.8373 117.84 23.264C117.446 23.68 117.248 24.2827 117.248 25.072V30H115.44V25.072C115.44 24.2827 115.243 23.68 114.848 23.264C114.454 22.8373 113.915 22.624 113.232 22.624C112.55 22.624 112.006 22.8373 111.6 23.264C111.206 23.68 111.008 24.2827 111.008 25.072V30H109.184V21.184H111.008V22.192C111.307 21.8293 111.686 21.5467 112.144 21.344C112.603 21.1413 113.094 21.04 113.616 21.04C114.32 21.04 114.95 21.1893 115.504 21.488C116.059 21.7867 116.486 22.2187 116.784 22.784C117.051 22.2507 117.467 21.8293 118.032 21.52C118.598 21.2 119.206 21.04 119.856 21.04ZM127.633 22.496C127.943 22.0693 128.364 21.7227 128.897 21.456C129.441 21.1787 130.044 21.04 130.705 21.04C131.484 21.04 132.188 21.2267 132.817 21.6C133.447 21.9733 133.943 22.5067 134.305 23.2C134.668 23.8827 134.849 24.6667 134.849 25.552C134.849 26.4373 134.668 27.232 134.305 27.936C133.943 28.6293 133.441 29.1733 132.801 29.568C132.172 29.952 131.473 30.144 130.705 30.144C130.023 30.144 129.415 30.0107 128.881 29.744C128.359 29.4773 127.943 29.136 127.633 28.72V30H125.809V18.16H127.633V22.496ZM132.993 25.552C132.993 24.944 132.865 24.4213 132.609 23.984C132.364 23.536 132.033 23.2 131.617 22.976C131.212 22.7413 130.775 22.624 130.305 22.624C129.847 22.624 129.409 22.7413 128.993 22.976C128.588 23.2107 128.257 23.552 128.001 24C127.756 24.448 127.633 24.976 127.633 25.584C127.633 26.192 127.756 26.7253 128.001 27.184C128.257 27.632 128.588 27.9733 128.993 28.208C129.409 28.4427 129.847 28.56 130.305 28.56C130.775 28.56 131.212 28.4427 131.617 28.208C132.033 27.9627 132.364 27.6107 132.609 27.152C132.865 26.6933 132.993 26.16 132.993 25.552ZM144.733 25.376C144.733 25.7067 144.712 26.0053 144.669 26.272H137.933C137.986 26.976 138.248 27.5413 138.717 27.968C139.186 28.3947 139.762 28.608 140.445 28.608C141.426 28.608 142.12 28.1973 142.525 27.376H144.493C144.226 28.1867 143.741 28.8533 143.037 29.376C142.344 29.888 141.48 30.144 140.445 30.144C139.602 30.144 138.845 29.9573 138.173 29.584C137.512 29.2 136.989 28.6667 136.605 27.984C136.232 27.2907 136.045 26.4907 136.045 25.584C136.045 24.6773 136.226 23.8827 136.589 23.2C136.962 22.5067 137.48 21.9733 138.141 21.6C138.813 21.2267 139.581 21.04 140.445 21.04C141.277 21.04 142.018 21.2213 142.669 21.584C143.32 21.9467 143.826 22.4587 144.189 23.12C144.552 23.7707 144.733 24.5227 144.733 25.376ZM142.829 24.8C142.818 24.128 142.578 23.5893 142.109 23.184C141.64 22.7787 141.058 22.576 140.365 22.576C139.736 22.576 139.197 22.7787 138.749 23.184C138.301 23.5787 138.034 24.1173 137.949 24.8H142.829ZM148.352 22.464C148.619 22.016 148.971 21.6693 149.408 21.424C149.856 21.168 150.384 21.04 150.992 21.04V22.928H150.528C149.813 22.928 149.269 23.1093 148.896 23.472C148.533 23.8347 148.352 24.464 148.352 25.36V30H146.528V21.184H148.352V22.464Z" fill="#BAC8DF"/>
</svg>
</Link>&nbsp;
                
              </div>
                      <Mutation mutation={DELETE_TEAM} key={team._id} >
                                    {(removeTeam, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeTeam({ variables: { id: team._id } });
                                                }}>
                                                <button style={{background:'none',outline:'none',border:'none'}}  image url="http://www.w3.org/2000/svg" type="submit"><svg className="deleteOption"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z" fill="#FF3A3A"/>
                </svg></button>
                                            </form>
                                        
                                        </div>
                                    )}
                                </Mutation>
                    </div>
                  </div>
                  <p className="description">
                  {team.description}
                  </p>
                </div>
                <div className="bottom">
                  <h5 className="tagline">Members</h5>
                  <div className="members">
                    {team.member.map((item, {avatar = randomAvatar()}) => ( 
                    <div className="member">
                      <div className="img-container">
                        <img src={avatar} alt="member" />
                      </div>
                      <div className="info">
                        <h5 className="name">{item.Mname}</h5>
                        <p className="domain">{item.Emailid}</p>
                      </div>
                      <Mutation mutation={DELETE_MEMBER} key={team._id} >
                                    {(removeMember, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeMember({ variables: { id: team._id, Emailid: item.Emailid } });
                                                }}>
                                                <button style={{background:'none',outline:'none',border:'none'}}  image url="http://www.w3.org/2000/svg" type="submit"><svg className="deleteOption"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM16.151 17.943L12.008 13.841L7.891 18L6.058 16.167L10.162 12.01L6 7.891L7.833 6.058L11.988 10.16L16.094 6L17.943 7.849L13.843 11.99L18 16.094L16.151 17.943Z" fill="#FF3A3A"/>
                </svg></button>
                                            </form>
                                        
                                        </div>
                                    )}
                                </Mutation>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
              
              
            ))}
            </div>
      </div>)
        }}</Query>   
     )
}

export default Teams