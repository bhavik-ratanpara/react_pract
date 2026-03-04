import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, clearError } from './authSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, error } = useSelector(s => s.auth)

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr]           = useState('')

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard')
  }, [isLoggedIn])

  useEffect(() => {
    setErr('')
    dispatch(clearError())
  }, [email, password])

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) return setErr('All fields required.')
    if (!email.includes('@')) return setErr('Enter a valid email.')
    if (password.length < 6)  return setErr('Password min 6 chars.')
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Login</h2>
        {(err || error) && <p className="error-msg">{err || error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="you@email.com"
            onChange={e => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Min 6 characters"
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-main">Login</button>
        </form>
        <p>No account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Login