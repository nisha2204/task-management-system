import React from 'react'
import Image from '../Assets/Images/banner-img.png'
import {Link} from 'react-router-dom'


const Banner = () => {
    return (
      

    <div className="banner">
      <div className="banner-img">
        <img src={Image} alt="banner-img" />
      </div>
      <div className="banner-text">
        <h2>Having trouble while managing your tasks</h2>
        <h4>Here we are with the solution</h4>
        <div className="btn-containers">
          <Link to="/form">
          <a className="assign-task">Assign task</a></Link>
        </div>
      </div>
    </div>
    )
}

export default Banner
