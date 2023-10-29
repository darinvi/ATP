import { combineReducers } from "redux";
import filingsReducer from './filings.js'
import reportsReducer from './reports.js'
import journalReducer from './journal.js'
import mentorReducer from './mentor.js'
import backtestsReducer from './backtests.js'
import tablesReducer from './tables.js'

export default combineReducers({
    filings: filingsReducer,
    reports: reportsReducer,
    journal: journalReducer,
    mentor: mentorReducer,
    backtests: backtestsReducer,
    tables: tablesReducer,
})