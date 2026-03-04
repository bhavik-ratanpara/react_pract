import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectFiltered, deleteProject, setSearch, setFilter
} from '../features/projects/projectSlice'
import Navbar from '../components/Navbar'
import ProjectForm from '../components/ProjectForm'

function Projects() {
  const dispatch = useDispatch()
  const projects = useSelector(selectFiltered)
  const search   = useSelector(s => s.projects.search)
  const filter   = useSelector(s => s.projects.filter)
  const [showForm, setShowForm] = useState(false)

  const badgeClass = {
    'Active':    'badge green',
    'Completed': 'badge purple',
    'On Hold':   'badge yellow',
  }

  function handleDelete(e, id) {
    e.preventDefault()
    e.stopPropagation()
    if (window.confirm('Delete this project?')) dispatch(deleteProject(id))
  }

  function isOverdue(p) {
    return p.dueDate && p.status !== 'Completed' && new Date(p.dueDate) < new Date()
  }

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-head">
          <h1 className="page-title">Projects</h1>
          <button className="btn-main" onClick={() => setShowForm(true)}>+ New Project</button>
        </div>

        <div className="toolbar">
          <input
            className="search-box"
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={e => dispatch(setSearch(e.target.value))}
          />
          <div className="filter-group">
            {['All', 'Active', 'Completed', 'On Hold'].map(s => (
              <button
                key={s}
                className={`filter-btn ${filter === s ? 'selected' : ''}`}
                onClick={() => dispatch(setFilter(s))}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {projects.length === 0
          ? <p className="empty">No projects found.</p>
          : <div className="card-grid">
              {projects.map(p => (
                <Link key={p.id} to={`/projects/${p.id}`} className="proj-card">
                  <div className="card-top">
                    <h3>{p.title}</h3>
                    <span className={badgeClass[p.status]}>{p.status}</span>
                  </div>
                  {p.description && <p className="card-desc">{p.description}</p>}
                  <div className="card-bottom">
                    {p.dueDate && (
                      <span className={isOverdue(p) ? 'due-date overdue' : 'due-date'}>
                        {isOverdue(p) ? '⚠ ' : ''}
                        {new Date(p.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    <button className="btn-del" onClick={e => handleDelete(e, p.id)}>
                      Delete
                    </button>
                  </div>
                </Link>
              ))}
            </div>
        }
      </div>
      {showForm && <ProjectForm onClose={() => setShowForm(false)} />}
    </>
  )
}

export default Projects