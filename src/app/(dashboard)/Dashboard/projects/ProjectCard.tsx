import { Project } from "@/context/ProjectContext"
import styles from './Projects.module.scss'

export default function ProjectCard({id, name, description, createdAt}:Project) {
    return (
        <div className={styles.project__card} key={id}>
            <h3>{name}</h3>
            <p>{description}</p>
            <h6>{createdAt}</h6>
        </div>
    )
}