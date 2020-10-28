import React from 'react'

import Incomes from './Incomes/Incomes'

import { withRouter } from 'react-router-dom'

import classes from './BudgetHandler.module.css'
import Outcomes from './Outcomes/Outcomes'
import Budgets from './Budgets/Budgets'

const BudgetHandler = (props) => {
    return (
        <div>
            <h1>Paramètres de l'application</h1>
            <h2>Ajouter / Supprimer des types de mouvements</h2>
            <div className={classes.BudgetHandler}>
            <Incomes></Incomes>
            <Outcomes></Outcomes>
            </div>
            <h2>Paramètres des budgets</h2>
            <Budgets></Budgets>
        </div>
    );
}

export default withRouter(BudgetHandler);