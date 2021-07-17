import React from 'react'
import {Link} from 'react-router-dom'
import Image from '../Assets/banner.png'
import '../Styles/banner.css'

const Banner = () => {
    return (
        <div className="banner">
      <div className="img-container">
        <img src={Image} alt="banner" />
      </div>
      <div className="text-container">
        <h5 className="tagline">Simple Project Managing Tool</h5>
        <h1 className="heading">
          Work more <br />
          Structured <br />
          and Organized
        </h1>
        <h4 className="sub-heading">
          Good planning will lead to better work, Plan work, keep projects on
          track, and manage teamwork easily with Task
        </h4>
        <Link style={{textDecoration: 'none'}} to='/form'>
          <h4 className="btn">Create Task</h4>
        </Link>
      </div>
    </div>
    )
}

export default Banner
