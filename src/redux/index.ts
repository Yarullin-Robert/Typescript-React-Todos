import {configureStore} from "@reduxjs/toolkit"
import todoReducer from './todoSlice'
import userReducer from "./userSlice"
import appReducer from './appSlice'


const store = configureStore({
    reducer:{
        app: appReducer,
        user: userReducer,
        todos: todoReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;