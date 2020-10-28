import * as actionsTypes from './actionsTypes'
import axios from '../../axios'

export const setBalance = (donnees) => {
    return {
        type: actionsTypes.SET_BALANCE, 
        donnees: donnees
    }
}

export const setDetailsIn = (donnees) => {
    return {
        type: actionsTypes.SET_DETAILS_IN,
        donnees: donnees
    }
}

export const setDetailsOut = (donnees) => {
    return {
        type: actionsTypes.SET_DETAILS_OUT,
        donnees: donnees
    }
}

export const setDetailsMvts = (donnees) => {
    return {
        type: actionsTypes.SET_DETAILS_MVTS,
        donnees: donnees
    }
}

export const setBudgets = (donnees) => {
    return {
        type: actionsTypes.SET_BUDGETS, 
        donnees: donnees
    }
}

export const setBudgetsDB = (token, userId, payload) => {
    console.log('payload', payload)
    return dispatch => {
        for(let element of payload) {
            let keyCopy = element.keyId;
            delete element.keyId
            axios.put('/typesOut/'+keyCopy+'.json?auth='+token, element)
        .then(response => {
            dispatch(setBudgets(payload))
        })
        .catch(error => console.log(error))
        }
    }
}

export const fetchDataBalance = (token, userId) => {
    return dispatch => {
        axios.get('/movements.json?auth=' +token+'&orderBy="userId"&equalTo="'+userId+'"')
        .then(response => {
            dispatch(setBalance(response.data))
        })
        .catch(error => console.log(error))
    }
}

export const fetchDataMvts = (token, userId) => {
    return dispatch => {
        axios.get('/movements.json?auth=' +token+'&orderBy="userId"&equalTo="'+userId+'"')
        .then(response => {
            dispatch(setDetailsMvts(response.data))
        })
        .catch(error => console.log(error))
    }
}

export const fetchDataDetails = (token,userId) => {
    return dispatch => {
        axios.get('/typesIn.json?auth=' +token+'&orderBy="userId"&equalTo="'+userId+'"')
        .then(responseIn => {
            dispatch(setDetailsIn(responseIn.data))
        })

        axios.get('/typesOut.json?auth=' +token+'&orderBy="userId"&equalTo="'+userId+'"')
            .then(responseOut => {
                dispatch(setDetailsOut(responseOut.data))
            })
        .catch(error => console.log(error))
    }
}