import React from 'react'
import '../Styles/team-form.css'

const singleMember = () => {

    const memberName = (e) => {
        let member = e.target.value
        console.log(member)
    }

    return (
        <div className="container">
      <h4 className="heading">Add Member</h4>
      <form className="form">
        <div className="input-container">
          <input id="member-name" type="text" placeholder="Member Name" onChange={memberName} autocomplete="off" required />
        </div>
        <button style={{textDecoration: 'none', border:'none'}} type="submit" className="btn">Add Member</button>
      </form>
      
    </div>
    )
}

export default singleMember
