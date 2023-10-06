import { combineReducers } from "redux";
import entitiesReducer from './entities.js';
import authReducer from './auth.js'

export default combineReducers({
    entities: entitiesReducer,
    auth: authReducer,
})