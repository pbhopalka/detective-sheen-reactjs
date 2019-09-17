import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';


const rootReducers = combineReducers({ reducers });

const middleware = applyMiddleware(thunk);

const initialState = {};

export default createStore(
    rootReducers,
    initialState,
    middleware
);