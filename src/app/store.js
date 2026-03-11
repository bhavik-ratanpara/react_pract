import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import projectReducer from '../features/projects/projectSlice'

function loadState() {
    try {
        const saved = localStorage.getItem('pt_state')
        return saved ? JSON.parse(saved) : undefined
    } catch {
        return undefined
    }
}


function saveState(state) {
    try {
        localStorage.setItem('pt_state', JSON.stringify(state))
    } catch { }
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectReducer,
    },
    preloadedState: loadState(),
})

store.subscribe(() => saveState(store.getState()))

export default store