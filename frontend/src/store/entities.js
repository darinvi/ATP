import { combineReducers } from "redux";
import leadsReducer from './leads.js'

export default combineReducers({
    leads: leadsReducer,
})