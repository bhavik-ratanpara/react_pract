import { createSlice } from '@reduxjs/toolkit'

function getUsers() {
  try {
    const data = localStorage.getItem('pt_users')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem('pt_users', JSON.stringify(users))
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    signupUser(state, action) {
      const { email, password } = action.payload
      const users = getUsers()
      const exists = users.find(u => u.email === email)
      if (exists) {
        state.error = 'Email already registered. Please log in.'
        return
      }
      saveUsers([...users, { email, password }])
      state.user = { email }
      state.isLoggedIn = true
      state.error = null
    },
    loginUser(state, action) {
      const { email, password } = action.payload
      const users = getUsers()
      const found = users.find(u => u.email === email)
      if (!found) {
        state.error = 'No account found. Please sign up.'
        return
      }
      if (found.password !== password) {
        state.error = 'Wrong password. Try again.'
        return
      }
      state.user = { email }
      state.isLoggedIn = true
      state.error = null
    },
    logout(state) {
      state.user = null
      state.isLoggedIn = false
      state.error = null
    },
    clearError(state) {
      state.error = null
    },
  },
})

export const { signupUser, loginUser, logout, clearError } = authSlice.actions
export default authSlice.reducer