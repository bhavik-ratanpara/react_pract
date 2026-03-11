import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector(s => s.auth.user)

    function handleLogout() {
        dispatch(logout())
        navigate('/login')
    }
    const active = path => location.pathname.startsWith(path) ? 'active' : ''
    return (
        <nav className="navbar">
            <span className="main-name">ProjectTracker</span>
            <div className="linkss">
                <Link to="/dashboard" className={active('/dashboard')}>Dashboard</Link>
                <Link to="/projects" className={active('/projects')}>Projects</Link>
            </div>
            <div className="log-out">
                <span className="nav-email">{user?.email}</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
        </nav>
    )
}
export default Navbar