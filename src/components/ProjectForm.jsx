import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addProject, updateProject } from '../features/projects/projectSlice'

function ProjectForm({ project, onClose }) {
  const dispatch = useDispatch()

  const [title,   setTitle]   = useState('')
  const [desc,    setDesc]    = useState('')
  const [status,  setStatus]  = useState('Active')
  const [dueDate, setDueDate] = useState('')
  const [err,     setErr]     = useState('')

  useEffect(() => {
    if (project) {
      setTitle(project.title)
      setDesc(project.description || '')
      setStatus(project.status)
      setDueDate(project.dueDate || '')
    }
  }, [project])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return setErr('Title is required.')

    const data = {
      id:          project ? project.id : crypto.randomUUID(),
      title:       title.trim(),
      description: desc.trim(),
      status,
      dueDate,
      createdAt:   project ? project.createdAt : new Date().toISOString(),
    }

    project ? dispatch(updateProject(data)) : dispatch(addProject(data))
    onClose()
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{project ? 'Edit Project' : 'New Project'}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        {err && <p className="error-msg">{err}</p>}
        <form onSubmit={handleSubmit}>
          <label>Title *</label>
          <input
            type="text"
            value={title}
            placeholder="Project title"
            onChange={e => setTitle(e.target.value)}
          />
          <label>Description</label>
          <textarea
            value={desc}
            placeholder="Short description"
            rows={3}
            onChange={e => setDesc(e.target.value)}
          />
          <div className="form-row">
            <div>
              <label>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option>Active</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>
            <div>
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-main">
              {project ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm