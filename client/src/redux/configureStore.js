import {createStore,combineReducers,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from "./ducks/user";
import {watcherSaga} from './saga/rootSaga'
const reducer=combineReducers({
    user:userReducer
})

const sagaMiddleware=createSagaMiddleware();
const middleware=[sagaMiddleware];
const store =createStore(reducer,{},applyMiddleware(...middleware));
sagaMiddleware.run(watcherSaga)
export default store