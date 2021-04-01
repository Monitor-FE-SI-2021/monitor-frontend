import { connect } from "react-redux";
import { Paper, makeStyles } from '@material-ui/core';
import ManageGroupForm from "../../components/ManageGroupForm/ManageGroupFrom";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const ManageGroup = () => {
    const classes = useStyles();

    return (
        <div className='page manage-device'>
            <Paper className={classes.pageContent}>
                <ManageGroupForm/>
            </Paper>
        </div>
    )
}

export default connect(state => ({}), {})(ManageGroup);
