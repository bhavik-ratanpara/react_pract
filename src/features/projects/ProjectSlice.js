
import { createSelector, createSlice } from '@reduxjs/toolkit'

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        list: [],
        search: ``,
        filter: ``,
    },
    reducers: {
        addProject(state, action) {
            state.list.push(action.payload)
        },
        updateProject(state, action) {
            const i = state.list.findIndex(p => p.id === action.payload.id)
            if (i !== -1) state.list[i] = action.payload
        },
        deleteProject(state, action) {
            state.list = state.list.filter(p => p.id !== action.payload)
        },
        setSearch(state, action) {
            state.search = action.payload
        },
        setFilter(state, action) {
            state.filter = action.payload
        },
    }
})
export const { addProject, updateProject, deleteProject, setSearch, setFilter } = projectSlice.actions
export default projectSlice.reducer

const allProjects = s => s.projects.list
const getSearch = s => s.projects.search
const getFilter = s => s.projects.filter

export const selectFiltered = createSelector(
    [allProjects, getSearch, getFilter],
    (list, search, filter) => list.filter(p => {
        const matchTitle = p.title.toLowerCase().trim().includes(search.toLowerCase().trim())
        const matchStatus = filter === `All` || p.status === filter
        return matchTitle && matchStatus
    }))
export const selectStats = createSelector(allProjects, list => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return {
        total: list.length,
        active: list.filter(p => p.status === 'Active').length,
        completed: list.filter(p => p.status === 'Completed').length,
        overdue: list.filter(p =>
            p.dueDate && p.status !== 'Completed' && new Date(p.dueDate) < today).length,
    }
})
export const selectById = id => createSelector(allProjects, list => list.find(p => p.id === id))