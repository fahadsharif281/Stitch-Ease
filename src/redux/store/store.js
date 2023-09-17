import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../reducers/auth/authReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const allReducers = combineReducers({
    auth: authReducer,
})
const persistConfig = {
    key: 'root',
    storage,
    // whitelist: [] will use if want to persist specific reducer
}

const persistedReducer = persistReducer(persistConfig, allReducers)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})

export const persistor = persistStore(store)