import { createAction, /*createReducer,*/ createSlice } from '@reduxjs/toolkit'
import todoService from 'services/todo.service'
import { setError } from './error'

const initialState = {
    entities: [],
    isLoading: true,
}


// const update = createAction('task/updated')
// const remove = createAction('task/deleted')

// const TASK_UPDATED = 'task/updated'
// const TASK_DELETED = 'task/deleted'

const slice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        created (state, action) {
            state.entities.push(action.payload)
            state.isLoading = false
        },
        received (state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        updated (state, action) {
            const elementIndex = state.entities.findIndex(el => el.id === action.payload.id)
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            }
        },
        removed (state, action) {
            // Прямая мутация состояния
            return state.entities.filter(t => t.id !== action.payload.id)
        },
        taskRequested (state) {
            state.isLoading = true
        },
        taskRequestFailed (state, action) {
            state.isLoading = false
        },

    }
})
// const reducer = createReducer(initialState, builder => {
//     builder
//         .addCase(update, (state, action) => {
//             const elementIndex = state.findIndex(el => el.id === action.payload.id)
//             state[elementIndex] = {
//                 ...state[elementIndex],
//                 ...action.payload,
//             }
//         })
//         .addCase(remove, (state, action) => {
//             // Прямая мутация состояния
//             return state.filter(t => t.id !== action.payload.id)
//         })
// })
// function reducer (state = [], action) {
//     switch (action.type) {
//     case  update.type: {
//         const newArray = [...state]
//         const elementIndex = newArray.findIndex(el => el.id === action.payload.id)
//         newArray[elementIndex] = {...newArray[elementIndex], ...action.payload}
//         return newArray
//     }
//     case  remove.type: {
//         return state.filter(t => t.id !== action.payload.id)
//     }
//     default:
//         return state
//     }
// }

const {actions, reducer} = slice
const {created, updated, removed, received, taskRequested, taskRequestFailed} = actions

// const taskRequested = createAction('task/requested')
// const taskRequestFailed = createAction('task/requestFailed')

export const loadTasks = () => {
    return async (dispatch) => {
        dispatch(taskRequested())
        try {
            const data = await todoService.fetch()
            dispatch(received(data))
        } catch (error) {
            dispatch(taskRequestFailed())
            dispatch(setError(error.message))
        }
    }
}
export const createTask = (payload) => {
    return async (dispatch) => {
        dispatch(taskRequested())
        try {
            const data = await todoService.post(payload)
            dispatch(created(data))
        } catch (error) {
            dispatch(taskRequestFailed())
            dispatch(setError(error.message))
        }
    }

}

export function taskCompleted (id) {
    return updated({id, completed: true})
    // return {
    //     type: TASK_updatedD,
    //     payload: {id, completed: true},
    // }
}

export function titleChanged (id) {
    return updated({id, title: `New title for ${id}`})
    // return {
    //     type: TASK_UPDATED,
    //     payload: {id, title: `New title for ${id}`},
    // }
}

export function taskDeleted (id) {
    return removed({id})
    // return {
    //     type: TASK_DELETED,
    //     payload: {id},
    // }
}
export function taskCreated (payload) {
    return created(payload)
}

export const getTasks  = () => state => state.tasks.entities
export const getTasksLoadingStatus  = () => state => state.tasks.isLoading

export default reducer
