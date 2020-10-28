import React, {useState} from 'react'
import {useEffect} from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import classes from './Outcomes.module.css'
import axios from '../../../axios'

import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'

const Incomes = (props) => {

const [inputValue, setInputValue] = useState('');
const [fetchedTypes, setFetchedTypes] = useState([]);
const [inputsDisabled, setInputsDisabled] = useState(true);
const [inputModify, setInputModify] = useState([])
const [feedbackMessage, setFeedbackMessage] = useState();

const onClickAddHandler = () => {
    const type = {type: inputValue, userId: props.userId, budget: 0}
    axios.post('/typesOut.json?auth=' +props.token, type)
    .then(response => {
        const id = response.data.name;
        const updatedTypes = [...fetchedTypes, {type: inputValue, id: id}]
        setFetchedTypes(updatedTypes)
        setFeedbackMessage('Le champ a bien été ajouté')
            setTimeout(() => {
                setFeedbackMessage(null)
            }, 2000);
    })
    .catch(error => console.log(error))
}

const onChangeHandler = (event) => {
    setInputValue(event.target.value)
}

const onChangeModifyHandler = (event, id) => {
    console.log('id',id)
    const inputModifyCopy = [...fetchedTypes]
    const condition = (element) => element.id === id
    const indexToModify = inputModifyCopy.findIndex(condition)
    inputModifyCopy[indexToModify].type = event.target.value;
    setInputModify(inputModifyCopy)
    console.log('salut',inputModify)
}

const onCLickDeleteHandler = (id) => {
    const oldTypes = [...fetchedTypes]
    axios.delete('/typesOut/'+id+'.json?auth='+ props.token)
    .then(response => {
        const newTypes = oldTypes.filter(type => type.id !== id)
        setFetchedTypes(newTypes)
    })
    .catch(error => console.log(error))
}

const changeDisableHandler = () => {
    setInputsDisabled(prev => !prev)
}

const modifyHandler = () => {
    const oldInputs = [...fetchedTypes];
    for(let i = 0; i < oldInputs.length ; i++) {
        const objectToUpdate = { type: inputModify[i].type}
        axios.put('/typesOut/'+oldInputs[i].id+'.json?auth=' + props.token, objectToUpdate)
        .then(response => {
            setFeedbackMessage('Les valeurs ont bien été mises à jour')
            setTimeout(() => {
                setFeedbackMessage(null)
            }, 2000);
        })
        .catch(error => console.log(error))
    }
    changeDisableHandler();
}

useEffect(() => {
    axios.get('/typesOut.json?auth=' +props.token+'&orderBy="userId"&equalTo="'+props.userId+'"')
    .then(response => {
        let types = []
        for(let key in response.data) {
            types.push({...response.data[key], id: key})
        }
        setFetchedTypes(types)
    })
    .catch(error => console.log(error))

}, [])

    let inputList = fetchedTypes.map(input => (
        <div className={classes.InputContainer} key={input.id}>
            <Input type="text" disabled={inputsDisabled} change={(event, id) => onChangeModifyHandler(event, input.id)}>{input.type}</Input>
            {!inputsDisabled ? <Button type="Delete" clicked={() => onCLickDeleteHandler(input.id)}>Supprimer</Button> : null }
        </div>
    ))

    return (
        <div className={classes.Outcomes}>
            {feedbackMessage}
            <h2>Paramètres des sorties</h2>
            <h3>Ajouter un type de dépense</h3>
            <Input type="text" disabled={false} change={onChangeHandler} placeholder="Nom du champ"></Input>
            <Button onClick={onClickAddHandler} type="Normal" clicked={onClickAddHandler}>Ajouter</Button>
            <h3>Liste des types de dépenses disponibles</h3>
            <Button type="Normal" onClick={changeDisableHandler} clicked={changeDisableHandler}>Modifier</Button>
            {inputList}
            {!inputsDisabled ? <Button type="Normal" onClick={modifyHandler} clicked={modifyHandler}>Enregistrer</Button> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default withRouter(connect(mapStateToProps)(Incomes));