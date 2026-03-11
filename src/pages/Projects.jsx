import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import { deleteProject, selectFiltered, setFilter, setSearch } from "../features/projects/projectSlice"
import { useState } from "react"
import { Link } from "react-router-dom"
import ProjectForm from "../components/ProjectForm"

function Projects() {
    const dispatch = useDispatch()
    const projects = useSelector(selectFiltered)
    const search = useSelector(s => s.projects.search)
    const filter = useSelector(s => s.projects.filter)
    const [showForm, setShowForm] = useState(false)

    function handleDelete(e, id) {
        e.preventDefault()
        e.stopPropagation()
        if (window.confirm(`Delete this project?`)) dispatch(deleteProject(id))
    }
    function isOverdue(p) {
        return p.dueDate && p.status !== `Compteled` && new Date(p.dueDate) < new Date(new Date().toDateString())
    }


    return (
        <>
            <Navbar />
            <div>
                <div>
                    <h1>Projects</h1>
                    <button onClick={() => setShowForm(true)}>+ New Project</button>
                </div>
                <div>
                    <input
                        className="searchbox"
                        type="text"
                        placeholder="Search by title...!"
                        value={search}
                        onChange={e => dispatch(setSearch(e.target.value))}
                    />
                    <div>
                        <button className={`fiter-btn ${filter === `All` ? `selected` : ``}`} onClick={() => dispatch(setFilter(`All`))}>All</button>
                        <button className={`fiter-btn ${filter === `Active` ? `selected` : ``}`} onClick={() => dispatch(setFilter(`Active`))}>Active</button>
                        <button className={`fiter-btn ${filter === `Completed` ? `selected` : ``}`} onClick={() => dispatch(setFilter(`Completed`))}>Complete</button>
                        <button className={`fiter-btn ${filter === `On Hold` ? `selected` : ``}`} onClick={() => dispatch(setFilter(`On Hold`))}>On Hold</button>
                    </div>

                </div>

                {projects.length === 0 ? <p>No Projects found...!!!</p> : <div>
                    {projects.map(p => (<Link key={p.id} to={`/projects/${p.id}`}>
                        <div className="top">
                            <h3>{p.title}</h3>
                            <span>{p.status}</span>
                        </div>
                        {p.description && <p>{p.description}</p>}
                        <div className="bottom">
                            {p.dueDate && (
                                <span>
                                    {isOverdue(p) ? `warning` : ``}
                                    {new Date(p.dueDate).toLocaleDateString()}
                                </span>
                            )}
                            <button onClick={e => handleDelete(e, p.id)}>Delete</button>
                        </div>
                    </Link>
                    ))}
                </div>
                }
            </div>
            {showForm && <ProjectForm onClose= {() => setShowForm(false)}/>}
        </>
    )
}
export default Projects