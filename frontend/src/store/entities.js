import { combineReducers } from "redux";
import filingsReducer from './filings.js'
import reportsReducer from './reports.js'
import journalReducer from './journal.js'
import mentorReducer from './mentor.js'


export default combineReducers({
    filings: filingsReducer,
    reports: reportsReducer,
    journal: journalReducer,
    mentor: mentorReducer,
})