import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px 0',
        color: "#000"
    }
}));

export function Spinner() {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <CircularProgress color={'inherit'}/>
        </div>
    )
}