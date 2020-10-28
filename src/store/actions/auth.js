import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const finalSignUp = (token, userId) => {
    return {
        type: actionTypes.SIGN_UP,
        idToken: token, 
        userId: userId
    }
}

export const finalSignIn = (token, userId) => {
    return {
        type: actionTypes.SIGN_IN,
        idToken: token, 
        userId: userId
    }
}

export const checkAuthTimeout = (expirationTime) => {
    console.log('CHECKZUTH', expirationTime)
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const signUp = (email, password) => {
    return dispatch => {
        const authData = { 
            email: email, 
            password: password, 
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcw6qRL6ychZXibduSKeGZ0mwOY046Y5s', authData)
        .then(response => {
            dispatch(finalSignUp())
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }
}

export const signIn = (email, password) => {
    return dispatch => {
        const authData = { 
            email: email, 
            password: password, 
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcw6qRL6ychZXibduSKeGZ0mwOY046Y5s', authData)
        .then(response => {
            localStorage.setItem('token', response.data.idToken)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            console.log('expiration date 1', expirationDate.getSeconds())
            console.log(new Date())
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            const token = response.data.idToken;
            const userId = response.data.localId;
            dispatch(finalSignIn(token, userId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
            console.log(response.data)
        })
        .catch(error => console.log(error))
    }
}

export const authCheckState = () => {
    return dispatch => {
         const token = localStorage.getItem('token')
         if(!token) {
             console.log('pas de token man')
             dispatch(logout())
         } else {
             const expirationTime = new Date(localStorage.getItem('expirationDate'))
             const userId = localStorage.getItem('userId')
             if(expirationTime <= new Date()){
                console.log('expiration date man')
                 dispatch(logout())
             } else {
                dispatch(finalSignIn(token, userId))
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000))
             }
         }
    }
}