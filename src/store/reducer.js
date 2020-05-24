import actions from './actions'

const initialState = {
    token: null,
    username: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}