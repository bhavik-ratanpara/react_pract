import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, clearError } from './authSlice'
import FormInput from '../../components/FormInput'

const inputs = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    placeholder: 'you@email.com',
    errorMessage: 'Please enter a valid email address!',
    label: 'Email',
    pattern: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}',
    required: true,
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Min 6 characters',
    errorMessage: 'Password must be at least 6 characters!',
    label: 'Password',
    minLength: 6,
    required: true,
  },
]
function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, error } = useSelector(s => s.auth)

  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard')
  }, [isLoggedIn, navigate])

  useEffect(() => {
    dispatch(clearError())
  }, [values.email, values.password])
  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.checkValidity()) {
      dispatch(loginUser({ email: values.email, password: values.password }))
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-boxx">
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          {inputs.map(input => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}/>
          ))}
          <button type="submit" className="btn-main">Login</button>
        </form>
        <p>No account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}
export default Login