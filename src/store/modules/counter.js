// Tipovi akcija

export const INCREMENT = 'INCREMENT_COUNTER'

// Inicijalni state

const initialState = {
    count: 0,
}

// Reducer ( glavni dio, mutira state direktno)

const counterReducer = (state = initialState, action) => {
    switch (action.type) {

        case INCREMENT:
            return {
                count: state.count + 1,
            }

        default:
            return state
    }
}

// Kreatori akcija

export const increment = () => {
    return dispatch => {
        dispatch({
            type: INCREMENT
        })
    }
}

export default counterReducer;