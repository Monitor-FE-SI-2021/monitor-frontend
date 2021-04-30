export const SET_REPORT = 'SET_REPORT';

const initialState = {
    report: null
};

const ACTION_HANDLERS = {
    [SET_REPORT]: (state, action) => {
        return {
            ...state,
            report: action.currentReport,
        }
    }
}

export const setReportToStore = (currentReport) => {
    return dispatch => {
        dispatch({
            type: SET_REPORT,
            currentReport
        })
    }
}

export default function report(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
