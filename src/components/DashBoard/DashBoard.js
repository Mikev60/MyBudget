import React, {useEffect} from 'react'

import classes from './Dashboad.module.css'
import { withRouter } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

const DashBoard = (props) => {

    useEffect(() => {
        props.onFetchDataBalance(props.token, props.userId)
        props.onFetchDataDetails(props.token, props.userId)
        props.onFetchDataMvts(props.token, props.userId)
    }, [])

    let dataIn = {
        datasets: [{
            data: props.valuesIn,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)', ]
        }],
        labels: props.typesIn
    };

    let dataOut = {
        datasets: [{
            data: props.valuesOut,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(123, 89, 104, 1)',
                'rgba(255, 128, 86, 1)' ]
        }],
        labels: props.typesOut
    };

    let displayBudgets = props.budgets.map((element,index) => (
        <div>
            <p>{element.type} : {element.budget}€ - <span className={((props.valuesOut[index]/element.budget)) < 0.5 ? classes.green: ((props.valuesOut[index]/element.budget)) > 0.75  ? classes.red: classes.orange}>Actuellement {props.valuesOut[index]} €</span></p>
        </div>
    ))

    return (
        <React.Fragment>
            <h1>Dashboard</h1>
            <div className={classes.balance}>
                <div>
                    <h2>Mes revenus</h2>
                    <p className={classes.income}>{props.incomes}€</p>
                </div>
                <div>
                    <h2>Mes dépenses</h2>
                    <p className={classes.outcome}>{props.expenses}€</p>
                </div>
            </div>
            <h2>Détails : </h2>
            <div className={classes.row}>
                <div>
                    <h2>Détail des revenus</h2>
                    <Doughnut data={dataIn} width="300" height="300"></Doughnut>
                </div>
                <div>
                    <h2>Détail des dépenses</h2>
                    <Doughnut data={dataOut} width="300" height="300"></Doughnut>
                </div>
                <div>
                    <h2>Budgets</h2>
                    {displayBudgets}
                </div>
            </div>

        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        incomes: state.dshb.incomes,
        expenses: state.dshb.expenses,
        typesIn: state.dshb.typesIn,
        typesOut: state.dshb.typesOut,
        valuesIn: state.dshb.valuesIn,
        valuesOut: state.dshb.valuesOut,
        Mvts: state.dshb.Mvts,
        token: state.auth.token,
        userId: state.auth.userId, 
        budgets: state.dshb.budgets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataBalance: (token, userId) => dispatch(actions.fetchDataBalance(token, userId)),
        onFetchDataMvts: (token, userId) => dispatch(actions.fetchDataMvts(token, userId)),
        onFetchDataDetails: (token, userId) => dispatch(actions.fetchDataDetails(token, userId))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DashBoard));