import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from "./counter";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    counterReducer
})
export default createRootReducer