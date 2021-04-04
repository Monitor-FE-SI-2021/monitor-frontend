import { CircularProgress } from "@material-ui/core";
import './spinner.scss'
import classnames from "classnames";

export function Spinner({ className, size = 40 }) {

    const classes = classnames('spinner', className)

    return (
        <div className={classes}>
            <CircularProgress color={'inherit'} size={size}/>
        </div>
    )
}