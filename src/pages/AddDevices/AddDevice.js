import { connect } from "react-redux";
import AddDeviceForm from "../../components/AddDeviceForm/AddDeviceForm";
import { Paper,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const AddDevice = () => {
    const classes = useStyles();

    return (
        <div className='page devices'>
            <Paper className={classes.pageContent}>
                <AddDeviceForm />
            </Paper>
        </div>
    )
}

export default connect(state => ({}), {})(AddDevice);