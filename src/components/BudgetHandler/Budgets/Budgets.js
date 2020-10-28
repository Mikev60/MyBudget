import React , {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import classes from './Budgets.module.css'

import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

import * as actions from '../../../store/actions/index'

const Budgets = (props) => {

useEffect(() => {

}, [])

    const [inputModify, setInputModify] = useState([...props.budgets])
    const [feedbackMessage, setFeedbackMessage] = useState('')

    const changeHandler = (event, id) => {
            const formerInput = [...inputModify]
            const condition = (element) => element.keyId === id
            const indexToModify = formerInput.findIndex(condition)
            formerInput[indexToModify].budget = event.target.value;
            console.log('former', formerInput)
            setInputModify([...formerInput])
    }

    const saveChanges = () => {
        console.log('onsubmit', inputModify)
        props.onSubmitBudget(props.token, props.userId, inputModify)
    }

    let budgetsList = props.budgets.map( ((element,index) =>
        <div className={classes.inputContainer}>
            <p>{element.type}</p>
            <Input type='text' change={(event) => changeHandler(event, element.keyId)}>{element.budget}</Input>
        </div>
    ));


    return (
        <div className={classes.Budgets} >
            <h3>Paramétrage des budgets</h3>
            {feedbackMessage}
            {budgetsList}
            <Button type="Normal" clicked={saveChanges}>Enregistrer</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        typesOut: state.dshb.typesOut,
        userId : state.auth.userId, 
        token: state.auth.token,
        budgets: state.dshb.budgets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitBudget: (token, userId, payload) => dispatch(actions.setBudgetsDB(token, userId, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budgets);