import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    entities: [],
}

const slice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        set (state, action) {
            state.entities.push(action.payload)
        },
    }
})

const {actions, reducer} = slice
const {set} = actions

export const setError = (message) => dispatch => dispatch(set(message))

export const getError  = () => state => state.errors.entities[0]

export default reducer