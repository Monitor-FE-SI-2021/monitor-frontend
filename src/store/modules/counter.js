// Ovo je primjer jednog store modula (globalni state) koji sluzi kao sablon za ostale module


// Tipovi akcija

export const INCREMENT = 'INCREMENT_COUNTER'

// Inicijalni state

const initialState = {
    count: 0,
}

// Reducer ( glavni dio, mutira state direktno, mora vratiti novi state)

const ACTION_HANDLERS = {
    [INCREMENT]: (state, action) => {
        return {
            count: state.count + 1,
        }
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

// Sablon, ovo mozete copy paste, samo zamijenite ime counter -> novoIme
export default function counter(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}