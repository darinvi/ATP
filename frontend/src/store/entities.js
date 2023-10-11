import { combineReducers } from "redux";
import leadsReducer from './leads.js'
import filingsReducer from './filings.js'
import reportsReducer from './reports.js'
import journalReducer from './journal.js'

export default combineReducers({
    leads: leadsReducer,
    filings: filingsReducer,
    reports: reportsReducer,
    journal: journalReducer,
})