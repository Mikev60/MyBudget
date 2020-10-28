import React from 'react'

import { connect } from 'react-redux'

import Navbar from '../../Navigation/Navbar/Navbar'

const Layout = (props) => {
    return (
        <React.Fragment>
            <Navbar isAuth={props.isAuthentificated}></Navbar>
            <main>{props.children}</main>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthentificated: state.auth.token !== null
    }
}

export default connect (mapStateToProps)(Layout); 