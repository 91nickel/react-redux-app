import * as ActionTypes from './actionTypes'

export function taskCompleted (id) {
    return {
        type: ActionTypes.taskUpdated,
        payload: {id, completed: true},
    }
}

export function titleChanged (id) {
    return {
        type: ActionTypes.taskUpdated,
        payload: {id, title: `New title for ${id}`},
    }
}

export function taskDeleted (id) {
    return {
        type: ActionTypes.taskDeleted,
        payload: {id},
    }
}
