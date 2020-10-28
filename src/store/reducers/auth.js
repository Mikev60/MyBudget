import * as actionTypes from '../actions/actionsTypes'

let initialState = {
    token: null,
    userId: null
}

const signIn = (state, action) => {
    return {...state, token: action.idToken, userId: action.userId}
}

const signUp = (state, action) => {
    return {...state, token: action.idToken, userId: action.userId}
}

const authLogout = (state, action) => {
    return {...state, token: null, userId: null}
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN: return signIn(state, action);
        case actionTypes.SIGN_UP: return signUp(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: 
        return state;
    }
}

export default reducer;