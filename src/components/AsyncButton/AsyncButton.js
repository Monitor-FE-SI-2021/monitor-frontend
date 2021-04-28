import React from "react";
import { Spinner } from "../Spinner/Spinner";
import classnames from "classnames";

export function AsyncButton({ async, children, className, onClick, type = 'button' }) {

    const classes = classnames('async-button', className)

    return (
        <button className={classes} disabled={async} type={type} onClick={onClick}>
            {children}
            {async && <Spinner size={18}/>}
        </button>
    )
}