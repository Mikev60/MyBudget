import React from 'react'

import classes from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {

    let loggedMenu = (
        <React.Fragment>
            <NavLink to="/dashboard" exact className={classes.Link}>Dashboard</NavLink>
            <NavLink to="/movements" exact className={classes.Link}>Mouvements</NavLink>
            <NavLink to="/handler" className={classes.Link}>Paramètres</NavLink>
            <NavLink to="/logout" className={classes.Link}>Logout</NavLink>
        </React.Fragment>
    )
    return (
        <header className={classes.Navbar}>
            <div className={classes.Logo}>MyBudget</div>
            <nav>
                {props.isAuth ? loggedMenu : <NavLink to="/" exact className={classes.Link}>Home</NavLink>}
            </nav>
        </header>
    )
}

export default Navbar;