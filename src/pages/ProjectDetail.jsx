import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject, selectById } from '../features/projects/projectSlice'
import Navbar from '../components/Navbar'
import ProjectForm from '../components/ProjectForm'

function ProjectDetail() {
  const { id }   = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const project  = useSelector(selectById(id))
  const [showEdit, setShowEdit] = useState(false)

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="page">
          <p className="empty">Project not found.</p>
          <Link to="/projects">← Back</Link>
        </div>
      </>
    )
  }

  function handleDelete() {
    if (window.confirm('Delete this project?')) {
      dispatch(deleteProject(id))
      navigate('/projects')
    }
  }

  const isOverdue =
    project.dueDate &&
    project.status !== 'Completed' &&
    new Date(project.dueDate) < new Date()

  const badgeClass = {
    'Active':    'badge green',
    'Completed': 'badge purple',
    'On Hold':   'badge yellow',
  }

  return (
    <>
      <Navbar />
      <div className="page">
        <Link to="/projects" className="back-link">← Back to Projects</Link>

        <div className="detail-box">
          <div className="detail-top">
            <h1>{project.title}</h1>
            <span className={badgeClass[project.status]}>{project.status}</span>
          </div>

          {project.description && (
            <div className="detail-field">
              <p className="field-label">Description</p>
              <p>{project.description}</p>
            </div>
          )}

          {project.dueDate && (
            <div className="detail-field">
              <p className="field-label">Due Date</p>
              <p className={isOverdue ? 'overdue' : ''}>
                {isOverdue && '⚠ Overdue · '}
                {new Date(project.dueDate).toLocaleDateString()}
              </p>
            </div>
          )}

          {project.createdAt && (
            <div className="detail-field">
              <p className="field-label">Created</p>
              <p>{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
          )}

          <div className="detail-actions">
            <button className="btn-main" onClick={() => setShowEdit(true)}>Edit</button>
            <button className="btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>

      {showEdit && (
        <ProjectForm project={project} onClose={() => setShowEdit(false)} />
      )}
    </>
  )
}

export default ProjectDetail