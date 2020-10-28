import React from 'react'

import classes from './MovementsForm.module.css'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'

const MovementsForm = (props) => {
    const types = props.types.map(element => (
        <option value={element.type} key={element.id}>{element.type}</option>
    ))
    const form = <div><select name="MovementType" id="MovementType" onChange={props.changed}> 
                <option value="">Type de mouvement</option>
    {types}
    </select> <Input type="text" placeholder="Commentaire" id="comment" change={props.changed}></Input> 
    <Input type="text" placeholder="Montant" id="amount" change={props.changed}></Input> 
    <Button type="Normal" clicked={props.clicked}>Ajouter</Button>
    </div>
    return (
        <div className={classes.MovementsForm}>
            <select onChange={props.changed} name="type" id="type" >
                <option value="">Type de mouvements</option>
                <option value="income">Entrée</option>
                <option value="outcome">Dépense</option>
            </select>
            {props.show ? form : null }
        </div>
    );
}

export default MovementsForm;