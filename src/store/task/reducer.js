import * as ActionTypes from './actionTypes'

export function reducer (state = [], action) {
    switch (action.type) {
    case  ActionTypes.taskUpdated: {
        const newArray = [...state]
        const elementIndex = newArray.findIndex(el => el.id === action.payload.id)
        newArray[elementIndex] = {...newArray[elementIndex], ...action.payload}
        return newArray
    }
    case  ActionTypes.taskDeleted: {
        return state.filter(t => t.id !== action.payload.id)
    }
    default:
        return state
    }
}
