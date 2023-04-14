import {createStore} from 'redux'
import { taskReducer } from 'store/taskReducer'

const initialState = new Array(5)
    .fill({})
    .map((el, index) => ({
        id: index + 1,
        title: `Task ${index + 1}`,
        completed: false
    }))

export function initiateStore () {
    return createStore(taskReducer, initialState)
}