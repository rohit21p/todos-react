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

        case 'RESTORE': 
            let new_bin = [...state.bin]
            new_bin.splice(action.payload.index, 1)
            return {
                ...state,
                bin: new_bin
            }
        case 'PIN': 
            let pinned = [...state.pinned]
            let others = [...state.rest]
            others.splice(action.payload.index, 1)
            pinned.push(action.payload.task)
            return {
                ...state,
                pinned,
                rest: others
            }
        case 'UNPIN': 
            let unpinned = [...state.rest]
            let fav = [...state.pinned]
            fav.splice(action.payload.index, 1)
            unpinned.push(action.payload.task)
            return {
                ...state,
                pinned: fav,
                rest: unpinned
            }
        default:
            return state;
    }
}