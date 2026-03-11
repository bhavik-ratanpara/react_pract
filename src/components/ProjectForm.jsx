import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProject, updateProject } from '../features/projects/projectSlice'

function ProjectForm({ project, onClose }) {
  const dispatch = useDispatch()

  const [title, setTitle] = useState(``)
  const [desc, setDesc] = useState(``)
  const [status, setStatus] = useState(`Active`)
  const [dueDate, setDueDate] = useState(``)
  const [err, setErr] = useState(``)

  useEffect(() => {
    if (project) {
      setTitle(project.title)
      setDesc(project.description || ``)
      setStatus(project.status)
      setDueDate(project.dueDate)
    }
  }, [project])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return setErr("Title is required..!!!")
    if (!dueDate) return setErr("Due Date is required")

    const data = {
      id: project ? project.id : Date.now().toString(),
      title: title.trim(),
      description: desc.trim(),
      status,
      dueDate,
      createdAt: project ? project.createdAt : new Date().toISOString(),
    }
    project ? dispatch(updateProject(data)) : dispatch(addProject(data))
    onClose()
  }

  return (
    <div onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>
        <div>
          <h3>{project ? 'Edit Project' : 'New Project'}</h3>
          <button onClick={onClose}>❌</button>
        </div>
        {err && <p>{err}</p>}
        <form onSubmit={handleSubmit}>
          <label>Title *</label>
          <input
            type="text"
            value={title}
            placeholder="title"
            onChange={e => setTitle(e.target.value)}
          />
          <label>Description</label>
          <textarea
            value={desc}
            placeholder="description"
            rows={3}
            onChange={e => setDesc(e.target.value)}
          />
          <div >
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
          <div>
            <button type='button' onClick={onClose}>Cancle</button>
            <button type='submit'>{project ? `save` : `Create`}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectForm
