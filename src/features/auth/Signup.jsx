import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signupUser, clearError } from './authSlice'
import FormInput from '../../components/FormInput'

function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, error } = useSelector(s => s.auth)

  const [values, setValues] = useState({
    email:           '',
    password:        '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard')
  }, [isLoggedIn])

  useEffect(() => {
    dispatch(clearError())
  }, [values.email, values.password, values.confirmPassword])

  const onChange = e => setValues({ ...values, [e.target.name]: e.target.value })

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
      pattern: '.{6,}',
      required: true,
    },
    {
      id: 3,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Repeat password',
      errorMessage: "Passwords don't match!",
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ]

  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.checkValidity()) {
      dispatch(signupUser({ email: values.email, password: values.password }))
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          {inputs.map(input => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button type="submit" className="btn-main">Create Account</button>
        </form>
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup