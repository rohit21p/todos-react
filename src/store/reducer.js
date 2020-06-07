import actions from './actions'

const initialState = {
    token: null,
    username: "Guest",
    pinned: [],
    rest: [],
    archived: [],
    loggedIn: false,
    bin: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'PUSH': 
            return {
                ...state,
                pinned: action.payload.pinned,
                rest: action.payload.rest,
                archived: action.payload.archived
            }
        case 'DELETE': 
            let data = [...state[action.payload.pinned ? 'pinned' : 'rest']]
            let bin = data.splice(action.payload.index, 1)
            return {
                ...state,
                [action.payload.pinned ? 'pinned' : 'rest'] : data,
                bin: [...state.bin, ...bin]
            }
        case 'ARCHIVE': 
            let arr = [...state[action.payload.pinned ? 'pinned' : 'rest']]
            let arc = arr.splice(action.payload.index, 1)
            return {
                ...state,
                [action.payload.pinned ? 'pinned' : 'rest'] : arr,
                archived: [...state.archived, ...arc]
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
        case 'RESTORE_ARCHIVED': 
            let new_arc = [...state.archived]
            new_arc.splice(action.payload.index, 1)
            return {
                ...state,
                archived: new_arc
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
        case 'LOGIN': 
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
                username: action.payload.username
            }
        case 'LOGOUT': 
            return initialState;
        default:
            return state;
    }
}