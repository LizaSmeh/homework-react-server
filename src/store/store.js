import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { casesReduser, loadingReducer, sortReduser } from "../reducers";

const reducer = combineReducers({
	tasks: casesReduser,
	loading: loadingReducer,
	sorted: sortReduser,
});
export const store = createStore(reducer, applyMiddleware(thunk));
