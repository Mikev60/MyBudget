import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import classes from './Home.module.css'

import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

import * as actions from '../../store/actions/index'

const Home = (props) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const changeHandler = (event) => {
    switch(event.target.id) {
        case "email": 
        setEmail(event.target.value)
        break;
        case "password": 
        setPassword(event.target.value)
        break;
        default: 
        return;
    }
}

const signUp = () => {
    props.onSignUp(email, password);
}

const signIn = () => {
    props.onSignIn(email, password);
}

    return (
        <React.Fragment>
            {props.isAuthentificated ? <Redirect to="/dashboard" /> : null}
            <h1>Page d'accueil</h1>
            <div className={classes.Home}>
            <h2>Connectez-vous / Inscrivez-vous</h2>
            <Input type="text" placeholder="Votre email" id="email" change={(event) => changeHandler(event)}/>
            <Input type="password" placeholder="Votre password" id="password" change={(event) => changeHandler(event)}/>
            <div className={classes.row}>
                <Button type="Delete" clicked={signUp}>Inscription</Button>
                <Button type="Normal" clicked={signIn}>Connexion</Button>
            </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthentificated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (email, password) => dispatch(actions.signUp(email, password)),
        onSignIn: (email, password) => dispatch(actions.signIn(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);