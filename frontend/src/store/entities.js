import { combineReducers } from "redux";
import leadsReducer from './leads.js'
import filingsReducer from './filings.js'
import reportsReducer from './reports.js'


export default combineReducers({
    leads: leadsReducer,
    filings: filingsReducer,
    reports: reportsReducer,
})