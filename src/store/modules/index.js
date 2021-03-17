import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counter from "./counter";
import menu from "./menu";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    counter,
    menu
})
export default createRootReducer