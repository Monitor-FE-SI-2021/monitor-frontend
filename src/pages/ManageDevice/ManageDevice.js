import { connect } from "react-redux";
import ManageDeviceForm from "../../components/ManageDeviceForm/ManageDeviceForm";
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const ManageDevice = (props) => {
    const classes = useStyles();

    return (
        <div className='page manage-device'>
            <Paper className={classes.pageContent}>
                <ManageDeviceForm group={props?.location?.state?.group}/>
            </Paper>
        </div>
    )
}

export default connect(state => ({}), {})(ManageDevice);
