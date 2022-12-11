import { createStore } from "redux";
import { combineReducers } from "redux";
import editorReducer from "./editorReducer";
const rootReducer = combineReducers({ editorReducer});
const store = createStore(rootReducer);
export default store;