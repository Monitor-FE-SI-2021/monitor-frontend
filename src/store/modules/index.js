import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import menu from "./menu/menu";
import devices from "./devices/devices";
import groups from "./groups/groups";
import login from "./login/login";
import users from "./users/users"

// Kada napravite reducer (store module), dodajte ga ovdje ispod (counter, menu, noviModul, ...)

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    menu,
    devices,
    groups,
    login,
    users
})
export default createRootReducer