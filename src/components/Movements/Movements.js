import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'

import MovementsForm from './MovementsForm/MovementsForm'
import axios from '../../axios'
import classes from './Movements.module.css'

import Button from '../UI/Button/Button'

const Movements = (props) => {

const [showTypes, setShowTypes] = useState(false);
const [fetchedTypes, setFetchedTypes] = useState([])
const [type, setType ] = useState('');
const [movementType, setMovementType] = useState('');
const [comment, setComment] = useState('');
const [feedbackMessage, setFeedbackMessage] = useState('');
const [amount, setAmount] = useState(0);
const [fetchedMvts, setFetchedMvts] = useState([]);

const changeHandler = (event) => {
    switch (event.target.id) {
        case "comment":
            setComment(event.target.value)
            break;

        case "amount": 
            setAmount(event.target.value)
            break;

        case "MovementType":
            setMovementType(event.target.value);
            break;

        case "type": 
            setType(event.target.value)
            if(event.target.value === "income" || event.target.value === "outcome") {
                let searchParam = "typesOut";
                if(event.target.value === "income") {
                    searchParam = "typesIn"
                }
                axios.get('/'+searchParam+'.json?auth=' +props.token+'&orderBy="userId"&equalTo="'+props.userId+'"')
                .then(response => {
                    let newTypes=[];
                    for (let key in response.data) {
                        newTypes.push({...response.data[key], id: key})
                    }
                    setFetchedTypes(newTypes);
                    setShowTypes(true);
                })
                .catch(error => console.log(error))
            }
            else {
                setShowTypes(false);
            }
            break;

        default:
            break;
    }
}

const addMovement = () => {
    let toAdd = {
        type: type,
        typeMvt: movementType,
        comment: comment,
        amount: amount,
        userId: props.userId
    }
    if(movementType !== "") {
        axios.post('/movements.json?auth=' +props.token, toAdd)
        .then(response => {
            setFeedbackMessage('Le mouvement a bien été ajouté')
            setFetchedMvts([...fetchedMvts, toAdd])
        })
        .catch(error => console.log(error))
    } else {
        setFeedbackMessage('Vous devez définir un type de mouvement')
    }
}

const onCLickDeleteHandler = (id) => {
    alert(id)
    const oldMvts = [...fetchedMvts]
    axios.delete('/movements/'+id+'.json?auth=' + props.token)
    .then(response => {
        const newMvts = oldMvts.filter(row => row.id !== id)
        setFetchedMvts(newMvts)
    }) 
    .catch(error => console.log(error))
}

useEffect(() => {
    axios.get('/movements.json?auth=' +props.token+'&orderBy="userId"&equalTo="'+props.userId+'"')
    .then(response => {
        let fetchedMvtOld = []
        for(let key in response.data) {
            fetchedMvtOld.push({...response.data[key], id: key})
        }
        setFetchedMvts(fetchedMvtOld);
    })
    .catch(error => console.log(error))
}, [])

    let mvtList = fetchedMvts.map(element => (
        <div className={classes.MvtRow}>
            <p className={element.type ==="income" ? classes.Income: classes.Outcome}> {element.typeMvt} - {element.comment} - {element.amount} €</p>
            <Button type="Delete" clicked={() => onCLickDeleteHandler(element.id)}>Supprimer</Button>
        </div>
    ))

    return (
        <React.Fragment>
            <h1>Ajouter / Supprimer des mouvements</h1>
            {feedbackMessage}
            <MovementsForm changed={(event) => changeHandler(event)} show={showTypes} types={fetchedTypes} clicked={addMovement}/>
            <h2>Liste des mouvements</h2>
            {mvtList}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId : state.auth.userId
    }
}

export default connect(mapStateToProps)(Movements);