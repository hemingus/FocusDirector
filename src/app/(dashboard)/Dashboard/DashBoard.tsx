"use client";

import TaskWindow from '../../../components/TaskWindow'
import FocusMode from '../../../components/FocusMode';
import { useState, useEffect } from 'react'
import { TaskDataProvider } from '../../../components/TaskDataContext'

type Project = {
    name: string,
    description: string
}

const DashBoard = () => {
    const [projects, setProjects] = useState([])
    const [activeProject, setActiveProject] = useState("")
    const [focusMode, setFocusMode] = useState(false)

    const getProjects = async () => {
        const url = `https://localhost:7172/Project`
        await fetch(url, 
        {
            credentials: "include",
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setProjects(data)
        })
        .catch(err => {
            console.error(err)
        })
    }

    useEffect(() => {
        getProjects()
    }, [])

    const taskMode = () => {
        if (focusMode) return (
            <div onClick={() => {
                setFocusMode(false);
                }}>
                <FocusMode/>
            </div>
        )
        return <TaskWindow projectId={activeProject}/>
    }

    return (
        <>
            <header>
                <h1>Dashboard</h1>
            </header>

            <h2>Pick a project</h2>
            {projects && projects.map((p: Project) => {
                <p>{p.name}</p>
            })}

            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <button className="focusButton" focus-tooltip="Focus Mode" onClick={() => setFocusMode(true)}><img src="./assets/focus_button.png" /></button>
            </div>
            <section className="taskSection">
                <div>
                    <TaskDataProvider projectId={activeProject}>
                        {taskMode()}  
                    </TaskDataProvider>
                </div>
            </section>
        </>
    )
}

export default DashBoard