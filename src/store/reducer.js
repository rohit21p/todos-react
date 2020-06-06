import actions from './actions'

const initialState = {
    token: null,
    username: null,
    pinned: [],
    rest: [],
    loggedIn: false,
    bin: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'PUSH': 
            return {
                ...state,
                pinned: action.payload.pinned,
                rest: action.payload.rest
            }
        case 'DELETE': 
            let data = [...state[action.payload.pinned ? 'pinned' : 'rest']]
            let bin = data.splice(action.payload.index, 1)
            return {
                ...state,
                [action.payload.pinned ? 'pinned' : 'rest'] : data,
                bin: [...state.bin, ...bin]
            }
        case 'SAVE': 
            return {
                ...state,
                rest : [...state.rest, action.payload]
            }
        default:
            return state;
    }
}