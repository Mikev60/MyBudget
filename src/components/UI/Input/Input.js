import React from 'react'

import classes from './Input.module.css'

const Input = (props) => {
    return (
        <input 
        type={props.type} 
        value={props.children} 
        disabled={props.disabled}
        placeholder={props.placeholder}
        className={classes.Input}
        onChange={props.change}
        id={props.id}
        ></input>
    )
}

export default Input;