import { connect } from "react-redux";
import { Paper, makeStyles } from '@material-ui/core';
import ManageUserForm from "../../components/ManageUserForm/ManageUserForm";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const ManageUser = () => {
    const classes = useStyles();

    return (
        <div className='page manage-device'>
            <Paper className={classes.pageContent}>
                <ManageUserForm />
            </Paper>
        </div>
    )
}

export default connect(state => ({}), {})(ManageUser);
