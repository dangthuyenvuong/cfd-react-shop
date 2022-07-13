import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk'
import { authReducer } from "./auth";
import userReducer from "./user";


const store = createStore(
    combineReducers({
        auth: authReducer,
        user: userReducer
    }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(window.__REDUX_DEVTOOLS_EXTENSION__)
    )
    
)

export default store