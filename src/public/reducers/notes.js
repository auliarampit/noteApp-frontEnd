const initialState = {
    notes:[],
    totalPage:null,
    isLoading: false,
    searchNotes:[],
    sorted:'DESC',
    isSearch:false,
    currentPage:null,
    searchKeyword:'',
    selectedCategory:''
}

export default notes = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_SORT':
            return {
                ...state,
                sorted:  action.sort
            }
        case 'GET_NOTES_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_NOTES_REJECTED':
            return {
                ...state,
                isLoading:false
            }
        case 'GET_NOTES_FULFILLED':
            return {
                ...state,
                isLoading:false,
                notes:  action.payload.data.data ,
                totalPage: action.payload.data.totalPage,
                currentPage: action.payload.data.page,
                selectedCategory:action.payload.data.selectedCategory
            }
        case 'MORE_NOTES_PENDING':
                return {
                    ...state,
                    isLoading: true
                }
        case 'MORE_NOTES_REJECTED':
                return {
                    ...state,
                    isLoading:false
                }
        case 'MORE_NOTES_FULFILLED':
                return {
                ...state,
                isLoading:false,
                notes :[...state.notes, ...action.payload.data.data ],
                searchNotes: [...state.searchNotes, ...action.payload.data.data],
                totalPage: action.payload.data.totalPage,
                currentPage: action.payload.data.page,
                selectedCategory:action.payload.data.selectedCategory
                    
                }
        case 'GET_SEARCH_PENDING':
            return {
                ...state,
                isSearch:true,
            }
        case 'GET_SEARCH_REJECTED':
            return {
                ...state,
                isSearch:false
            }
        case 'GET_SEARCH_FULFILLED':
            return {
                ...state,
                isSearch:false,
                searchKeyword: action.payload.data.search,
                searchNotes: action.payload.data.data,
                totalPage: action.payload.data.totalPage,
                currentPage: action.payload.data.page,
                selectedCategory:action.payload.data.selectedCategory
            }
            case 'SORTED_NOTES_PENDING':
                return {
                    ...state,
                    isLoading: true
                }
            case 'SORTED_NOTES_REJECTED':
                return {
                    ...state,
                    isLoading:false
                }
            case 'SORTED_NOTES_FULFILLED':
                return {
                    ...state,
                    isLoading:false,
                    notes: action.payload.data.data,
                    totalPage: action.payload.data.totalPage,
                }
        /// ADD NOTE ------------------
        case 'ADD_NOTE_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'ADD_NOTE_FULFILLED':
        return {
            ...state,
            isLoading: false,
            notes: [ action.payload.data.data[0], ...state.notes]
        }
        case 'ADD_NOTE_REJECTED':
        return {
            ...state,
            isLoading: false,
        }
        /// EDIT NOTE ------------------
        case 'EDIT_NOTE_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'EDIT_NOTE_FULFILLED':
        return {
            ...state,
            isLoading: false,
            notes: state.notes.map(note => 
                (note.noteId == action.payload.data.data[0].noteId) ? 
                    action.payload.data.data[0] : note
            )
        }
        case 'EDIT_NOTE_REJECTED':
        return {
            ...state,
            isLoading: false,
        }
        /// REMOVE NOTE ------------------
        case 'REMOVE_NOTE_PENDING':
        return {
            ...state,
            isLoading: true
        }
        case 'REMOVE_NOTE_FULFILLED':
        return {
            ...state,
            isLoading: false,
            notes: state.notes.filter(note => note.noteId !== action.payload.data.data.noteId)
        }
        case 'REMOVE_NOTE_REJECTED':
        return {
            ...state,
            isLoading: false,
        }

        default:
            return state;
    }
}