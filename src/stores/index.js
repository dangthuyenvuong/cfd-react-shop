import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk'
import { DEBUG } from "../constants/config";
import { authReducer } from "./auth";
import { productReducer } from "./product";
import { getUserInfo, userReducer } from "./user";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./saga";

// Redux toolkit

// 1. Giới thiệu về redux toolkit
// 2. setup redux = reduxToolkit
// 3. Thay đổi user, auth thành redux toolkit
// 4. Sử dụng createAsyncThunk để tạo các action gọi api
//         pending: Kết quả chưa được xử lý xong, đang chờ
//         fullfilled: Tác vụ được thực hiện thành công
//         rejected: Tác vụ không đồng bộ thất bại
// 5. So sánh khi code theo kiểu thuần và khi sử dụng redux toolkit


// const store = createStore(
//     combineReducers({
//         auth: authReducer,
//         user: userReducer
//     }),
//     compose(
//         applyMiddleware(thunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(window.__REDUX_DEVTOOLS_EXTENSION__)
//     )

// )


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer
    },
    devTools: DEBUG,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})


sagaMiddleware.run(rootSaga)

store.dispatch(getUserInfo())

export default store


