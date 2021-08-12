import React from 'react'
import {Link} from 'react-router-dom'
import '../Styles/navigation.css'

const Navigation = () => {
    return (
        <nav className="navigation">
            <div className="logo">
                <h3>Task</h3>
            </div>
            <div className="navlinks">
                <Link style={{textDecoration: 'none'}} to='/'>
                    <h4 >Home</h4>
                </Link>
                <Link style={{textDecoration: 'none'}} to='/tasks'>
                    <h4 >Tasks</h4>
                </Link>
                <Link style={{textDecoration: 'none'}} to='/teams'>
                    <h4 >Teams</h4>
                </Link>
            </div>
        </nav>
    )
}

export default Navigation
