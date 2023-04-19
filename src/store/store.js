// import { applyMiddleware, createStore, compose } from 'redux'
// import taskReducer from 'store/task'
// import { thunk } from './middleware/thunk'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import taskReducer from './task'
import errorReducer from './error'
import { logger } from './middleware/logger'

// const middlewareEnhancer = applyMiddleware(logger, thunk)
//
// function configureStore () {
//     return createStore(
//         taskReducer,
//         compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     )
// }
// export default configureStore
const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer,
})

function createStore () {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    })
}

export default createStore