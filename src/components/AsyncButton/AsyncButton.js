import React from "react";
import { Spinner } from "../Spinner/Spinner";
import classnames from "classnames";

export function AsyncButton({ async, children, className }) {

    const classes = classnames('async-button', className)

    return (
        <button className={classes} disabled={async}>
            {children}
            {async && <Spinner size={18}/>}
        </button>
    )
}