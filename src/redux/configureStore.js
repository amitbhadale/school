import { combineReducers, createStore, applyMiddleware } from "redux";
import counterReducer from "./ducks/counter";
import classesReducer from "./ducks/classes";
import thunkMiddleware from "redux-thunk";
import modalReducer from "./ducks/modal";

const reducer = combineReducers({
  counter: counterReducer,
  classesR: classesReducer,
  modalReducer: modalReducer,
});
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
