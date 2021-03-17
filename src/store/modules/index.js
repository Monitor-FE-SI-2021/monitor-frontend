import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counter from "./counter";
import menu from "./menu";

// Kada napravite reducer (store module), dodajte ga ovdje ispod (counter, menu, noviModul, ...)
const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    counter,
    menu
})
export default createRootReducer