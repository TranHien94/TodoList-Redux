import { createStore, combineReducers } from "redux";
import todoReducer from "./reducer";
import notify from './notifyReducer'

const rootReducer = combineReducers({
todoReducer, notify,
});
const store = createStore(rootReducer)
export default store