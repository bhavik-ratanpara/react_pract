import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteProject, selectById } from '../features/projects/projectSlice'
import Navbar from '../components/Navbar'
import ProjectForm from '../components/ProjectForm'

function ProjectDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const project = useSelector(selectById(id))
    const [showEdit, setshowEdit] = useState(false)

    function handleDelete() {
        if (window.confirm(`Delete this project?`)) {
            dispatch(deleteProject(id))
            navigate(`/projects`)
        }
    }
    const isOverdue = project.dueDate && project.status !== "Completed" && new Date(project.dueDate) < new Date()


    return (
        <>
            <Navbar />
            <div>
                <Link to="/projects">← Back to Projects</Link>

                <div>
                    <div>
                        <h1>{project.title}</h1>
                        <span >{project.status}</span>
                    </div>

                    {project.description && (
                        <div>
                            <p>Description:</p>
                            <p>{project.description}</p>
                        </div>
                    )}
                    {project.dueDate && (
                        <div>
                            <p>Due Date:</p>
                            <p>
                                {isOverdue && 'Overdue'}
                                {new Date(project.dueDate).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                    {project.createdAt && (
                        <div>
                            <p>Created:</p>
                            <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                        </div>
                    )}
                    <div >
                        <button onClick={() => setshowEdit(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
            {showEdit && (
                <ProjectForm project={project} onClose={() => setshowEdit(false)} />
            )}
        </>

    )
}

export default ProjectDetail
