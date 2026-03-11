import { useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import { selectStats } from "../features/projects/projectSlice"
import { Link } from "react-router-dom"

function Dashboard() {
  const stats = useSelector(selectStats)
  const projects = useSelector(s => s.projects.list)
  const recent = [...projects].reverse().slice(0, 5)

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 >Dashboard</h1>

        <div>
          <div>
            <p>{stats.total}</p>
            <p>Total</p>
          </div>
          <div>
            <p>{stats.active}</p>
            <p>Active</p>
          </div>
          <div>
            <p>{stats.completed}</p>
            <p>Completed</p>
          </div>
          <div>
            <p>{stats.overdue}</p>
            <p>Overdue</p>
          </div>
        </div>

        <div>
          <div>
            <h2>Recent Projects</h2>
            <Link to="/projects">View all →</Link>
          </div>
          {recent.length === 0
            ? <p>No projects yet, <Link to="/projects">Create one</Link></p>
            : recent.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`}>
                <span>{p.title}</span>
                <span>{p.status}</span>
              </Link>

            ))
          }
        </div>
      </div>
    </>
  )
}
export default Dashboard