import { useState } from 'react'

function FormInput({ label, errorMessage, onChange, ...inputProps }) {
  const [error, setError] = useState(false)

  function handleChange(e) {
    setError(!e.target.validity.valid)
    onChange(e)
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={handleChange}
        onBlur={e => setError(!e.target.validity.valid)}
      />
      {error && <span className="error-msg">{errorMessage}</span>}
    </div>
  )
}

export default FormInput