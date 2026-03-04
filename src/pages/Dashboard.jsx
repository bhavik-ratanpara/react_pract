import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectStats } from '../features/projects/projectSlice'
import Navbar from '../components/Navbar'

function Dashboard() {
  const stats    = useSelector(selectStats)
  const projects = useSelector(s => s.projects.list)
  const recent   = [...projects].reverse().slice(0, 5)

  const badgeClass = {
    'Active':    'badge green',
    'Completed': 'badge purple',
    'On Hold':   'badge yellow',
  }

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 className="page-title">Dashboard</h1>

        <div className="stats-row">
          <div className="stat-card">
            <p className="stat-num">{stats.total}</p>
            <p className="stat-label">Total</p>
          </div>
          <div className="stat-card">
            <p className="stat-num green">{stats.active}</p>
            <p className="stat-label">Active</p>
          </div>
          <div className="stat-card">
            <p className="stat-num purple">{stats.completed}</p>
            <p className="stat-label">Completed</p>
          </div>
          <div className="stat-card">
            <p className="stat-num red">{stats.overdue}</p>
            <p className="stat-label">Overdue</p>
          </div>
        </div>

        <div className="section">
          <div className="section-top">
            <h2>Recent Projects</h2>
            <Link to="/projects">View all →</Link>
          </div>
          {recent.length === 0
            ? <p className="empty">No projects yet. <Link to="/projects">Create one</Link></p>
            : recent.map(p => (
                <Link key={p.id} to={`/projects/${p.id}`} className="list-row">
                  <span>{p.title}</span>
                  <span className={badgeClass[p.status]}>{p.status}</span>
                </Link>
              ))
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard