import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signupUser, clearError } from './authSlice'

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, error } = useSelector(s => s.auth)

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [err, setErr]           = useState('')

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard')
  }, [isLoggedIn])

  useEffect(() => {
    setErr('')
    dispatch(clearError())
  }, [email, password, confirm])

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password || !confirm) return setErr('All fields required.')
    if (!email.includes('@'))            return setErr('Enter a valid email.')
    if (password.length < 6)            return setErr('Password min 6 chars.')
    if (password !== confirm)           return setErr('Passwords do not match.')
    dispatch(signupUser({ email, password }))
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Sign Up</h2>
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
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirm}
            placeholder="Repeat password"
            onChange={e => setConfirm(e.target.value)}
          />
          <button type="submit" className="btn-main">Create Account</button>
        </form>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup