"use client"

import { Project, useProjects } from "@/context/ProjectContext"
import styles from './Projects.module.scss'

export default function ProjectCard({id, name, description, createdAt}:Project) {
    const { removeProject, refreshProjects } = useProjects();

    async function handleDelete (e: React.MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        await removeProject(id);
        await refreshProjects();
        console.log("project removed.");
    }

    return (
        <div className={styles.project__card} key={id}>
            <h3>{name}</h3>
            <p>{description}</p>
            <h6>{createdAt}</h6>
            <button onClick={(e) => handleDelete(e)}>Delete</button>
        </div>
    )
}