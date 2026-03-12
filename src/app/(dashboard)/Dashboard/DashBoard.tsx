"use client";

import TaskWindow from '../../../components/TaskWindow'
import FocusMode from '../../../components/FocusMode';
import { useState, useEffect } from 'react'
import { TaskDataProvider } from '../../../context/TaskDataContext'

type Project = {
    id: string,
    name: string,
    description: string,
    createdAt: string
}

const Dashboard = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [activeProject, setActiveProject] = useState("")
    const [focusMode, setFocusMode] = useState(false)

  const getProjects = async () => {
    try {
      const response = await fetch("https://localhost:7172/Project", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch projects: ${response.status} ${text}`);
      }

      const data = await response.json();
      console.log("projects response:", data);

      if (!Array.isArray(data)) {
        throw new Error("Projects response is not an array");
      }

      setProjects(data);

      if (data.length > 0) {
        setActiveProject(data[0].id);
      }
    } catch (err) {
      console.error(err);
      setProjects([]);
    }
  };

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
        return <TaskWindow />
    }

    return (
        <>
            <header>
                <h1>Dashboard</h1>
            </header>

            <h2>Pick a project</h2>
            <div>
                {projects.map((p:Project) => (
                <button
                    key={p.id}
                    onClick={() => setActiveProject(p.id)}
                    style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: activeProject === p.id ? "bold" : "normal",
                    }}
                >
                    {p.name}
                </button>
                ))}
            </div>

            {activeProject && <div>
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
            </div>}
        </>
    )
}

export default Dashboard