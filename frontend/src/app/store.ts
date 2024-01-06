import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
//import counterReducer from "../features/counter/counterSlice"
import authReducer from '../features/userSlice';
import transactionReducer from '../features/transactionSlice';
import uiReducer from '../features/uiSlice';
import userReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    auth: authReducer,
    transaction: transactionReducer,
    ui: uiReducer,
    user: userReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
/*export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
*/