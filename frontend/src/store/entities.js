import { combineReducers } from "redux";
import leadsReducer from './leads.js'
import filingsReducer from './filings.js'

export default combineReducers({
    leads: leadsReducer,
    filings: filingsReducer,
})