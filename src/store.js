import { createStore } from 'redux'

const initialState = {
    a: 1
}


function baseReducer(state = initialState, action) {
    return state
}

export const store = createStore(baseReducer)

