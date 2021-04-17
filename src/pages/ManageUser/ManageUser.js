import { connect } from "react-redux";
import { Paper, makeStyles } from '@material-ui/core';
import ManageUserForm from "../../components/ManageUserForm/ManageUserForm";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const ManageUser = (props) => {
    const classes = useStyles();

    return (
        <div className='page manage-user'>
            <Paper className={classes.pageContent}>
                <ManageUserForm user={props?.user}/>
            </Paper>
        </div>
    )
}

export default connect(state => ({}), {})(ManageUser);
