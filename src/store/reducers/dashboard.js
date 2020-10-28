import * as actionsTypes from '../actions/actionsTypes'

const initialState = { 
    incomes: 0, 
    expenses: 0, 
    typesIn: [],
    typesOut: [],
    valuesIn: [],
    valuesOut: [],
    Mvts: [], 
    budgets: []
}

const setBudgets = (state, action) => {
    console.log('state à update')
}

const setBalance = (state, action) => {
    let fetchedMvts = []
    for(let key in action.donnees) {
        fetchedMvts.push({...action.donnees[key]})
    }
    let sumIncome = 0;
    let sumOutcome = 0;
    fetchedMvts.forEach(element => {
        let parsed = parseInt(element.amount, 10)
        if(element.type === "income") {
            sumIncome = sumIncome + parsed;
        } else {
            sumOutcome = sumOutcome + parsed;
        }
    })
    return {...state, incomes: sumIncome, expenses: sumOutcome, Mvts: fetchedMvts}
}

const setDetailsIn = (state, action) => {
    let detailsToUpdate = []
    for(let key in action.donnees) {
        detailsToUpdate.push({...action.donnees[key]})
    }
    let array = []
    for(let i = 0; i < detailsToUpdate.length; i++) {
        array.push(Object.values(detailsToUpdate[i]))
    }
    let array2 = []
    for(let j = 0; j < array.length; j++) {
        const [type, id] = array[j]
        array2.push(type)
    }
    return {...state, typesIn: array2}
}

const setDetailsOut = (state, action) => {
    let detailsToUpdate = []
    for(let key in action.donnees) {
        detailsToUpdate.push({...action.donnees[key], keyId: key})
    }
    let array = []
    for(let i = 0; i < detailsToUpdate.length; i++) {
        array.push(Object.values(detailsToUpdate[i]))
    }
    console.log('array', array)
    let array2= []
    let budgetArray = []
    for(let j = 0; j < array.length; j++) {
        const [budget, type, userId, keyId] = array[j]
        array2.push(type)
        budgetArray.push({type, budget, userId, keyId})
    }
    console.log('budgets', budgetArray)
    return {...state, typesOut: array2, budgets: budgetArray}
}

const setDetailsMvts = (state, action) => {
    let details = []
    for(let key in action.donnees) {
        details.push({...action.donnees[key]})
    }
    let finalArrayIn = []
    let sumType = 0;
    Array.prototype.forEach.call(state.typesIn, element => {
        sumType = 0
        Array.prototype.forEach.call(details, mvt => {
            if(mvt.typeMvt == element){
                sumType = sumType + parseInt(mvt.amount,10)
                console.log('somme')
            }
        })
        finalArrayIn.push(sumType)
    })

    let finalArrayOut = []
    Array.prototype.forEach.call(state.typesOut, element => {
        sumType = 0
        Array.prototype.forEach.call(details, mvt => {
            if(mvt.typeMvt == element){
                sumType = sumType + parseInt(mvt.amount,10)
                console.log('somme')
            }
        })
        finalArrayOut.push(sumType)
    })
    return {...state, valuesIn: finalArrayIn, valuesOut: finalArrayOut};
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionsTypes.SET_BALANCE: return setBalance(state, action);
        case actionsTypes.SET_DETAILS_IN: return setDetailsIn(state, action);
        case actionsTypes.SET_DETAILS_OUT: return setDetailsOut(state, action);
        case actionsTypes.SET_DETAILS_MVTS: return setDetailsMvts(state, action);
        case actionsTypes.SET_BUDGETS: return setBudgets(state, action);
        default: 
        return state;
    }
}

export default reducer;