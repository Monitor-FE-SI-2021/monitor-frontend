import { connect } from "react-redux";
import { Paper, makeStyles } from '@material-ui/core';
import ManageGroupForm from "../../components/ManageGroupForm/ManageGroupFrom";
import { useEffect } from "react";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const ManageGroup = (props) => {
    const classes = useStyles();

    return (
        <div className='page manage-device'>
            <Paper className={classes.pageContent}>
                <ManageGroupForm parentGroup={props?.location?.state?.group}/>
            </Paper>
        </div>
    )
}

export default connect(state => ({}), {})(ManageGroup);
