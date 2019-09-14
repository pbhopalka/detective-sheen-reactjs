import { createStore, combineReducers } from 'redux';
import reducers from './reducers';


const rootReducers = combineReducers({ reducers })

export default createStore(
    rootReducers
);