import axios from 'axios';
import category from '../reducers/category';


export const getNotes = (search='',page=1,sort='',category='') => {
    return {
        type: 'GET_NOTES',
        payload: axios.get(`http://192.168.6.101:2020/notes?search=${search}&page=${page}&sort=${sort}&category=${category}`)
    }
}

export const getMoreNotes = (search='',page=1,sort='',category='') => {
    return {
        type: 'MORE_NOTES',
        payload: axios.get(`http://192.168.6.101:2020/notes?search=${search}&page=${page}&sort=${sort}&category=${category}`)
    }
}

export const getSearchNotes = (search='',page=1,sort='') => {
    return {
        type: 'GET_SEARCH',
        payload: axios.get(`http://192.168.6.101:2020/notes?search=${search}&page=${page}&sort=${sort}`)
        
    }
}

// export const getSortedNotes = (search='',sort='' ? 'DESC' : 'ASC') => {
//     return {
//         type: 'SORTED_NOTES',
//         payload: axios.get(`http://192.168.6.101:2020/notes?search=${search}&sort=${sort}`)
//     }
// }

export const addNote = (data) => {
    return {
        type: "ADD_NOTE",
        payload: axios.post(`http://192.168.6.101:2020/notes`, data)
    }
}

export const editNote = (id, data) => {
    return {
        type: "EDIT_NOTE",
        payload: axios.patch(`http://192.168.6.101:2020/notes/${id}`, data)
    }
}

export const removeNote = (id) => {
    return {
        type: "REMOVE_NOTE",
        payload: axios.delete(`http://192.168.6.101:2020/notes/${id}`)
    }
}

export const getCategory = () => {
    return {
        type: 'GET_CATEGORY',
        payload: axios.get(`http://192.168.6.101:2020/category`)
    }
}

export const addCategory = (data) => {
    return {
        type: "ADD_CATEGORY",
        payload: axios.post(`http://192.168.6.101:2020/category`, data)
    }
}

export const removeCategory = (id) => {
    return {
        type: "REMOVE_CATEGORY",
        payload: axios.delete(`http://192.168.6.101:3001/category/${id}`)
    }
}

export const changeSort = (sort) => {
    return {
        type: "CHANGE_SORT",
        sort: sort
    }
}
