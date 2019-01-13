import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./reducers";
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import cacheUser, { loadUser } from "../middleware/cache-user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, loadUser(), composeEnhancers(
    applyMiddleware(cacheUser, thunk, promise, logger),
));
export default store;
